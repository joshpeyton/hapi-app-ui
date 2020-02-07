"use strict";

const manifest = require("./manifest.js"); // Get the Application Config
const Glue = require("@hapi/glue"); // Compose the application

const options = {
    relativeTo: `${process.cwd()}/server`
};
// $lab:coverage:off$
exports.init = async () => {
    const server = await Glue.compose(manifest, options);
    await server.initialize();
    return server;
};

exports.startServer = async () => {
    try {
        const server = await Glue.compose(manifest, options);
        await server.start();
        console.log(`\ Server started at ${server.info.uri}`); // eslint-disable-line no-console
    } catch (err) {
        console.error(err); // eslint-disable-line no-console
        throw err;
    }
};
// $lab:coverage:on$
