'use strict';

module.exports = function (grunt) {

    grunt.config.set('babel', {
        options: {
            sourceMap: false,
            comments: false
        },
        dist: {
            files: [
                { expand: true, cwd: './src', src: ['**/*.js'], dest: 'lib' }
            ]
        }
    });

    grunt.loadNpmTasks('grunt-babel');
};