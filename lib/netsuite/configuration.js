'use strict';

var _ = require('lodash'),
  denodeify = require('denodeify'),
  soap = require('soap');

/**
 * Constructor
 * @param {Object} credentials NetSuite credentials hash
 * @param {String} credentials.email NetSuite user email
 * @param {String} credentials.password NetSuite user password
 * @param {String} credentials.account NetSuite company account id
 * @param {String} [credentials.role] internal ID of role used to log in to NetSuite
 * @param {Object} [options] options hash
 * @param {String} [options.wsdl] alternate WSDL url
 * @return {[type]}             [description]
 */
var Configuration = module.exports = function Configuration(credentials, options) {
  this.credentials = credentials || {};
  this.options = _.merge({
    wsdl: 'https://webservices.netsuite.com/wsdl/v2014_2_0/netsuite.wsdl'
  }, options);
};

/**
 * Static helper for creating NeSuite auth header
 * @param {Object} credentials NetSuite credentials hash
 * @return {Object} SOAP object
 */
Configuration.createAuthHeader = function(credentials) {
  var soapObj = {
    'platformMsgs:passport': {
      'platformCore:email': credentials.email,
      'platformCore:password': credentials.password,
      'platformCore:account': credentials.account
    }
  };

  if (credentials.role) {
    soapObj['platformMsgs:passport']['platformCore:role'] = {
      attributes: {
        'internalId': credentials.role
      }
    };
  }

  return soapObj;
};

/**
 * Create a NetSuite client using Configuration credentials and options
 * @return {Promise<client>}
 */
Configuration.prototype.createConnection = function() {
  var _this = this;
  var createClient = denodeify(soap.createClient);
  return createClient(this.options.wsdl)
    .then(function(client) {
      _this.client = client;
      var authHeader = Configuration.createAuthHeader(_this.credentials);
      client.addSoapHeader(authHeader);

      return new Promise(function(resolve /*, reject*/ ) {
        resolve(_this.client);
      });
    });
};
