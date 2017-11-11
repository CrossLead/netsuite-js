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

var credentials = {
    "email": "harmony.Netsuite@gmail.com",
    "password": "J1tterb1t",
    "account": "TSTDRV629200",
    "role": "1002"
};
var options = {
    "apiVersion": '2015_2'
};

var config = new NetSuite.Configuration(credentials, options);
var service = new NetSuite.Service(config);

console.log('Creating NetSuite connection');

service
  .init()
  .then(function( /*client*/ ) {
    console.log('WSDL processed. Service description:');
    console.log(service.config.client.describe());

    var recordRef = new NetSuite.Records.RecordRef();
    recordRef.internalId = 5084;
    recordRef.type = 'employee';

    console.log('Getting Employee record');
    console.log(JSON.stringify(recordRef, null, 2));
    return service.get(recordRef);
  })
  .then(function(result, raw, soapHeader) {
    if (result.readResponse.status.$attributes.isSuccess !== 'true') {
      console.error('Error');
      console.error(result.readResponse.status.statusDetail);
    }
    console.log(JSON.stringify(result, null, 2));
    console.log('Last Request:');
    console.log(service.config.client.lastRequest);
  })
  .catch(function(err) {
    console.error(err);
    console.error('Last Request:');
    console.error(service.config.client.lastRequest);
  });
