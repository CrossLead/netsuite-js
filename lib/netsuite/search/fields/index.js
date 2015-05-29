'use strict';

/**
 * NetSuite Search and SearchColumn Fields
 * @return {Fields}
 1*/
var Fields = module.exports = {};

// Search fields
Fields.SearchStringField = require('./searchStringField');

// SearchColumn fields
Fields.SearchColumnDoubleField = require('./searchColumnDoubleField');
Fields.SearchColumnLongField = require('./searchColumnLongField');
Fields.SearchColumnSelectField = require('./searchColumnSelectField');
Fields.SearchColumnStringField = require('./searchColumnStringField');
