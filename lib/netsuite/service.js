'use strict';

var denodeify = require('denodeify'),
  Serializer = require('./soap/serializer');

/**
 * Helper to ensure we have a NetSuite connection
 * @private
 * @param  {Service} service
 */
function assertConnection(service) {
  if (!(service && service.config && service.config.client)) {
    throw new Error('NetSuite connection not configured');
  }
}

/**
 * A service client through which requests are sent.
 *
 * @class
 * @param  {NetSuite.Configuration} config
 * @return {Service}
 */
var Service = module.exports = function Service(config) {
  this.config = config;
};

/**
 * Initialize this service client with given config.
 * @param {Boolean} [skipDiscovery=false] Don't try to discover WSDL url
 * @return {Promise.<client>} connected `node-soap` client
 */
Service.prototype.init = function(skipDiscovery) {
  return this.config.createConnection(skipDiscovery);
};

/**
 * `result` description:
 * 
 * `result.readResponse.status` {String} Operation status. Contains more details on errors.
 * `result.readResponse.status.$attributes.isSuccess` {String} Whether op was successful. String values of 'true' or 'false'
 * `[result.readResponse.status.statusDetail]` {StatusDetail[]} Status details on error.
 * `result.readResponse.record` {Record} The actual record. Its type is dependent on the given `recordRef.type`
 * 
 * @param  {NetSuite.Records.RecordRef} recordRef
 * @return {Promise.<result,rawResponse,soapHeader>}
 */
Service.prototype.get = function(recordRef) {
  assertConnection(this);

  var soapObj = Serializer.serialize(recordRef);
  var get = denodeify(this.config.client.get);
  return get(soapObj);
};

/**
 * `result` description:
 * 
 * `result.readResponse.status` {String} Operation status. Contains more details on errors.
 * `result.readResponse.status.$attributes.isSuccess` {String} Whether op was successful. String values of 'true' or 'false'
 * `[result.readResponse.status.statusDetail]` {StatusDetail[]} Status details on error.
 * `result.readResponseList.readResponse` {Record[]} The actual records. Their types are dependent on the given `recordRef.type`s
 * 
 * @param  {NetSuite.Records.RecordRef[]} recordRefs array of RecordRefs
 * @return {Promise.<result,rawResponse,soapHeader>}
 */
Service.prototype.getList = function(recordRefs) {
  assertConnection(this);

  var soapObj = Serializer.serialize(recordRefs);
  var getList = denodeify(this.config.client.getList);
  return getList(soapObj);
};
