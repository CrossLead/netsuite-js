'use strict';

var util = require('util'),
  BaseObject = require('../baseObject');

/**
 * Basic NetSuite reference
 *
 * https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2014_2/schema/other/recordref.html?mode=package
 *
 * ```xml
 * <complexType name="RecordRef">
 *   <complexContent>
 *     <extension base="platformCore:BaseRef">
 *     <attribute name="internalId" type="xsd:string"/>
 *     <attribute name="externalId" type="xsd:string"/>
 *     <attribute name="type" type="platformCoreTyp:RecordType"/>
 *   </extension>
 * </complexType>
 * ```
 *
 * @class
 * @extends BaseObject
 * @return {RecordRef}
 */
var RecordRef = module.exports = function RecordRef() {
  BaseObject.call(this);
};

util.inherits(RecordRef, BaseObject);

/**
 * SOAP datatype
 * @static
 * @const
 * @type {String}
 */
RecordRef.SOAPType = 'baseRef';

/**
 * @override
 */
RecordRef.prototype.getAttributes = function() {
  var attrs = {
    type: this.type,
    'xsi:type': 'platformCore:RecordRef'
  };

  if (this.internalId) {
    attrs.internalId = this.internalId;
  }

  if (this.externalId) {
    attrs.externalId = this.externalId;
  }

  return attrs;
};
