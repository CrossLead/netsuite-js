'use strict';

var should = require('should'),
  NetSuite = require('../../../');

var field = 'firstName',
  operator = 'contains',
  searchStringField;

describe('NetSuite.Search.Fields.SearchStringField', function() {
  it('should exist in the proper namespace', function() {
    should.exist(NetSuite.Search.Fields.SearchStringField);
  });

  it('should error if field not set', function() {
    searchStringField = new NetSuite.Search.Fields.SearchStringField();
    (function() {
      searchStringField.getSOAPType();
    }).should.throw();
  });

  it('should error if operator not set', function() {
    searchStringField = new NetSuite.Search.Fields.SearchStringField();
    (function() {
      searchStringField.getAttributes();
    }).should.throw();
  });

  it('should populate operator attribute', function() {
    searchStringField = new NetSuite.Search.Fields.SearchStringField();
    searchStringField.field = field;
    searchStringField.operator = operator;
    var attrs = searchStringField.getAttributes();
    attrs.operator.should.equal(operator);
  });
});
