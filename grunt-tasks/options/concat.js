/**
 * CONCAT tasks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  sass: {
    src: [
          'resources/sass/style-prefixed.css',
          'resources/sass/plugins/owl.carousel.css',
          'resources/sass/plugins/owl.theme.css'
          ],
    dest: 'resources/style-compiled.css'
  }
}