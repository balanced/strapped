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
					'examples/css/strapped.css': 'static/less/strapped.less',
					'examples/css/style.min.css': 'examples/css/style.less'
				}
			}
		},

		'compile-handlebars': {
			index: {
				template: 'examples/index.hbs',
				templateData: 'examples/data.json',
				partials: 'examples/partials/*.hbs',
				output: 'index.html'
			},
			notfound: {
				template: 'examples/notfound.hbs',
				templateData: 'examples/data.json',
				output: 'notfound/notfound.html'
			}
		},

		clean: {
			files: {
				src: ['examples/js/built.js']
			}
		},

		concat: {
			options: {
				separator: '\n'
			},
			dist: {
				src: ['examples/js/*.js'],
				dest: 'examples/js/built.js'
			}
		},

		copy: {
			bootstrap: {
				files: [{
					cwd: 'bower_components/bootstrap/less',
					expand: true,
					src: ['**'],
					dest: 'static/less/bootstrap'
				}, {
					cwd: 'bower_components/bootstrap/js',
					expand: true,
					src: ['**'],
					dest: 'static/js/bootstrap'
				}]
			},
			fonts: {
				files: [{
					cwd: 'static/fonts',
					expand: true,
					src: ['**'],
					dest: 'examples/fonts'
				}]
			},
			images: {
				files: [{
					cwd: 'static/images',
					expand: true,
					src: ['**'],
					dest: 'examples/images'
				}]
			},
			notfound: {
				files: [{
					cwd: 'static/images/404',
					expand: true,
					src: ['**'],
					dest: 'notfound/images'
				}, {
					cwd: 'examples/css',
					expand: true,
					src: ['**.min.css'],
					dest: 'notfound/css'
				}, {
					cwd: 'static/fonts',
					expand: true,
					src: ['**'],
					dest: 'notfound/fonts'
				}]
			}
		},

		watch: {
			hbs: {
				files: [
					'examples/partials/*.hbs',
					'examples/*.hbs',
				],
				tasks: ['_buildHTML'],
				options: {
					livereload: true
				}
			},
			js: {
				files: [
					'examples/js/strapped.js'
				],
				tasks: ['format', '_buildJS'],
				options: {
					livereload: true
				}
			},
			css: {
				files: [
					'static/less/*.less',
					'examples/css/style.less'
				],
				tasks: ['_buildCSS'],
				options: {
					livereload: true
				}
			},
			images: {
				files: [
					'static/images/*'
				],
				tasks: ['copy:images'],
				options: {
					livereload: true
				}
			}
		},

		open: {
			index: {
				path: 'http://localhost:9898/index.html'
			},
		},

		connect: {
			server: {
				options: {
					port: 9898,
					base: '.'
				}
			}
		},

		'bower-install': {
			target: {
				src: ['examples/index.hbs']
			}
		},

		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version v%VERSION%',
				commit: true,
				commitFiles: ['-a'],
				commitMessage: 'Release v%VERSION%',
				push: false
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
	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-compile-handlebars');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.loadNpmTasks('grunt-lesslint');

	grunt.registerTask('default', ['bower-install', '_devBuild', 'connect', 'open', 'watch']);
	grunt.registerTask('_devBuild', ['copy:fonts', 'copy:images', 'copy:bootstrap', '_buildJS', '_buildCSS', 'copy:notfound', '_buildHTML']);
	grunt.registerTask('_buildJS', ['clean', 'concat']);
	grunt.registerTask('_buildCSS', ['less']);
	grunt.registerTask('_buildHTML', ['compile-handlebars']);
	grunt.registerTask('format', ['jsbeautifier:update']);
	grunt.registerTask('verify', ['lesslint', 'jshint', 'jsbeautifier:verify']);
};
