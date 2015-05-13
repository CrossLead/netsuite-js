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
    preferences.pageSize = 10;
    service.setSearchPreferences(preferences);

    var search = new NetSuite.Search.EmployeeSearchBasic();

    var searchField = new NetSuite.Search.Fields.SearchStringField();
    searchField.field = 'firstName';
    searchField.operator = 'contains';
    searchField.searchValue = 'e';

    search.searchFields.push(searchField);

    // More search fields as desired
    // var searchField2 = new NetSuite.Search.Fields.SearchStringField();
    // searchField2.field = 'lastName';
    // searchField2.operator = 'startsWith';
    // searchField2.searchValue = 'ne';

    // search.searchFields.push(searchField2);

    console.log('Searching for Employees with first name containing "e"');
    return service.search(search);
  })
  .then(function(result, raw, soapHeader) {
    if (result.searchResult.status.$attributes.isSuccess !== 'true') {
      console.error('Error');
      console.error(result.searchResult.status.statusDetail);
    }
    var totalRecords = result.searchResult.totalRecords;
    console.log('Total records found: ' + totalRecords);
    console.log(JSON.stringify(result, null, 2));
    console.log('Last Request:');
    console.log(service.config.client.lastRequest);

    if (result.searchResult.totalPages > 1) {
      // Create a promise chain to get the rest of the pages
      console.log('Retrieving remaining pages');
      var current = Promise.resolve();
      var createNextFulfilledHandler = function(pageIndex) {
        return function() {
          return service.searchMoreWithId(result.searchResult.searchId, pageIndex)
            .then(function(result, raw, soapHeader) {
              console.log('Found next page, index: ' + result.searchResult.pageIndex);
              console.log(JSON.stringify(result, null, 2));
              console.log('Last Request:');
              console.log(service.config.client.lastRequest);
              return Promise.resolve();
            });
        };
      };
      // pageIndex is one based, so start next promise at 2
      for (var i = 2; i <= result.searchResult.totalPages; i++) {
        current = current.then(createNextFulfilledHandler(i));
      }
      return current;
    }
  })
  .catch(function(err) {
    console.error(err);
    console.error('Last Request:');
    console.error(service.config.client.lastRequest);
  });
