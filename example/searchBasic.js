/*
 * netsuite-js
 * https://github.com/CrossLead/netsuite-js
 *
 * Copyright (c) 2015 Christian Yang
 * Licensed under the Apache license.
 */

'use strict';

var denodeify = require('denodeify');
var NetSuite = require('../');

var credentials = require('./credentials.json');
var config = new NetSuite.Configuration(credentials);
var service = new NetSuite.Service(config);

console.log('Creating NetSuite connection');

service
  .init(true /* skipDiscovery */ )
  .then(function( /*client*/ ) {
    console.log('WSDL processed');

    var preferences = new NetSuite.Search.SearchPreferences();
    preferences.pageSize = 45;
    service.setSearchPreferences(preferences);

    var search = new NetSuite.Search.EmployeeSearchBasic();

    var searchField = new NetSuite.Search.Fields.SearchStringField();
    searchField.field = 'firstName';
    searchField.operator = 'startsWith';
    searchField.searchValue = 'ry';

    search.searchFields.push(searchField);

    var searchField2 = new NetSuite.Search.Fields.SearchStringField();
    searchField2.field = 'lastName';
    searchField2.operator = 'startsWith';
    searchField2.searchValue = 'fa';

    search.searchFields.push(searchField2);

    console.log('Searching for Employees with first name starting with "ry", last name starting with "fa"');
    return service.search(search);
  })
  .then(function(result, raw, soapHeader) {
    if (result.searchResult.status.$attributes.isSuccess !== 'true') {
      console.error('Error');
      console.error(result.searchResult.status.statusDetail);
    }
    console.log('Records found: ' + result.searchResult.totalRecords);
    if (result.searchResult.totalRecords) {
      console.log(result.searchResult.recordList.record[0]);
    }
    console.log('Last Request:');
    console.log(service.config.client.lastRequest);
  })
  .catch(function(err) {
    console.error(err);
    console.error('Last Request:');
    console.error(service.config.client.lastRequest);
  });
