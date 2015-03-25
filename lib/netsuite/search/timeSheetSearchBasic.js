'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/timesheetsearchbasic.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {TimeSheetSearchBasic}
 */
var TimeSheetSearchBasic = module.exports = function TimeSheetSearchBasic() {
  SearchRecord.call(this);
};

util.inherits(TimeSheetSearchBasic, SearchRecord);

/**
 * @override
 */
TimeSheetSearchBasic.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCommon:TimeSheetSearchBasic'
  };

  return attrs;
};
