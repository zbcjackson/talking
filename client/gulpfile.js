require('babel-core/register');
var gulp = require("gulp");
var gutil = require("gulp-util");
var notify = require("gulp-notify");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var mocha = require("gulp-mocha");

// The development server (the recommended option for development)
gulp.task("default", ["build-dev"]);

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["webpack:build-dev", "mocha", "webpack-dev-server"], function() {
  gulp.watch(["src/app/**/*"], ["webpack:build-dev"]);
  gulp.watch(["src/app/**/*", "src/app/test/**/*.js"], ["mocha"]);
});

gulp.task("mocha", function(){
  return gulp.src(['src/app/test/**/*.js'], { read: false })
        .pipe(mocha())
        .on('error', gutil.log)
        .on('error', notify.onError("Error: <%= error.message %>"));
})

// Production build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
  );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      chunks: false,
      colors: true
    }));
    callback();
  });
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      chunks: false,
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack-dev-server", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = "eval";
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    contentBase: "src/www/",
    hot: true,
    // publicPath: "/" + myConfig.output.publicPath,
    stats: {
      chunks: false,
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/");
  });
});