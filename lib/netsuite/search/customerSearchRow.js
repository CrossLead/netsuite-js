'use strict';

var util = require('util'),
  BaseObject = require('../baseObject');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/customersearchrow.html?mode=package
 *
 * @class
 * @extends BaseObject
 * @return {CustomerSearchRow}
 */
var CustomerSearchRow = module.exports = function CustomerSearchRow() {
  BaseObject.call(this);

  /**
   * @member {CustomerSearchRowBasic}
   */
  this.basic = undefined;

  // TODO: other fields
};

util.inherits(CustomerSearchRow, BaseObject);

/**
 * @override
 */
CustomerSearchRow.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'listRel:CustomerSearchRow'
  };

  return attrs;
};

/**
 * @override
 */
CustomerSearchRow.prototype.getXml = function() {
  var xml = [];

  if (this.basic) {
    xml.push('<listRel:basic>');
    xml.push(this.basic.getXml());
    xml.push('</listRel:basic>');
  }

  return xml.join('');
};
