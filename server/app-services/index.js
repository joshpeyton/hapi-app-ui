"use strict";

const packageJson = require("./package.json");
// const _ = require("lodash"); // used for utilities

exports.register = function (server, options, next) {
    /**
     *  App Services Setup
     */
    const ServicesConfig = {
        endpoint: server.settings.app.services.host,
        headers: {
            "Authorization": server.settings.app.services.authHeader
        }
    };
    // setup proxy if needed
    // $lab:coverage:off$
    if (server.settings.app.services.proxy) {
        ServicesConfig.proxy = server.settings.app.services.proxy;
    }
    // $lab:coverage:on$

    next();
};

// Register the Hapi.js Plugin
exports.register.attributes = {
    pkg: packageJson
};
