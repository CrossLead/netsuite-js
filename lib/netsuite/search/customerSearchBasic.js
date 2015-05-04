'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/customersearchbasic.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {CustomerSearchBasic}
 */
var CustomerSearchBasic = module.exports = function CustomerSearchBasic() {
  SearchRecord.call(this);
};

util.inherits(CustomerSearchBasic, SearchRecord);

/**
 * @override
 */
CustomerSearchBasic.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCommon:CustomerSearchBasic'
  };

  return attrs;
};
