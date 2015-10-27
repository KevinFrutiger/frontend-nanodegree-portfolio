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
            quality: 70
          },
          {
            width: '66.66%',
            rename: false,
            suffix: '@2x',
            quality: 70
          },
          {
            width: '33.33%',
            rename: false,
            suffix: '@1x',
            quality: 70
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

    /* Clear out the images directory if it exists */
    clean: {
      generateImages: {
        src: ['src/images']
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
    }
  });

  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('generate-images', ['clean:generateImages', 'mkdir:generateImages', 'responsive_images', 'copy:generateImages']);

};
