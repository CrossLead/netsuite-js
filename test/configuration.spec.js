'use strict';

var _ = require('lodash'),
  should = require('should'),
  NetSuite = require('../');

var credentials = {
  email: 'test@test.com',
  password: 'password',
  account: 123456
};

describe('NetSuite.Configuration', function() {

  it('should exist in the NetSuite package', function() {
    should.exist(NetSuite.Configuration);
  });

  it('should NOT populate role auth header if not specified', function() {
    var authHeader = NetSuite.Configuration.createAuthHeader(credentials);
    should.not.exist(authHeader['platformMsgs:passport']['platformCore:role']);
  });

  it('should populate role auth header if specified', function() {
    var credsWithRole = _.assign({
      role: 3
    }, credentials);


    var authHeader = NetSuite.Configuration.createAuthHeader(credsWithRole);
    authHeader['platformMsgs:passport']['platformCore:role'].attributes.internalId.should.equal(3);
  });

});