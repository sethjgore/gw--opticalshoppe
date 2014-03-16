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
      'public/assets/js/app.js' : ['public/assets/js/script.js']
    }
  }
}