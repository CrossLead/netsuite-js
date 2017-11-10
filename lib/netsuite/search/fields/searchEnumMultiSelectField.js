'use strict';

var util = require('util'),
  BaseObject = require('../../baseObject');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/other/searchcolumnselectfield.html?mode=package
 *
 * @class
 * @extends BaseObject
 * @return {SearchEnumMultiSelectField}
 */
var SearchEnumMultiSelectField = module.exports = function SearchEnumMultiSelectField() {
  BaseObject.call(this);

  /**
   * @member {String} Field name to search against, such as 'internalId' (see reference for your search row type, such as `CustomerSearchRowBasic`, for allowed values). Required.
   */
  this.field = '';

  /**                                                                                                                                                                                                                  * @member {String} See NetSuite reference in class definition for allowed values. Required.                                                                                                                        */
  this.operator = '';

  /**                                                                                                                                                                                                                  * @member {String} The actual search value. Required.                                                                                                                                                              */
  this.searchValue = '';  
};

util.inherits(SearchEnumMultiSelectField, BaseObject);

/**
 * @override
 */
SearchEnumMultiSelectField.prototype.getAttributes = function() {
  if (!this.operator) {
     throw new Error('operator member not set');
  }
    
  var attrs = {
      operator: this.operator,
    'xsi:type': 'platformCore:SearchEnumMultiSelectField'
  };

  return attrs;
};

/**
 * @override
 */
SearchEnumMultiSelectField.prototype.getUnserializablePropertyNames = function() {
  return ['field','operator'];
};

/**
 * @override
 */
SearchEnumMultiSelectField.prototype.getSOAPType = function() {
  if (!this.field) {
    throw new Error('field member not set');
  }

  return this.field;
};
