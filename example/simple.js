/*
 * netsuite-js
 * https://github.com/CrossLead/netsuite-js
 *
 * Copyright (c) 2015 Christian Yang
 * Licensed under the Apache license.
 */

'use strict';

var NetSuite = require('../');
var credentials = require('./credentials.json');
var config = new NetSuite.Configuration(credentials);

console.log('Creating NetSuite connection');

config
  .createConnection()
  .then(function(client) {
    console.log('Connected. Service description:');
    console.log(client.describe());
  })
  .catch(function(err) {
    console.error(err);
  });