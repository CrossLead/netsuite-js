'use strict';

var util = require('util'),
  SearchRowBasic = require('./searchRowBasic');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/customersearchrowbasic.html?mode=package
 *
 * @class
 * @extends SearchRowBasic
 * @return {CustomerSearchRowBasic}
 */
var CustomerSearchRowBasic = module.exports = function CustomerSearchRowBasic() {
  SearchRowBasic.call(this);
};

util.inherits(CustomerSearchRowBasic, SearchRowBasic);

/**
 * @override
 */
CustomerSearchRowBasic.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCommon:CustomerSearchRowBasic'
  };

  return attrs;
};
