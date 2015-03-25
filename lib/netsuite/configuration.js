'use strict';

var _ = require('lodash'),
  https = require('https'),
  denodeify = require('denodeify'),
  soap = require('soap'),
  Serializer = require('./soap/serializer');

/**
 * Represents configuration settings and helper functionality to connect to NetSuite.
 *
 * @class
 * @param {Object} credentials NetSuite credentials hash
 * @param {String} credentials.email NetSuite user email
 * @param {String} credentials.password NetSuite user password
 * @param {String} credentials.account NetSuite company account id
 * @param {String} [credentials.role] internal ID of role used to log in to NetSuite
 * @param {Object} [options] options hash
 * @param {String} [options.apiVersion] api version
 * @return {Configuration}
 */
var Configuration = module.exports = function Configuration(credentials, options) {
  this.credentials = credentials || {};
  this.options = _.merge({
    apiVersion: '2014_2'
  }, options);

  // Default
  this._webservicesDomain = 'https://webservices.na1.netsuite.com/';
};

/**
 * Static helper for creating NeSuite auth header
 * @param {Object} credentials NetSuite credentials hash
 * @return {Object} SOAP object
 */
Configuration.createAuthHeader = function(credentials) {
  // TODO: refactor into own class
  var soapObj = {
    'platformMsgs:passport': {
      'platformCore:email': credentials.email,
      'platformCore:password': credentials.password,
      'platformCore:account': credentials.account
    }
  };

  if (credentials.role) {
    soapObj['platformMsgs:passport']['platformCore:role'] = {
      $attributes: {
        'internalId': credentials.role
      }
    };
  }

  return soapObj;
};

/**
 * Protected helper for setting some internal state
 * @private
 */
Configuration.prototype._resolveWsdl = function() {
  this._wsdl = this._webservicesDomain + '/wsdl/v' + this.options.apiVersion + '_0/netsuite.wsdl';

  this._namespaces = {
    'platformMsgs': 'urn:messages_' + this.options.apiVersion + '.platform.webservices.netsuite.com',
    'platformCore': 'urn:core_' + this.options.apiVersion + '.platform.webservices.netsuite.com',
    'platformCommon': 'urn:common_' + this.options.apiVersion + '.platform.webservices.netsuite.com',
    'listRel': 'urn:relationships_' + this.options.apiVersion + '.lists.webservices.netsuite.com',
    'tranSales': 'urn:sales_' + this.options.apiVersion + '.transactions.webservices.netsuite.com',
    'actSched': 'urn:scheduling_' + this.options.apiVersion + '.activities.webservices.netsuite.com',
    'setupCustom': 'urn:customization_' + this.options.apiVersion + '.setup.webservices.netsuite.com',
    'listAcct': 'urn:accounting_' + this.options.apiVersion + '.lists.webservices.netsuite.com',
    'tranBank': 'urn:bank_' + this.options.apiVersion + '.transactions.webservices.netsuite.com',
    'tranCust': 'urn:customers_' + this.options.apiVersion + '.transactions.webservices.netsuite.com',
    'tranInvt': 'urn:inventory_' + this.options.apiVersion + '.transactions.webservices.netsuite.com',
    'listSupport': 'urn:support_' + this.options.apiVersion + '.lists.webservices.netsuite.com',
    'tranGeneral': 'urn:general_' + this.options.apiVersion + '.transactions.webservices.netsuite.com',
    'listMkt': 'urn:marketing_' + this.options.apiVersion + '.lists.webservices.netsuite.com',
    'listWebsite': 'urn:website_' + this.options.apiVersion + '.lists.webservices.netsuite.com',
    'fileCabinet': 'urn:filecabinet_' + this.options.apiVersion + '.documents.webservices.netsuite.com',
    'listEmp': 'urn:employees_' + this.options.apiVersion + '.lists.webservices.netsuite.com'
  };
};

/**
 * Add SOAP header. This method does NOT replace existing SOAP headers with same name.
 * @param {NetSuite.BaseObject} header serializable header object
 */
Configuration.prototype.addSoapHeader = function(header) {
  if (!this.client || !this.client.soapHeaders) {
    throw new Error('Client not initialized');
  }

  var soapHeader = Serializer.serialize(header);
  this.client.addSoapHeader(soapHeader);
};

/**
 * Remove all SOAP headers with given name
 * @param  {String} headerName header to remove
 */
Configuration.prototype.removeSoapHeader = function(headerName) {
  if (!this.client || !this.client.soapHeaders) {
    return;
  }

  // This uses `node-soap` Client internals. Client maintains array
  // of flattened (string) headers, so do a basic "startsWith" check
  for (var i = this.client.soapHeaders.length - 1; i >= 0; i--) {
    if (this.client.soapHeaders[i].indexOf('<' + headerName) === 0) {
      this.client.soapHeaders.splice(i, 1);
    }
  }
};

/**
 * Create a NetSuite client using Configuration credentials and options
 * @param {Boolean} [skipDiscovery=false] Don't try to discover WSDL url
 * @return {Promise.<client>}
 */
Configuration.prototype.createConnection = function(skipDiscovery) {
  var _this = this;
  var createClient = denodeify(soap.createClient);
  var connect = function(resolve, reject) {
    _this._resolveWsdl();
    createClient(_this._wsdl, {
        attributesKey: '$attributes'
      })
      .then(function(client) {
        // Add all namespaces to SOAP envelope. Note this uses some private API methods
        // TODO: subclass soap WSDL class
        // TODO: detect and only add needed namespaces
        _.assign(client.wsdl.definitions.xmlns, _this._namespaces);
        client.wsdl.xmlnsInEnvelope = client.wsdl._xmlnsMap();

        // Add auth soap header
        var authHeader = Configuration.createAuthHeader(_this.credentials);
        client.addSoapHeader(authHeader);

        _this.client = client;
        resolve(client);
      })
      .catch(function(err) {
        reject(err);
      });
  };

  return new Promise(function(resolve, reject) {
    // Just connect with current settings if don't need to do discovery
    if (skipDiscovery) {
      connect(resolve, reject);
      return;
    }

    // Retrieve appropriate service url from NetSuite REST service first
    var authHeader = 'NLAuth nlauth_email=' + _this.credentials.email + ', nlauth_signature=' + _this.credentials.password;
    https.get({
      hostname: 'rest.netsuite.com',
      path: '/rest/roles',
      headers: {
        'Authorization': authHeader
      }
    }, function(res) {
      var buffer = [];
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        buffer.push(chunk);
      });
      res.on('end', function() {
        var json = JSON.parse(buffer.join(''));
        var accountString = _this.credentials.account.toString();
        // Result is array. Never seen more than 1 result, but if that happens,
        // just use first matching result
        var found = false;
        for (var i = 0; i < json.length; i++) {
          var config = json[i];
          if (config.account && config.account.internalId === accountString) {
            _this._webservicesDomain = config.dataCenterURLs.webservicesDomain;
            found = true;
            break;
          }
        }

        if (!found) {
          reject('Error resolving NetSuite datacenter');
          return;
        }

        connect(resolve, reject);
      });
    }).on('error', function(err) {
      reject(err);
    });
  });
};
