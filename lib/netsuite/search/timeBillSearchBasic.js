'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/timebillsearchbasic.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {TimeBillSearchBasic}
 */
var TimeBillSearchBasic = module.exports = function TimeBillSearchBasic() {
  SearchRecord.call(this);
};

util.inherits(TimeBillSearchBasic, SearchRecord);

/**
 * @override
 */
TimeBillSearchBasic.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCommon:TimeBillSearchBasic'
  };

  return attrs;
};
