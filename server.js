"use strict";

const manifest = require("./manifest.js"); // Get the Application Config
const Glue = require("glue"); // Compose the application

const compose = (callback) => {
    Glue.compose(manifest, {
        relativeTo: `${process.cwd()}/server`
    }, (err, server) => {
        // $lab:coverage:off$
        if (err) {throw err;}
        // $lab:coverage:on$

        // $lab:coverage:off$
        if (!module.parent) {
            // Start the Server based on Application Config
            server.start(() => {
                console.log(`\ Server started at ${server.info.uri}`); // eslint-disable-line no-console
            });
        }

        if (typeof callback !== "undefined") {
            callback(null, server); // eslint-disable-line callback-return
        }
        // $lab:coverage:on$
    });
};

// If this module is not being required by another one, compose the server.
// $lab:coverage:off$
if (!module.parent) {
    compose();
}
// $lab:coverage:on$

module.exports = compose;
