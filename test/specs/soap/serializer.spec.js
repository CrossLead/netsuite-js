'use strict';

var should = require('should'),
  NetSuite = require('../../../');

var internalId = 5084,
  type = 'employee',
  recordRef;

describe('NetSuite.SOAP.Serializer', function() {
  it('should exist in the proper namespace', function() {
    should.exist(NetSuite.SOAP.Serializer);
  });

  it('should NOT accept classes without a Type static property', function() {
    var RandomClass = function RandomClass() {};
    var randomClassInstance = new RandomClass();
    (function() {
      NetSuite.SOAP.Serializer.serialize(randomClassInstance);
    }).should.throw('Unknown object type');
  });

  it('should create an object with `baseRef` property and `attributes` sub-object', function() {
    recordRef = new NetSuite.Records.RecordRef;
    recordRef.internalId = internalId;
    recordRef.type = type;
    var soapObj = NetSuite.SOAP.Serializer.serialize(recordRef);
    soapObj.should.have.property('baseRef');
    soapObj.baseRef.should.have.property('attributes');
    soapObj.baseRef.attributes.type.should.equal(type);
  });
});
