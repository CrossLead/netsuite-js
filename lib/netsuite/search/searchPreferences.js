'use strict';

var util = require('util'),
  BaseObject = require('../baseObject');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/other/searchpreferences.html?mode=package
 *
 * @class
 * @extends BaseObject
 * @return {SearchPreferences}
 */
var SearchPreferences = module.exports = function SearchPreferences() {
  BaseObject.call(this);

  /**
   * @member {Boolean} Does *not* return associated fields if true. Defaults to true
   */
  this.bodyFieldsOnly = true;

  /**
   * @member {Number} Set to undefined to clear
   */
  this.pageSize = undefined;

  /**
   * @member {Boolean} Only return search columns. Defaults to true
   */
  this.returnSearchColumns = true;

};

util.inherits(SearchPreferences, BaseObject);

/**
 * @override
 */
SearchPreferences.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'SearchPreferences'
  };

  return attrs;
};

/**
 * @override
 */
SearchPreferences.prototype.getSOAPType = function() {
  return 'searchPreferences';
};
