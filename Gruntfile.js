module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		less: {
			development: {
				options: {
					paths: ['assets/css']
				},
				files: {
					'dist/css/strapped.css': 'static/less/strapped.less'
				}
			},
			production: {
				options: {
					paths: ['assets/css'],
					cleancss: true
				},
				files: {
					'dist/css/strapped.min.css': 'static/less/strapped.less'
				}
			}
		},

		copy: {
			css: {
				files: [{
					cwd: 'static/css/',
					expand: true,
					src: ['**'],
					dest: 'dist/css/'
				}]
			},
			images: {
				files: [{
					cwd: 'static/images/',
					expand: true,
					src: ['**'],
					dest: 'dist/images/'
				}]
			},
			fonts: {
				files: [{
					cwd: 'static/fonts/',
					expand: true,
					src: [
						'*.eot',
						'*.svg',
						'*.ttf',
						'*.woff'
					],
					dest: 'dist/fonts/'
				}]
			}
		},

		watch: {
			css: {
				files: [
					'static/less/*'
				],
				tasks: ['_buildCSS'],
				options: {
					livereload: true
				}
			},
			images: {
				files: [
					'static/images/**/*'
				],
				tasks: ['_buildImages'],
				options: {
					livereload: true,
				}
			},
			fonts: {
				files: [
					'static/fonts/**/*'
				],
				tasks: ['_buildFonts'],
				options: {
					livereload: true,
				}
			},
			html: {
				files: [
					'index.html'
				],
				tasks: ['_buildHTML'],
				options: {
					livereload: true,
				}
			}
		},

		open: {
			dev: {
				path: 'http://localhost:9876/index.html'
			},
		},

		connect: {
			server: {
				options: {
					port: 9876,
					base: '.'
				}
			}
		},

		'compile-handlebars': {
			dev: {
				template: 'index.html.hbs',
				templateData: {
					cssFile: "dist/css/strapped.css",
					includeLiveReload: true,
					ext: grunt.file.exists('./ext.json') ? grunt.file.read('./ext.json') : ''
				},
				output: 'index.html'
			}
		},
		'bower-install': {
			target: {
		    	src: ['index.html']
		  	}
		}
	});

	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-compile-handlebars');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-bower-install');

	grunt.registerTask('default', ['_devBuild','connect', 'bower-install', 'open', 'watch']);
	grunt.registerTask('_devBuild', ['_buildCSS', '_buildImages', '_buildFonts', '_buildHTML']);
	grunt.registerTask('_buildCSS', ['less']);
	grunt.registerTask('_buildImages', ['copy:images']);
	grunt.registerTask('_buildFonts', ['copy:fonts']);
	grunt.registerTask('_buildHTML', ['compile-handlebars']);
};
