const gulp        = require('gulp'); // какие пакеты используем   
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass')); 
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const plumber = require('gulp-plumber');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist" // из какой папки сервер запускается
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // запустили sass какой стиль и показ где ошибка
        .pipe(rename({suffix: '.min', prefix: ''}))// min css делаем
        .pipe(autoprefixer()) // 
        .pipe(cleanCSS({compatibility: 'ie8'})) //очистка css
        .pipe(gulp.dest("dist/css")) //куда положить новый файл
        .pipe(gulp.dest("src/css")) //куда положить новый файл
        .pipe(browserSync.stream()); // после изменения запуск заново
});

gulp.task('watch', function() { // отслеживание изменения в файлах стилей и хтмл
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));// gulp.parallel('styles') что изменяется
    gulp.watch("src/js/**/*.js").on('change', gulp.parallel('scripts', browserSync.reload));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
})

gulp.task('html', function() {
    return gulp.src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true })) // убираем пробелы
    .pipe(gulp.dest("dist/"))
});

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(plumber())
        .pipe(gulp.dest("dist/js"));
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(plumber())
        .pipe(gulp.dest("dist/icons"));
});

gulp.task('mailer', function () {
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer"));
});

gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'html', 'images')); // запуск функций