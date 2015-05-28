'use strict';

var util = require('util'),
  BaseObject = require('../../baseObject');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/other/searchcolumnselectfield.html?mode=package
 *
 * @class
 * @extends BaseObject
 * @return {SearchColumnSelectField}
 */
var SearchColumnSelectField = module.exports = function SearchColumnSelectField() {
  BaseObject.call(this);

  /**
   * @member {String} Field name to search against, such as 'internalId' (see reference for your search row type, such as `CustomerSearchRowBasic`, for allowed values). Required.
   */
  this.field = '';
};

util.inherits(SearchColumnSelectField, BaseObject);

/**
 * @override
 */
SearchColumnSelectField.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCore:SearchColumnSelectField'
  };

  return attrs;
};

/**
 * @override
 */
SearchColumnSelectField.prototype.getUnserializablePropertyNames = function() {
  return ['field'];
};

/**
 * @override
 */
SearchColumnSelectField.prototype.getSOAPType = function() {
  if (!this.field) {
    throw new Error('field member not set');
  }

  return this.field;
};
