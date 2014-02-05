module.exports = function(grunt) {
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
					cssFile: "dist/css/strapped.min.css",
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
		},

		jsbeautifier: {
			options: {
				config: '.jsbeautifyrc'
			},
			verify: {
				options: {
					mode: 'VERIFY_ONLY'
				},
				src: [
					'Gruntfile.js',
					'static/js/*.js'
				],
			},
			update: {
				options: {
					mode: 'VERIFY_AND_WRITE'
				},
				src: [
					'Gruntfile.js',
					'static/js/*.js'
				],
			}
		},

		jshint: {
			all: [
				'Gruntfile.js',
				'static/js/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		lesslint: {
			src: ['static/less/strapped.less']
		}
	});

	grunt.loadNpmTasks('grunt-bower-install');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-compile-handlebars');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.loadNpmTasks('grunt-lesslint');

	grunt.registerTask('default', ['_devBuild', 'connect', 'bower-install', 'open', 'watch']);
	grunt.registerTask('_devBuild', ['_buildCSS', '_buildImages', '_buildFonts', '_buildHTML']);
	grunt.registerTask('_buildCSS', ['less']);
	grunt.registerTask('_buildImages', ['copy:images']);
	grunt.registerTask('_buildFonts', ['copy:fonts']);
	grunt.registerTask('_buildHTML', ['compile-handlebars']);
	grunt.registerTask('format', ['jsbeautifier:update']);
	grunt.registerTask('verify', ['lesslint', 'jshint', 'jsbeautifier:verify']);
};
