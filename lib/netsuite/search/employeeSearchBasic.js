'use strict';

var util = require('util'),
  BaseObject = require('../baseObject');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/employeesearchbasic.html?mode=package
 *
 * @class
 * @extends BaseObject
 * @return {EmployeeSearchBasic}
 */
var EmployeeSearchBasic = module.exports = function EmployeeSearchBasic() {
  BaseObject.call(this);

  /**
   * @member {SearchStringField} The search field for this search. Required.
   */
  this.searchField = null;
};

util.inherits(EmployeeSearchBasic, BaseObject);

/**
 * @override
 */
EmployeeSearchBasic.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCommon:EmployeeSearchBasic'
  };

  return attrs;
};

/**
 * @override
 */
EmployeeSearchBasic.prototype.getSOAPType = function() {
  // Always searchRecord
  return 'searchRecord';
};

/**
 * `node-soap` doesn't set the child namespace correctly so must override all XML.
 * @override
 */
EmployeeSearchBasic.prototype.getXml = function() {
  var xml = '<platformCommon:' + this.searchField.field + ' operator="' + this.searchField.operator + '" xsi:type="platformCore:SearchStringField"><platformCore:searchValue>' + this.searchField.searchValue + '</platformCore:searchValue></platformCommon:' + this.searchField.field + '>';

  return xml;
};
