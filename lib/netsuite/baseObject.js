'use strict';

/**
 * Base class for all NetSuite data types
 *
 * @class
 * @return {BaseObject}
 */
var BaseObject = module.exports = function BaseObject() {};

/**
 * Serialize object's attributes
 * @virtual
 * @return {Object} attributes and values
 */
BaseObject.prototype.getAttributes = function() {
  throw new Error('Must be implemented by subclass');
};
