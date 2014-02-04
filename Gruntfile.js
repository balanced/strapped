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
					'build/css/strapped.css': 'static/less/strapped.less'
				}
			},
			production: {
				options: {
					paths: ['assets/css'],
					cleancss: true
				},
				files: {
					'build/css/strapped.min.css': 'static/less/strapped.less'
				}
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
		copy: {
			css: {
				files: [{
					cwd: 'build/css/',
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
					dest: 'build/images/'
				}, {
					cwd: 'static/images/',
					expand: true,
					src: ['**'],
					dest: 'build/test/images/'
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
					dest: 'build/fonts/'
				}, {
					cwd: 'static/fonts/',
					expand: true,
					src: [
						'*.eot',
						'*.svg',
						'*.ttf',
						'*.woff'
					],
					dest: 'build/test/fonts/'
				}]
			}
		},
		open: {
			dev: {
				path: 'http://localhost:9876/build/dev.html'
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
					cssFile: "css/strapped.css",
					includeLiveReload: true,
					ext: grunt.file.exists('./ext.json') ? grunt.file.read('./ext.json') : ''
				},
				output: 'build/dev.html'
			},
			prod: {
				template: 'index.html.hbs',
				templateData: {
					cssFile: "css/strapped.css",
					includeLiveReload: false
				},
				output: 'build/prod.html'
			}
		},
		'bower-install': {
			target: {
		    	src: ['build/dev.html', 'build/prod.html']
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
