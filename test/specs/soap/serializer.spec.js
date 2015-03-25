'use strict';

var should = require('should'),
  NetSuite = require('../../../');

var internalIds = [5084, 224],
  types = ['employee', 'customer'];

describe('NetSuite.SOAP.Serializer', function() {
  it('should exist in the proper namespace', function() {
    should.exist(NetSuite.SOAP.Serializer);
  });

  it('should create an object with `baseRef` property and `$attributes` sub-object', function() {
    var recordRef = new NetSuite.Records.RecordRef;
    recordRef.internalId = internalIds[0];
    recordRef.type = types[0];
    var soapObj = NetSuite.SOAP.Serializer.serialize(recordRef);
    soapObj.should.have.property('baseRef');
    soapObj.baseRef.should.have.property('$attributes');
    soapObj.baseRef.$attributes.type.should.equal(types[0]);
  });

  it('should format an array as an object w/each contained type as a sub-array', function() {
    // For arrays, node-soap (weirdly) expects an object with each SOAP datatype
    // mapped to an array instead of simply an array of serialized objects:
    // ```js
    // {
    //   baseRef: [{
    //     $attributes: {
    //       type: 'employee',
    //       internalId: 5084,
    //       'xsi:type': 'platformCore:RecordRef'
    //     }
    //   }, {
    //     $attributes: {
    //       type: 'customer',
    //       internalId: 224,
    //       'xsi:type': 'platformCore:RecordRef'
    //     }
    //   }]
    // }
    // ```
    var recordRef = new NetSuite.Records.RecordRef();
    recordRef.internalId = internalIds[0];
    recordRef.type = types[0];
    var recordRef2 = new NetSuite.Records.RecordRef();
    recordRef2.internalId = internalIds[1];
    recordRef2.type = types[1];

    var soapObj = NetSuite.SOAP.Serializer.serialize([recordRef, recordRef2]);
    soapObj.should.have.property('baseRef');
    soapObj.baseRef.should.be.an.instanceOf(Array).and.have.lengthOf(2);
    soapObj.baseRef[1].should.have.property('$attributes');
    soapObj.baseRef[1].$attributes.type.should.equal(types[1]);
  });

  it('should create an $xml prop if BaseObject.getXml() returns a value', function() {
    // Will break if NetSuite.Search.SearchRecord no longer needs to output direct xml
    var search = new NetSuite.Search.EmployeeSearchBasic();
    var searchField = new NetSuite.Search.Fields.SearchStringField();
    searchField.field = 'firstName';
    searchField.operator = 'startsWith';
    searchField.searchValue = 'ry';
    search.searchFields.push(searchField);

    var soapObj = NetSuite.SOAP.Serializer.serialize(search);
    soapObj.should.have.property('searchRecord');
    soapObj.searchRecord.should.have.property('$xml');
    soapObj.searchRecord.$xml.length.should.be.greaterThan(1);
  });
});
