'use strict';

module.exports = function (grunt) {

    grunt.config.set('clean', {
        dist: ['lib']
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
};