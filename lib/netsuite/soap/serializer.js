'use strict';

/**
 * Static helper class for serializing NetSuite objects to format that the
 * `node-soap` client understands
 * @class
 * @return {Serializer}
 */
var Serializer = module.exports = function Serializer() {};

/**
 * Serialize a NetSuite.Object
 * @param {NetSuite.BaseObject} object
 * @return {Object} SOAP object
 */
Serializer.serialize = function(object) {
  // Get class static property
  var type = object.constructor.Type;

  if (!type) {
    throw new Error('Unknown object type');
  }

  var soapObj = {};
  var body = soapObj[type] = {};
  body.$attributes = object.getAttributes();

  return soapObj;
};
