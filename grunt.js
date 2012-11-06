module.exports = function(grunt) {

    grunt.initConfig({
        lint: {
            all: ['keymapper.js']
        },
        min: {
            dist: {
                src: ['keymapper.js'],
                dest: 'keymapper.min.js'
            }
        }
    });

    grunt.registerTask('default', 'lint min');

};

