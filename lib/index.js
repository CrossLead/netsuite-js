/**
 * netsuite-js
 * https://github.com/CrossLead/netsuite-js
 *
 * Copyright (c) 2015 McChrystal Group
 * Licensed under the Apache license.
 *
 * @ignore
 */

'use strict';

/**
 * Main NetSuite package
 * @return {NetSuite}
 */
var NetSuite = module.exports = {};

NetSuite.Configuration = require('./netsuite/configuration');
NetSuite.BaseObject = require('./netsuite/baseObject');
NetSuite.Records = require('./netsuite/records');
NetSuite.Search = require('./netsuite/search');
NetSuite.Service = require('./netsuite/service');
NetSuite.SOAP = require('./netsuite/soap');
