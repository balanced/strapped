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
			js: {
				files: [{
					cwd: 'static/js/',
					expand: true,
					src: ['**'],
					dest: 'dist/js/'
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

		'compile-handlebars': {
			dev: {
				template: 'examples/index.hbs',
				templateData: {
					cssFile: "dist/css/strapped.min.css",
					jsLibFile: "dist/js/compiled_templates.js",
					includeLiveReload: true,
					ext: grunt.file.exists('./ext.json') ? grunt.file.read('./ext.json') : ''
				},
				partials: 'examples/partials/*.hbs',
				output: 'index.html'
			}
		},

		watch: {
			hbs: {
				files: [
					'examples/partials/*.hbs'
				],
				tasks: ['_buildHTML'],
				options: {
					livereload: true
				}				
			},
			css: {
				files: [
					'static/less/*.less'
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

		'bower-install': {
			target: {
				src: ['examples/index.hbs']
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

	grunt.registerTask('default', ['_devBuild', 'connect', 'open', 'watch']);
	grunt.registerTask('_devBuild', ['bower-install', '_buildCSS', '_buildImages', '_buildFonts', '_buildHTML']);
	grunt.registerTask('_buildCSS', ['less']);
	grunt.registerTask('_buildImages', ['copy:images']);
	grunt.registerTask('_buildFonts', ['copy:fonts']);
	grunt.registerTask('_buildHTML', ['compile-handlebars']);
	grunt.registerTask('format', ['jsbeautifier:update']);
	grunt.registerTask('verify', ['lesslint', 'jshint', 'jsbeautifier:verify']);
};
