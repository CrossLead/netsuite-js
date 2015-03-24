'use strict';

/**
 * Base class for all NetSuite data types
 *
 * @class
 * @return {BaseObject}
 */
var BaseObject = module.exports = function BaseObject() {};

/**
 * Get object's attributes
 * @virtual
 * @return {Object} attributes and values
 */
BaseObject.prototype.getAttributes = function() {
  throw new Error('Must be implemented by subclass');
};

/**
 * Get names of properties which should NOT be serialized as children
 * @return {String[]} list of properties
 */
BaseObject.prototype.getUnserializablePropertyNames = function() {
  return [];
};

/**
 * Get object's SOAP type (e.g. object's XML tag name)
 * @return {String} SOAP type
 */
BaseObject.prototype.getSOAPType = function() {
  return '';
};

/**
 * Get object's XML straight up. Used as last-resort workaround when
 * serialization fails due to bugs in `node-soap`.
 * @return {String} SOAP type
 */
BaseObject.prototype.getXml = function() {
  return '';
};
