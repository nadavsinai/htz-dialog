const path = require('path');
const webpackMerge = require('webpack-merge');
const testConfig = require('./config/webpack/test-web.config');
const webpackConfig = webpackMerge(testConfig, {devtool: 'inline-source-map', target: 'web'});
// Our testing bundle is made up of our unit tests, which
// should individually load up pieces of our application.


// karma.conf.js
module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-sinon'],
    // // list of files / patterns to load in the browser
    files: [
      // './node_modules/promise-polyfill/promise.js', // important for PhantomJS
      'tests/karmaTestsRunner.js', // loads all tests via webpack context require
    ],
    // list of files to exclude
    exclude: [],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests/karmaTestsRunner.js': ['webpack', 'sourcemap']
    },
    // // list of paths mappings
    // // can be used to map paths served by the Karma web server to /base/ content
    // // knowing that /base corresponds to the project root folder (i.e., where this config file is located)
    // proxies: {
    //     "/.tmp": "/base/.tmp" // without this, karma-jspm can't load the files
    // },
    // must go along with above, suppress annoying 404 warnings.
    proxies: {},
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],
    webpack: webpackConfig,// webpack configuration
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },
    // reporter options
    mochaReporter: {
      // first run will have the full output
      // next runs will just output the summary and errors in mocha style
      output: 'autowatch',
      colors: {
        success: 'green',
        info: 'bgYellow',
        warning: 'cyan',
        error: 'bgRed'
      },
      divider: ''
    },
    coverageReporter: {
      includeAllSources: true,
      instrumenters: {
        isparta: require('isparta')
      },
      instrumenter: {
        "**/*.js": 'isparta'
      },
      reporters: [
        {
          type: 'html',
          dir: 'coverage',
          subdir: normalizationBrowserName
        },
        {
          type: 'text',
          dir: 'coverage',
          subdir: normalizationBrowserName
        },
        {
          type: 'lcov',
          dir: 'coverage',
          subdir: normalizationBrowserName
        },
        //{
        //  type: 'json',
        //  file : 'coverage-final.json',
        //  dir: '../coverage',
        //  instrumenter: {
        //    '**/*.js': 'isparta' // Force the use of the isparta instrumenter to cover JS files
        //  },
        //  //subdir: '.'
        //}
      ]
    },
    browsers: ['PhantomJS'],
    //
    customLaunchers: {
      Chrome_for_Travis_CI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 2,
    // concurrency level how many browser should be started simultaneously
    concurrency: 4,
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 100000,
    client: {
      useIframe: true,
      clearContext: false
    },
    browserNoActivityTimeout: 30000,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // logLevel: config.LOG_DEBUG,
    logLevel: config.LOG_ERROR,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};

function normalizationBrowserName(browser) {
  return browser.toLowerCase().split(/[ /-]/)[0];
}
