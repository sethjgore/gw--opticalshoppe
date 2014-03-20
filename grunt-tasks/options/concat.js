/**
 * CONCAT tasks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  sass: {
    src: [
          'public/resources/sass/style.css',
          'public/resources/sass/plugins/owl.carousel.css',
          'public/resources/sass/plugins/owl.theme.css'
          ],
    dest: 'public/resources/sass/style-compiled.css'
  }
}