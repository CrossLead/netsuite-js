'use strict';

var should = require('should'),
  NetSuite = require('../../../');

var internalId = 5084,
  recordRef;

describe('NetSuite.Records.RecordRef', function() {
  it('should exist in the proper namespace', function() {
    should.exist(NetSuite.Records.RecordRef);
  });

  it('should NOT populate internalId and externalId attribute if not specified', function() {
    recordRef = new NetSuite.Records.RecordRef();
    var attrs = recordRef.getAttributes();
    should.not.exist(attrs.internalId);
    should.not.exist(attrs.externalId);
  });

  it('should populate internalId if specified', function() {
    recordRef = new NetSuite.Records.RecordRef();
    recordRef.internalId = internalId;
    var attrs = recordRef.getAttributes();
    attrs.internalId.should.equal(internalId);
  });
});
