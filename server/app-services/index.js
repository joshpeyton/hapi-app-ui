"use strict";

module.exports = {
    name: "serverServices",
    version: "1.0.0",
    register: async server => {
        /**
     *  App Services Setup
     */
        const ServicesConfig = {
            endpoint: server.settings.app.services.host,
            headers: {
                Authorization: server.settings.app.services.authHeader
            }
        };
    // setup proxy if needed
    // $lab:coverage:off$
        if (server.settings.app.services.proxy) {
            ServicesConfig.proxy = server.settings.app.services.proxy;
        }
    // $lab:coverage:on$
    }
};
