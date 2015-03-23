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
    console.log('WSDL processed. Service description:');
    console.log(service.config.client.describe());

    var recordRef = new NetSuite.Records.RecordRef();
    recordRef.internalId = 5084;
    recordRef.type = 'employee';

    var recordRef2 = new NetSuite.Records.RecordRef();
    recordRef2.internalId = 224;
    recordRef2.type = 'customer';

    console.log('Getting list of 1 Employee record, 1 Customer record');
    return service.getList([recordRef, recordRef2]);
  })
  .then(function(result, raw, soapHeader) {
    if (result.readResponseList.status.$attributes.isSuccess !== 'true') {
      console.error('Error');
      console.error(result.readResponse.status.statusDetail);
    }
    console.log(result.readResponseList.readResponse[0]);
    console.log(result.readResponseList.readResponse[1]);
    console.log('Last Request:');
    console.log(service.config.client.lastRequest);
  })
  .catch(function(err) {
    console.error(err);
    console.error('Last Request:');
    console.error(service.config.client.lastRequest);
  });
