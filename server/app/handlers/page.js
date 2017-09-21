"use strict";

const _ = require("lodash");

module.exports = function (options, server, request, reply) {
    const view = options.view;

    // Setup the response context
    const context = {};
    const globalContext = _.clone(this.global, true);

    _.defaults(context, globalContext);

    // Setup the Page Context
    context.page = {};
    // Assign the Page Title to Response Context
    context.page.title = "Page Title";
    // Create Meta Description and Add to Context
    context.metaDescription = "Page Description";

    return reply.view(`templates/${view}`, context);
};
