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
Search.SearchRowBasic = require('./searchRowBasic');

Search.AccountSearchBasic = require('./accountSearchBasic');
Search.BudgetSearchBasic = require('./budgetSearchBasic');
Search.CustomerSearchAdvanced = require('./customerSearchAdvanced');
Search.CustomerSearchBasic = require('./customerSearchBasic');
Search.CustomerSearchRow = require('./customerSearchRow');
Search.CustomerSearchRowBasic = require('./customerSearchRowBasic');
Search.EmployeeSearchBasic = require('./employeeSearchBasic');
Search.TaskSearchBasic = require('./taskSearchBasic');
Search.TimeBillSearchBasic = require('./timeBillSearchBasic');
Search.TimeEntrySearchBasic = require('./timeEntrySearchBasic');
Search.TimeSheetSearchBasic = require('./timeSheetSearchBasic');
