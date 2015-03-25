'use strict';

/**
 * NetSuite Search
 * @return {Search}
 */
var Search = module.exports = {};

// Search.Fields namespace
Search.Fields = require('./fields');

// Search types
Search.SearchRecord = require('./searchRecord');
Search.EmployeeSearchBasic = require('./employeeSearchBasic');
Search.TimeSheetSearchBasic = require('./timeSheetSearchBasic');
