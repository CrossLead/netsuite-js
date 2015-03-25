'use strict';

var util = require('util'),
  BaseObject = require('../baseObject');

/**
 * Abstract base class for searches.
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/other/searchrecord.html?mode=package
 *
 * @class
 * @extends BaseObject
 * @return {SearchRecord}
 */
var SearchRecord = module.exports = function SearchRecord() {
  BaseObject.call(this);

  /**
   * @member {SearchStringField[]} The search field for this search. Required.
   */
  this.searchFields = [];
};

util.inherits(SearchRecord, BaseObject);

/**
 * @override
 */
SearchRecord.prototype.getSOAPType = function() {
  // Always searchRecord
  return 'searchRecord';
};

/**
 * Do not auto serialize `searchFields`. @see geXml
 * @override
 */
SearchRecord.prototype.getUnserializablePropertyNames = function() {
  return ['searchFields'];
};

/**
 * `node-soap` doesn't set the child namespace correctly so must override all XML.
 * @override
 */
SearchRecord.prototype.getXml = function() {
  var xml = '';
  this.searchFields.forEach(function(searchField) {
    xml += '<platformCommon:' + searchField.field + ' operator="' + searchField.operator + '" xsi:type="platformCore:SearchStringField"><platformCore:searchValue>' + searchField.searchValue + '</platformCore:searchValue></platformCommon:' + searchField.field + '>';
  });

  return xml;
};
