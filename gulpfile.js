"use strict";
const Gulp = require("gulp");
const path = require("path");
const Handlebars = require("handlebars");
const handlebars = require("gulp-handlebars");
const merge = require("merge-stream");
const wrap = require("gulp-wrap");
const declare = require("gulp-declare");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const less = require("gulp-less");
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const jshint = require("gulp-jshint");
const jshintXMLReporter = require("gulp-jshint-xml-file-reporter");
const jshintStylish = require("jshint-stylish");
const tar = require("gulp-tar");
const gzip = require("gulp-gzip");

const buildConfig = require("./build.json");
const appName = require("./package.json").name;

let clean;
let generatetemplates;
let jslint;
let local;
let ci;
let buildArtifact;

const buildGulp = (gulp, build) => {
    const cssOutputDir = build.cssOutputDir;
    const jsOutputDir = build.jsOutputDir;

    clean = cb => {
        return del(["./dist/**"], cb);
    };

    generatetemplates = () => {
        if (typeof buildConfig.preCompileTemplates !== "undefined" && buildConfig.preCompileTemplates === true) {
            const partials = gulp.src(`${buildConfig.templatesDir}/partials/**/*.hbs`)
                .pipe(handlebars({
                    handlebars: Handlebars
                }))
                .pipe(wrap("Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));", {}, {
                    imports: {
                        processPartialName: fileName => {
                            return JSON.stringify(path.basename(fileName, ".js"));
                        }
                    }
                }));

            const templates = gulp.src([`${buildConfig.templatesDir}/**/*.hbs`, `!${buildConfig.templatesDir}/**/partials/*.hbs`])
                .pipe(handlebars({
                    handlebars: Handlebars
                }))
                .pipe(wrap("Handlebars.template(<%= contents %>)"))
                .pipe(declare({
                    namespace: "App.templates",
                    noRedeclare: true
                }));

            return merge(partials, templates)
                .pipe(concat("templates.js"))
                .pipe(gulp.dest("temp/js/"));
        } else {
            return; // eslint-disable-line consistent-return
        }
    };

    jslint = () => {
        // Lint the things...
        return gulp.src(`${buildConfig.jsDir}/**/*.js`)
            .pipe(jshint())
            .pipe(jshint.reporter(jshintStylish))
            .pipe(jshint.reporter(jshintXMLReporter))
            .on("end", jshintXMLReporter.writeFile({
                format: "checkstyle",
                filePath: "./jshint.xml",
                alwaysReport: true
            }));
    };

    ci = cb => {
        for (let i = 0, j = buildConfig.build.length; i < j; ++i) {
            const page = buildConfig.build[i];

            if (page.js.length) {
                gulp.src(page.js)
                    .pipe(concat(`${appName}.js`))
                    .pipe(gulp.dest(jsOutputDir))
                    .pipe(uglify())
                    .pipe(rename({suffix: ".min"}))
                    .pipe(gulp.dest(jsOutputDir));
            }

            if (page.css.length) {
                gulp.src(page.css)
                    .pipe(less())
                    .pipe(rename({
                        basename: appName
                    }))
                    .pipe(gulp.dest(cssOutputDir))
                    .pipe(cleanCSS({compatibility: "*"}))
                    .pipe(rename({suffix: ".min"}))
                    .pipe(gulp.dest(cssOutputDir));
            }
        }

        cb();
    };

    local = cb => {
        for (let i = 0, j = buildConfig.build.length; i < j; ++i) {
            const page = buildConfig.build[i];

            if (page.js.length) {
                gulp.src(page.js)
                    .pipe(concat(`${appName}.js`))
                    .pipe(gulp.dest(jsOutputDir))
                    .pipe(uglify())
                    .on("error", err => {
                        console.log(err.message); // eslint-disable-line no-console
                    })
                    .pipe(rename({suffix: ".min"}))
                    .pipe(gulp.dest(jsOutputDir));
            }

            if (page.css.length) {
                gulp.src(page.css)
                    .pipe(less())
                    .on("error", err => {
                        console.log(err.message); // eslint-disable-line no-console
                    })
                    .pipe(rename({
                        basename: appName
                    }))
                    .pipe(gulp.dest(cssOutputDir))
                    .pipe(cleanCSS({compatibility: "*"}))
                    .pipe(rename({suffix: ".min"}))
                    .pipe(gulp.dest(cssOutputDir));
            }
        }

        cb();
    };

    buildArtifact = () => {
        gulp.src(["**/*", "!.git/**"])
            .pipe(tar(`${buildConfig.artifactName}.tar`))
            .pipe(gzip())
            .pipe(gulp.dest("."));
    };

    exports.clean = clean;
    exports.generatetemplates = gulp.series(clean, generatetemplates);
    exports.jslint = jslint;
    exports.ci = gulp.series(clean, generatetemplates, jslint, ci);
    exports.local = () => {
        gulp.watch([`${buildConfig.jsDir}/**/*.js`, `${buildConfig.lessDir}/**/*.less`, `${buildConfig.templatesDir}/**/*.hbs`], gulp.series(clean, generatetemplates, jslint, local));
    };
    exports.buildArtifact = buildArtifact;
    exports.default = gulp.series(clean, generatetemplates, jslint, ci);

    return gulp;
};

buildGulp(Gulp, buildConfig);
