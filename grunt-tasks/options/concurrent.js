/**
 * SAMPLE tasks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  setUpEnv:{
    tasks: ['exec:mampStart','open:dev'],
    options: {
      logConcurrentOutput: true
    }
  },
  watchFiles:{
    tasks: ['haml', 'watch'],
    options: {
            logConcurrentOutput: true
    }
  }
}