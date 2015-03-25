'use strict';

/**
 * NetSuite Search
 * @return {Search}
 */
var Search = module.exports = {};

Search.SearchPreferences = require('./searchPreferences');

// Search.Fields namespace
Search.Fields = require('./fields');

// Search types
Search.SearchRecord = require('./searchRecord');
Search.EmployeeSearchBasic = require('./employeeSearchBasic');
Search.TimeSheetSearchBasic = require('./timeSheetSearchBasic');
