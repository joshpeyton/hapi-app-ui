"use strict";

module.exports = function (server) {
    // handle home route
    server.route({
        method: "GET",
        path: "/static/{param*}",
        handler: {
            directory: {
                path: "dist/"
            }
        }
    });
};
