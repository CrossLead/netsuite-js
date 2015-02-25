'use strict';

var denodeify = require('denodeify'),
  Serializer = require('./soap/serializer');

/**
 * Helper to ensure we have a NetSuite connection
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
 * @return {Promise<client>} connected `node-soap` client
 */
Service.prototype.init = function() {
  return this.config.createConnection();
};

/**
 * Get operation
 * @param  {NetSuite.RecordRef} recordRef
 * @return {Promise<result,rawResponse,soapHeader>}
 */
Service.prototype.get = function(recordRef) {
  assertConnection(this);

  var soapObj = Serializer.serialize(recordRef);
  var get = denodeify(this.config.client.get);
  return get(soapObj);
};
