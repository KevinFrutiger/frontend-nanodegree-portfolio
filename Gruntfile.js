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
      }
    },

    /* Generate the images directory, in case it's missing */
    mkdir: {
      generateImages: {
        options: {
          create: ['src/images']
        }
      }
    },

    /* Copy the "fixed" images that don't require responsive versions */
    copy: {
      generateImages: {
        files: [{
          expand: true,
          cwd: 'src/images_src/fixed',
          src: ['*'],
          dest: 'src/images/'
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
          cwd: 'src/css/',
          src: ['*.css'],
          dest: 'dist/css/'
        }]
      }
    },

    imagemin: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/images/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/images/'
        }]
      }
    },

  });

  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('generate-images', ['clean:generateImages', 'mkdir:generateImages', 'responsive_images', 'copy:generateImages']);
  grunt.registerTask('build', ['clean:build', 'htmlmin', 'cssmin', 'imagemin'])
};
