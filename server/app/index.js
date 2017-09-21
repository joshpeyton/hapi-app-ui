"use strict";

const appName = require("../../package.json").name;
const packageJson = require("./package.json");
const Handlebars = require("handlebars");
//const _ = require("lodash"); // use for utilities
//const Joi = require("joi"); // use for validation

// Handler Implementations
const PageHandlerImpl = require("./handlers/page.js");

// Routes
const homeRoute = require("./routes/home");
const assetRoute = require("./routes/assets");

exports.register = function (server, options, next) {

    /**
     * Setup the Views for App
     */
    // $lab:coverage:off$
    server.views({
        engines: {
            hbs: { module: Handlebars.create() }
        },
        path: `${__dirname}/views`,
        partialsPath: `${__dirname}/views/partials`,
        helpersPath: `${__dirname}/views/helpers`,
        isCached: (server.settings.app.cache.views === "true") ? true : false
    });
    // $lab:coverage:on$

    /**
     * Build the globalContext for views
     */
    // $lab:coverage:off$
    const globalContext = {
        "global": {
            "siteName": appName,
            "cdn": server.settings.app.cdn,
            "isProd": (server.settings.app.environment === "production") ? true : false
        }
    };

    // $lab:coverage:on$

    server.bind(globalContext);

    /**
     * Register Handlers
     */
    server.handler("PageHandler", (route, handlerOptions) => {
        return function (request, reply) {
            return PageHandlerImpl.apply(this, [handlerOptions, server, request, reply]);
        };
    });


    /**
     * Route for home/root
     */
    homeRoute(server);

    /**
     * Route for assets
     */
    assetRoute(server);


    next();

};

exports.register.attributes = {
    pkg: packageJson
};
