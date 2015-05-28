'use strict';

var util = require('util'),
  BaseObject = require('../../baseObject');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/other/searchcolumnstringfield.html?mode=package
 *
 * @class
 * @extends BaseObject
 * @return {SearchColumnStringField}
 */
var SearchColumnStringField = module.exports = function SearchColumnStringField() {
  BaseObject.call(this);

  /**
   * @member {String} Field name to search against, such as 'entityId' (see reference for your search row type, such as `CustomerSearchRowBasic`, for allowed values). Required.
   */
  this.field = '';
};

util.inherits(SearchColumnStringField, BaseObject);

/**
 * @override
 */
SearchColumnStringField.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCore:SearchColumnStringField'
  };

  return attrs;
};

/**
 * @override
 */
SearchColumnStringField.prototype.getUnserializablePropertyNames = function() {
  return ['field'];
};

/**
 * @override
 */
SearchColumnStringField.prototype.getSOAPType = function() {
  if (!this.field) {
    throw new Error('field member not set');
  }

  return this.field;
};
