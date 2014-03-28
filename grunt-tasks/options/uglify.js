
/**
 * Middleman taks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  dev: {
    options:{
      mangle: false,
      beautify: true
    },
    files: {
      'public/resources/js/app.js' : ['bower_components/jquery/dist/jquery.js', 'bower_components/isotope/jquery.isotope.js', 'bower_components/owlcarousel/owl-carousel/owl.carousel.js' ,'public/resources/js/script.js']
    }
  }
}