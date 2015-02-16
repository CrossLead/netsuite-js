# netsuite-js 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coveralls-image]][coveralls-url]

A Node wrapper for the NetSuite SOAP API.


## Install

```bash
$ npm install --save netsuite-js
```


## Usage

```javascript
var NetSuite = require('netsuite-js');
var credentials =  {
  "email": "test@test.com",
  "password": "password",
  "account": 123456,
  "role": 3
};
var config = new NetSuite.Configuration(credentials);
config
  .createConnection()
  .then(function(client) {
    console.log('Connected. Service description:');
    console.log(client.describe());
  });
```

## Running the examples

* Copy `example/credentials.json.sample` to `example/credentials.json`
* Fill in with your NetSuite credentials
* Run `node example/simple.js` or other examples

## API

_(Coming soon)_


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [gulp](http://gulpjs.com/).


## License

Copyright (c) 2015 McChrystal Group. Licensed under the Apache license.



[npm-url]: https://npmjs.org/package/netsuite-js
[npm-image]: https://badge.fury.io/js/netsuite-js.svg
[travis-url]: https://travis-ci.org/CrossLead/netsuite-js
[travis-image]: https://travis-ci.org/CrossLead/netsuite-js.svg?branch=master
[daviddm-url]: https://david-dm.org/CrossLead/netsuite-js.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/CrossLead/netsuite-js
[coveralls-url]: https://coveralls.io/r/CrossLead/netsuite-js
[coveralls-image]: https://coveralls.io/repos/CrossLead/netsuite-js/badge.png
