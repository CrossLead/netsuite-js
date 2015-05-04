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
  if (!object) {
    return undefined;
  } else if (object.constructor === Array) {
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
      var type = el.getSOAPType();
      soapObj[type] = soapObj[type] || [];
      soapObj[type].push(serialized[type]);
    });
  } else if (typeof object === 'object') {
    // Get class static property
    var type = object.getSOAPType();

    if (type) {
      soapObj = {};
      soapObj[type] = {};
      soapObj[type].$attributes = object.getAttributes();

      var xmlOverride = object.getXml();
      if (xmlOverride) {
        soapObj[type].$xml = xmlOverride;
      } else {
        // Recursively serialize properties
        var unserializablePropertyNames = object.getUnserializablePropertyNames();
        _.forOwn(object, function(value, key) {
          if (unserializablePropertyNames.indexOf(key) < 0 && typeof value !== 'undefined') {
            var serialized = Serializer.serialize(value);
            if (typeof serialized !== 'undefined') {
              // Have to unwrap 1 layer
              var childType = value.getSOAPType();
              soapObj[type][childType] = serialized[childType];
            } else {
              // Not an attribute and no special serialization, just retain original value
              soapObj[type][key] = value;
            }
          }
        });
      }
    }
  }

  return soapObj;
};
