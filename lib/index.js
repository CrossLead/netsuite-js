/*
 * netsuite-js
 * https://github.com/CrossLead/netsuite-js
 *
 * Copyright (c) 2015 McChrystal Group
 * Licensed under the Apache license.
 */

'use strict';

require('es6-promise').polyfill();

/**
 * Main NetSuite package
 * @return {NetSuite}
 */
var NetSuite = module.exports = {};

NetSuite.Configuration = require('./netsuite/configuration');
