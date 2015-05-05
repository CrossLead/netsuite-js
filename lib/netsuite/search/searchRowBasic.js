'use strict';

var util = require('util'),
  BaseObject = require('../baseObject');

/**
 * Abstract base class for basic search rows
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/searchrowbasic.html?mode=package
 *
 * @class
 * @extends BaseObject
 * @return {SearchRowBasic}
 */
var SearchRowBasic = module.exports = function SearchRowBasic() {
  BaseObject.call(this);

  /**
   * @member {SearchColumnField[]} The search column fields to return this search. Required.
   */
  this.searchColumnFields = [];
};

util.inherits(SearchRowBasic, BaseObject);

/**
 * @override
 */
SearchRowBasic.prototype.getSOAPType = function() {
  // Always searchRow
  return 'searchRowBasic';
};

/**
 * Do not auto serialize `searchColumnFields`. @see geXml
 * @override
 */
SearchRowBasic.prototype.getUnserializablePropertyNames = function() {
  return ['searchColumnFields'];
};

/**
 * `node-soap` doesn't set the child namespace correctly so must override all XML.
 * @override
 */
SearchRowBasic.prototype.getXml = function() {
  var xml = [];
  this.searchColumnFields.forEach(function(searchField) {
    // TODO: add back searchValue and customLabel
    xml.push('<platformCommon:' + searchField.field + '></platformCommon:' + searchField.field + '>');
  });

  return xml.join('');
};
