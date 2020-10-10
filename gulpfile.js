const gulp = require("gulp");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
gulp.task("copy-html", function () {
    return gulp
      .src("html/*.html")
      .pipe(
        htmlmin({
          removeEmptyAttibutes: true, // 移出所有空属性
          collapseWhitespace: true, // 压缩 html
        })
      )
      .pipe(gulp.dest("dist/html"))
      .pipe(connect.reload());
});
gulp.task("images", function () {
    return gulp
      .src("images/**/*")
      .pipe(gulp.dest("dist/images"))
      .pipe(connect.reload());
  });

  gulp.task("php", function () {
    return gulp
      .src("php/**/*")
      .pipe(gulp.dest("dist/php"))
      .pipe(connect.reload());
  });

//icon
gulp.task("iconfont", function () {
  return gulp
    .src("iconfont/**/*")
    .pipe(gulp.dest("dist/iconfont"))
    .pipe(connect.reload());
});

// const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

gulp.task("scripts", function(){
  return gulp.src(["javaScript/*.js", "!gulpfile.js"])
  // .pipe(gulp.dest("dist/javaScript"))
  // .pipe(uglify())
  // .pipe(rename("index.min.js"))
  .pipe(gulp.dest("dist/javaScript"))
  .pipe(connect.reload());
})


gulp.task("data", function(){
      return gulp.src(["json/*.json", "!package.json"])
      .pipe(gulp.dest("dist/json"))
      .pipe(connect.reload());
    })
//一次性执行多个任务的操作    
// //静态资源，希望在运行之前，可以先去执行一次，生成到我们的目录文件夹里
gulp.task("build", ["copy-html", "images", "scripts", "data", "sass"], function(){
      console.log("项目建立成功");
})

const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const minifyCSS = require("gulp-minify-css");

// //如果涉及到重命名，我们要一个任务一个文件

// //主页index文件的复制
gulp.task("sass", function(){
      return gulp.src("css/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("dist/css"))
      .pipe(minifyCSS())
      .pipe(rename("index.min.css"))
      .pipe(gulp.dest("dist/css"))
      .pipe(connect.reload());
    })
    
//监听
gulp.task("watch", function(){
      gulp.watch("html/*.html", ['copy-html']);
      gulp.watch("images/**/*", ['images']);
      gulp.watch("php/**/*", ['php']);
      gulp.watch("iconfont/**/*", ['iconfont']);
      gulp.watch(["javaScript/*.js", "!gulpfile.js"], ['scripts']);
      gulp.watch(["json/*.json", "!package.json"], ['data']);
      //多个scss逐个添加
      gulp.watch("css/*.scss", ['sass']);
    //   gulp.watch("css/登录.scss", ['index-sass']);
    //   gulp.watch("css/注册.scss", ['index-sass']);
    //   gulp.watch("css/购物车.scss", ['index-sass']);
    //   gulp.watch("css/放大镜.scss", ['index-sass']);
    })
    
    
    // 启动服务
    const connect = require("gulp-connect");
    gulp.task("server", function(){
      connect.server({
        root: "dist",
        port: 8888,
        livereload: true
      })
    })
    
    gulp.task("default", ["watch", "server"]);