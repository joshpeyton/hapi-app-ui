"use strict";

module.exports = function (server) {
    // handle asset routes
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
