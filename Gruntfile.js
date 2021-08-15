module.exports = function(grunt) {

  grunt.initConfig({

    /* Generate responsive images (from high-quality source) */
    responsive_images: {
      main: {
        options: {
          engine: 'im',
          newFilesOnly: false,
          sizes: [{
            width: '100%',
            rename: false,
            suffix: '@3x',
            quality: 90,
            sharpen: {
                sigma: 1,
                radius: 2
            }
          },
          {
            width: '66.66%',
            rename: false,
            suffix: '@2x',
            quality: 90,
            sharpen: {
                sigma: 1,
                radius: 2
            }
          },
          {
            width: '33.33%',
            rename: false,
            suffix: '@1x',
            quality: 90,
            sharpen: {
                sigma: 1,
                radius: 2
            }
          }]
        },

        files: [{
          expand: true,
          cwd: 'src/images_src/',
          src: ['*.{gif,jpg,png}'],
          dest: 'src/images/'
        }]
      }
    },

    clean: {
      /* Clear out the images directory if it exists */
      generateImages: {
        src: ['src/images']
      },
      build: {
        src: ['dist/*']
      },
      // Remove the css file since it's now inlined.
      inlinedcss: {
        src: ['dist/main.css']
      },
    },

    /* Generate the images directory, in case it's missing */
    mkdir: {
      generateImages: {
        options: {
          create: ['src/images']
        }
      }
    },

    /* Copy the images */
    copy: {
      // Copy the "fixed" images that didn't require responsive versions into
      // the main image src folder
      // generateImages: {
      //   files: [{
      //     expand: true,
      //     cwd: 'src/images_src/fixed',
      //     src: ['*'],
      //     dest: 'src/images/'
      //   }]
      // },
      // copy all images over to dist
      images: {
        files: [{
          expand: true,
          cwd: 'src/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/images/'
        }]
      }
    },

    /* Copy and minify the SVG files */
    svgmin: {
      options: {
        //
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/images_src/fixed',
          src: ['**/*.svg'],
          dest: 'dist/images/'
        }]
      }
    },

    /* Additional build tasks */
    htmlmin: {
      main: { // This level has to be here, even if there's only one.
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeComments: true,
          minifyJS: true,
          minifyCSS: true
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['*.html'],
          dest:  'dist/'
        }]
      }
    },

    cssmin: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['*.css'],
          dest: 'dist/'
        }]
      }
    },

    // imagemin: {
    //   main: {
    //     files: [{
    //       expand: true,
    //       cwd: 'src/images/',
    //       src: ['**/*.{png,jpg,gif,svg}'],
    //       dest: 'dist/images/'
    //     }]
    //   }
    // },

    // Embed custom CSS
    replace: {
      dist: {
        options: {
          patterns: [{ // CSS
            match: /<link rel=\"stylesheet\" href=\"main.css\">/g,
            replacement: '<style>' +
                         '<%= grunt.file.read("dist/main.css") %>' +
                         '</style>'
          }]
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['index.html'],
          dest: 'dist/'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('generate-images', ['clean:generateImages', 'mkdir:generateImages', 'responsive_images']);
  grunt.registerTask('build', ['clean:build', 'htmlmin', 'cssmin', 'copy', 'svgmin', 'replace', 'clean:inlinedcss']);
};
