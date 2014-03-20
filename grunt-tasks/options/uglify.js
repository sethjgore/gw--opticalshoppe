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
      'public/resources/js/app.js' : ['bower_components/jquery/dist/jquery.js', 'bower_components/owlcarousel/owl-carousel/owl.carousel.js' ,'public/resources/js/script.js']
    }
  }
}