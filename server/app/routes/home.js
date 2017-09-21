"use strict";

module.exports = function(server) {
    // handle home route
    server.route({
        method: "GET",
        path: "/",
        handler: { PageHandler: { view: "page" } }
    });
};
