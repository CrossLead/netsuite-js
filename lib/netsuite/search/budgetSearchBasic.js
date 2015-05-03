'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/budgetsearchbasic.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {BudgetSearchBasic}
 */
var BudgetSearchBasic = module.exports = function BudgetSearchBasic() {
  SearchRecord.call(this);
};

util.inherits(BudgetSearchBasic, SearchRecord);

/**
 * @override
 */
BudgetSearchBasic.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCommon:BudgetSearchBasic'
  };

  return attrs;
};
