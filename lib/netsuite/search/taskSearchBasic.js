'use strict';

var util = require('util'),
  SearchRecord = require('./searchRecord');

/**
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/search/tasksearchbasic.html?mode=package
 *
 * @class
 * @extends SearchRecord
 * @return {TimeBillSearchBasic}
 */
var TaskSearchBasic = module.exports = function TaskSearchBasic() {
  SearchRecord.call(this);
};

util.inherits(TaskSearchBasic, SearchRecord);

/**
 * @override
 */
TaskSearchBasic.prototype.getAttributes = function() {
  var attrs = {
    'xsi:type': 'platformCommon:TaskSearchBasic'
  };

  return attrs;
};
