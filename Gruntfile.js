/*global module:false*/
module.exports = function( grunt ){

	// load all grunt tasks
	require( 'load-grunt-tasks' )( grunt );

	// load Assemble task seperately as directive doesn't pick it up
	grunt.loadNpmTasks( 'assemble' );

	// Project configuration.
	grunt.initConfig({

		clean: {
			all: {
				src: './deploy/*'
			}
		},

		assemble: {
			options: {
				flatten: true,
				partials: './source/templates/partials/**/*.hbs',
				helpers: 'handlebars-helper-compose',
				compose: {
					cwd: './source/content/',
				}
			},
			all: {
				src: './source/templates/layouts/index.hbs',
				dest: './deploy/',
			}
		},

		replace: {
			development: {
				options: {
					variables: {
						styles: './css/styles.css',
						libs: './js/libs.js',
						scripts: './js/scripts.js'
					}
				},

				files: [{
					src: './deploy/index.html',
					dest: './deploy/index.html'
				}]
			},

			production: {
				options: {
					variables: {
						styles: './css/styles.min.css',
						libs: './js/libs.min.js',
						scripts: './js/scripts.min.js'
					}
				},

				files: [{
					src: './deploy/index.html',
					dest: './deploy/index.html'
				}]
			}
		},

		copy: {
			all: {
				expand : true,
				dest: './deploy/',
				cwd: './source/assets/',
				src: [ '**/*.*' ]
			},
		},
		
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require( 'jshint-stylish' )
			},
			all: [
				'Gruntfile.js',
				'./source/scripts/*.js',
			]
		},

		bower_concat: {
			all: {
				dest: './deploy/js/libs.js',
				dependencies: {
					'imagesloaded': 'jquery',
				}
			}
		},

		concat: {
			all: {
				src: './source/scripts/scripts.js',
				dest: './deploy/js/scripts.js'
			}
		},

		uglify: {
			all: {
				files: {
					'./deploy/js/scripts.min.js': './deploy/js/scripts.js',
					'./deploy/js/libs.min.js': './deploy/js/libs.js'
				}
			}
		},

		less: {
			development: {
				files: {
					'./deploy/css/styles.css': './source/styles/styles.less'
				}
			},

			production: {
				options: {
					cleancss: true,
				},

				files: {
					'./deploy/css/styles.min.css': './source/styles/styles.less'
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: [
					'Android 2.3',
					'Android >= 4',
					'Chrome >= 20',
					'Firefox >= 24', // Firefox 24 is the latest ESR
					'Explorer >= 8',
					'iOS >= 6',
					'Opera >= 12',
					'Safari >= 6'
				]
			},

			development: {
				src: './deploy/css/styles.css'
			},

			production: {
				src: './deploy/css/styles.min.css'
			},
		},

		express: {
		    all: {
		        options: {
		            bases: ['./deploy/'],
		            port: 9000,
		            hostname: "0.0.0.0",
		            livereload: true,
		            keepalive: true
		        }
		    }
		},

		watch: {
		    all: {
		    	files: [
					'./source/content/**/*.md',
					'./source/templates/**/*.hbs',
					'./source/assets/**/*.*',
					'./source/scripts/*.js',
					'./source/styles/*.less',
		    	],
		    	tasks: [ 
		    		'prepare:development'
		    	],
	            options: {
    	            livereload: true
		        }
		    }
		},

		open: {
			all: {
				path: 'http://localhost:<%= express.all.options.port%>'
			}
		},

		'ftp-deploy': {
			acceptance: {
				auth: {
					host: 'ftpcluster.loopia.se',
					port: 21,
					authKey: 'key',
				},
				src: './deploy',
				dest: '/public_html/acceptance/',
				exclusions: [ './deploy/**/.DS_Store' ]
			},
			production: {
				auth: {
					host: 'ftpcluster.loopia.se',
					port: 21,
					authKey: 'key',
				},
				src: './deploy',
				dest: '/public_html/',
				exclusions: [ './deploy/**/.DS_Store' ]
			}
		}
	});

	// Default task.
	grunt.registerTask( 'default', [

		'clean:all',
		'assemble:all',
		'copy:all',
		'jshint:all',
		'bower_concat:all',
		'concat:all',
	]);

	grunt.registerTask( 'prepare:development', [

		'default',
		'less:development',
		'autoprefixer:development',
		'replace:development',
	]);	

	grunt.registerTask( 'development', [

		'prepare:development',
		'open:all',
		'express:all',
		'watch:all'
	]);

	grunt.registerTask( 'prepare:acceptance', [

		'default',
		'less:production',
		'autoprefixer:production',
		'replace:production',
		'uglify:all'
	]);

	grunt.registerTask( 'acceptance', [

		'prepare:acceptance',
		'ftp-deploy:acceptance',
	]);

	grunt.registerTask( 'production', [

		'prepare:acceptance',
		'ftp-deploy:production',
	]);
};
