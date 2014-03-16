/**
 * Sass taks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  dist: {
    files: {
      'public/assets/sass/style.css':'public/assets/sass/style.sass'
    },
    options: {
      lineNumbers: true,
      sourcemap: true,
      loadPath: 'bower_components'
    }
  }
}