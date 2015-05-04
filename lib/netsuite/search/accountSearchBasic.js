'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/accountsearchbasic.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {AccountSearchBasic}
 */
var AccountSearchBasic = module.exports = function AccountSearchBasic() {
  SearchRecord.call(this);
};

util.inherits(AccountSearchBasic, SearchRecord);

/**
 * @override
 */
AccountSearchBasic.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCommon:AccountSearchBasic'
  };

  return attrs;
};
