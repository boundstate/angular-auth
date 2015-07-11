module.exports = function (karma) {
  karma.set({
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      '*.js'
    ],
    frameworks: ['jasmine'],
    plugins: ['karma-jasmine', 'karma-phantomjs-launcher'],
    reporters: 'dots',
    autoWatch: false,
    browsers: ['PhantomJS']
  });
};