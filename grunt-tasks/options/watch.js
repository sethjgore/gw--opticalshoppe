/**
 * WATCH tasks configuration
 */

'use strict';

var config = require('../config');

module.exports = {
  scripts : {
    files: ['public/assets/js/script.js'],
    tasks: ['uglify']
  },
  haml : {
    files: ['haml/*.haml'],
    tasks : ['haml:layouts', 'haml:templates', 'haml:partials']
  },
  sass : {
    files: ['public/assets/sass/**/**/*.{sass, scss}'],
    tasks : ['sass:dist', 'concat']
  },
  livereload: {
    files: ['*.html', '*.php', 'js/**/*.{js,json}', '*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
    options: {
      livereload: true
    }
  }
}