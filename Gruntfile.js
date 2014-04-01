module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*\n    The MIT License (MIT)\n\n    Copyright (c) 2014 Oliver Moran\n\n    Permission is hereby granted, free of charge, to any person obtaining a copy of\n    this software and associated documentation files (the "Software"), to deal in\n    the Software without restriction, including without limitation the rights to\n    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies\n    of the Software, and to permit persons to whom the Software is furnished to do\n    so, subject to the following conditions:\n\n    The above copyright notice and this permission notice shall be included in all\n    copies or substantial portions of the Software.\n\n    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n    SOFTWARE.\n*/\n'
            },
            dist: {
                files: {
                    '<%= pkg.name %>-<%= pkg.version %>.min.js': ['src/**/*.js']
                }
            }
        },
        qunit: {
            files: ['test/**/*.html']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('default', ['uglify']);
};