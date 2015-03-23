'use strict';

var _ = require('lodash');

/**
 * Static helper class for serializing NetSuite objects to format that the
 * `node-soap` client understands
 * @class
 * @return {Serializer}
 */
var Serializer = module.exports = function Serializer() {};

/**
 * Serialize a NetSuite.Object to `node-soap` format
 * @param {NetSuite.BaseObject} object
 * @return {Object} SOAP object
 */
Serializer.serialize = function(object) {
  var soapObj;
  if (object.constructor === Array) {
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
    soapObj = {};
    object.forEach(function(el) {
      var serialized = Serializer.serialize(el);
      var type = el.constructor.SOAPType;
      soapObj[type] = soapObj[type] || [];
      soapObj[type].push(serialized[type]);
    });
  } else {
    // Get class static property
    var type = object.constructor.SOAPType;

    if (type) {
      soapObj = {};
      soapObj[type] = {};
      soapObj[type].$attributes = object.getAttributes();

      // Recursively serialize properties
      _.forOwn(object, function(value, key) {
        var serialized = Serializer.serialize(value);
        if (typeof serialized !== 'undefined') {
          soapObj[type][key] = serialized;
        }
      });
    }
  }

  return soapObj;
};
