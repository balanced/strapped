module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		bootstrap: {
			dest: 'examples',
			js: [
				'bootstrap-scrollspy.js'
			],
			css: [
				'reset.less',
				'grid.less'
			]
		},

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
			fonts: {
				files: [{
					cwd: 'static/fonts',
					expand: true,
					src: ['**'],
					dest: 'examples/fonts'
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
				tasks: ['_buildJS'],
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
			scripts: {
				files: ['static/*'],
				updateConfigs: ['pkg'],
				commitFiles: ['-a'],
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

	grunt.loadNpmTasks('grunt-bootstrap');
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
	grunt.registerTask('_devBuild', ['copy:fonts', '_buildJS', '_buildCSS', '_buildHTML']);
	grunt.registerTask('_buildJS', ['clean', 'concat']);
	grunt.registerTask('_buildCSS', ['less']);
	grunt.registerTask('_buildHTML', ['compile-handlebars']);
	grunt.registerTask('format', ['jsbeautifier:update']);
	grunt.registerTask('verify', ['lesslint', 'jshint', 'jsbeautifier:verify']);
};
