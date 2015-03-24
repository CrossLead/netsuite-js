'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/employeesearchbasic.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {EmployeeSearchBasic}
 */
var EmployeeSearchBasic = module.exports = function EmployeeSearchBasic() {
  SearchRecord.call(this);
};

util.inherits(EmployeeSearchBasic, SearchRecord);

/**
 * @override
 */
EmployeeSearchBasic.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCommon:EmployeeSearchBasic'
  };

  return attrs;
};
