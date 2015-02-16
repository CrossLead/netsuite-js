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
var c;

console.log('Creating NetSuite connection');

config
  .createConnection()
  .then(function(client) {
    c = client;
    console.log('WSDL processed. Service description:');
    console.log(client.describe());
    console.log('Getting Employee record');
    client.get({
      'baseRef': {
        attributes: {
          internalId: 5084,
          type: 'employee',
          'xsi:type': 'platformCore:RecordRef'
        }
      }
    }, function(err, result, raw, soapHeader) {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
      }
      console.log('Last Request:');
      console.log(c.lastRequest);
    });
  })
  .catch(function(err) {
    console.error(err);
  });
