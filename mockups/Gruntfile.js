module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['css/*.less'],
                tasks: ['less', 'shell:copyCSS'],
                options: {
                    spawn: false,
                },
            },
        },
        less: {
            development: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "css/profile.css": "css/profile.less"
                }
            }
        },
        shell: {
            copyCSS: {
                command: 'cp css/profile.css ../public/stylesheets/dashboard-test.css',
                options: {
                    stdout: true
                }
            }
        }
    });
                     
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-shell');
    // grunt.registerTask('default', ['']);

};
