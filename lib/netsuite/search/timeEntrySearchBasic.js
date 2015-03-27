'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/timeentrysearchbasic.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {TimeEntrySearchBasic}
 */
var TimeEntrySearchBasic = module.exports = function TimeEntrySearchBasic() {
  SearchRecord.call(this);
};

util.inherits(TimeEntrySearchBasic, SearchRecord);

/**
 * @override
 */
TimeEntrySearchBasic.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCommon:TimeEntrySearchBasic'
  };

  return attrs;
};
