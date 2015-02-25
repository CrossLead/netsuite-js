'use strict';

var fs = require('fs'),
  _ = require('lodash'),
  async = require('async'),
  denodeify = require('denodeify'),
  nock = require('nock');

/**
 * Package
 * @type {MockNetSuiteService}
 */
var MockNetSuiteService = module.exports = {};

/**
 * Return local WSDL
 * @param  {String} wsdlUrl WSDL url to mock
 * @param  {String} [localDir] path to folder of local WSDL
 * @return {Promise}
 */
MockNetSuiteService.mockWsdl = function(wsdlUrl, localDir) {
  localDir = localDir || './test/data/wsdl/v2014_02';
  var mocked = nock(wsdlUrl);

  var fileMappings = {
    'accounting.xsd': '/xsd/lists/v2014_2_0/accounting.xsd',
    'accountingTypes.xsd': '/xsd/lists/v2014_2_0/accountingTypes.xsd',
    'bank.xsd': '/xsd/transactions/v2014_2_0/bank.xsd',
    'common.xsd': '/xsd/platform/v2014_2_0/common.xsd',
    'communication.xsd': '/xsd/general/v2014_2_0/communication.xsd',
    'communicationTypes.xsd': '/xsd/general/v2014_2_0/communicationTypes.xsd',
    'core.xsd': '/xsd/platform/v2014_2_0/core.xsd',
    'coreTypes.xsd': '/xsd/platform/v2013_1_0/coreTypes.xsd',
    'customers.xsd': '/xsd/transactions/v2014_2_0/customers.xsd',
    'customization.xsd': '/xsd/setup/v2014_2_0/customization.xsd',
    'customizationTypes.xsd': '/xsd/setup/v2014_2_0/customizationTypes.xsd',
    'demandPlanning.xsd': '/xsd/transactions/v2014_2_0/demandPlanning.xsd',
    'demandPlanningTypes.xsd': '/xsd/transactions/v2014_2_0/demandPlanningTypes.xsd',
    // Non-standard since there are 2 employee.xsd
    'employees-lists.xsd': '/xsd/lists/v2014_2_0/employees.xsd',
    'employees-transactions.xsd': '/xsd/transactions/v2014_2_0/employees.xsd',
    'employeeTypes.xsd': '/xsd/lists/v2014_2_0/employeeTypes.xsd',
    'faults.xsd': '/xsd/platform/v2014_2_0/faults.xsd',
    'faultTypes.xsd': 'xsd/platform/v2013_1_0/faultTypes.xsd',
    'fileCabinet.xsd': '/xsd/documents/v2014_2_0/fileCabinet.xsd',
    'fileCabinetTypes.xsd': '/xsd/documents/v2014_2_0/fileCabinetTypes.xsd',
    'financial.xsd': '/xsd/transactions/v2014_2_0/financial.xsd',
    'general.xsd': '/xsd/transactions/v2014_2_0/general.xsd',
    'inventory.xsd': '/xsd/transactions/v2014_2_0/inventory.xsd',
    'inventoryTypes.xsd': '/xsd/transactions/v2014_2_0/inventoryTypes.xsd',
    'marketing.xsd': '/xsd/lists/v2014_2_0/marketing.xsd',
    'marketingTypes.xsd': '/xsd/lists/v2014_2_0/marketingTypes.xsd',
    'messages.xsd': '/xsd/platform/v2014_2_0/messages.xsd',
    'netsuite.wsdl': '/wsdl/v2014_2_0/netsuite.wsdl',
    'purchases.xsd': '/xsd/transactions/v2014_2_0/purchases.xsd',
    'relationships.xsd': '/xsd/lists/v2014_2_0/relationships.xsd',
    'relationshipTypes.xsd': '/xsd/lists/v2014_2_0/relationshipTypes.xsd',
    'sales.xsd': '/xsd/transactions/v2014_2_0/sales.xsd',
    'saleTypes.xsd': '/xsd/transactions/v2014_2_0/saleTypes.xsd',
    'scheduling.xsd': '/xsd/activities/v2014_2_0/scheduling.xsd',
    'schedulingTypes.xsd': '/xsd/activities/v2014_2_0/schedulingTypes.xsd',
    'supplyChain.xsd': '/xsd/lists/v2014_2_0/supplyChain.xsd',
    'supplyChainTypes.xsd': '/xsd/lists/v2014_2_0/supplyChainTypes.xsd',
    'support.xsd': '/xsd/lists/v2014_2_0/support.xsd',
    'supportTypes.xsd': '/xsd/lists/v2014_2_0/supportTypes.xsd',
    'website.xsd': '/xsd/lists/v2014_2_0/website.xsd',
    'websiteTypes.xsd': '/xsd/lists/v2014_2_0/websiteTypes.xsd'
  };

  var files = fs.readdirSync(localDir);
  var mockFromFileFuncs = [];

  _.forEach(files, function(f) {
    var mockFunc = function(cb) {
      mocked
        .get(fileMappings[f])
        .replyWithFile(200, localDir + '/' + f);
      cb();
    };

    mockFromFileFuncs.push(mockFunc);
  });

  var p = new Promise(function(resolve, reject) {
    async.parallel(mockFromFileFuncs, function(err /*, results*/ ) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  return p;
};
