'use strict';

var util = require('util'),
  BaseObject = require('../../baseObject');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/other/searchcolumndoublefield.html?mode=package
 *
 * @class
 * @extends BaseObject
 * @return {SearchColumnDoubleField}
 */
var SearchColumnDoubleField = module.exports = function SearchColumnDoubleField() {
  BaseObject.call(this);

  /**
   * @member {String} Field name to search against, such as 'balance' (see reference for your search row type, such as `CustomerSearchRowBasic`, for allowed values). Required.
   */
  this.field = '';
};

util.inherits(SearchColumnDoubleField, BaseObject);

/**
 * @override
 */
SearchColumnDoubleField.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCore:SearchColumnDoubleField'
  };

  return attrs;
};

/**
 * @override
 */
SearchColumnDoubleField.prototype.getUnserializablePropertyNames = function() {
  return ['field'];
};

/**
 * @override
 */
SearchColumnDoubleField.prototype.getSOAPType = function() {
  if (!this.field) {
    throw new Error('field member not set');
  }

  return this.field;
};
