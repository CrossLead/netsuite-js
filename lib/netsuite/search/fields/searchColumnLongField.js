'use strict';

var util = require('util'),
  BaseObject = require('../../baseObject');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/other/searchcolumnlongfield.html?mode=package
 *
 * @class
 * @extends BaseObject
 * @return {SearchColumnLongField}
 */
var SearchColumnLongField = module.exports = function SearchColumnLongField() {
  BaseObject.call(this);

  /**
   * @member {String} Field name to search against, such as 'daysOverdue' (see reference for your search row type, such as `CustomerSearchRowBasic`, for allowed values). Required.
   */
  this.field = '';
};

util.inherits(SearchColumnLongField, BaseObject);

/**
 * @override
 */
SearchColumnLongField.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCore:SearchColumnLongField'
  };

  return attrs;
};

/**
 * @override
 */
SearchColumnLongField.prototype.getUnserializablePropertyNames = function() {
  return ['field'];
};

/**
 * @override
 */
SearchColumnLongField.prototype.getSOAPType = function() {
  if (!this.field) {
    throw new Error('field member not set');
  }

  return this.field;
};
