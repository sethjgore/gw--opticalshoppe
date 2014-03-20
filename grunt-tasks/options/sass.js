/**
 * Sass taks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  dist: {
    files: {
      'public/resources/sass/style.css':'public/resources/sass/style.sass'
    },
    options: {
      lineNumbers: true,
      sourcemap: true,
      loadPath: 'bower_components'
    }
  }
}