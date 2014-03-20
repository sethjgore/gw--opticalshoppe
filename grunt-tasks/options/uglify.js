/**
 * Middleman taks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  dev: {
    options:{
      mangle: false
    },
    files: {
      'public/resources/js/app.js' : ['public/resources/js/script.js']
    }
  }
}