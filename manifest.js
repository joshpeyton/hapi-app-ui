"use strict";
// $lab:coverage:off$
/**
 * Application Config
 */

/**
 * Plugins
 */

const manifest = {
    "registrations": [
        {
            "plugin": {
                "register": "vision"
            }
        },
        {
            "plugin": {
                "register": "inert"
            }
        },
        {
            "plugin": {
                "register": "./app-services"
            }
        },
        {
            "plugin": {
                "register": "./app"
            }
        }
    ]
};

/**
 * Server Config
 */
manifest.server = manifest.server || {};
manifest.connections = [
    {
        "port": process.env.PORT || 3000,
        "host": process.env.HOST || "localhost"
    }
];

manifest.server.app = manifest.server.app || {};
manifest.server.app.environment = process.env.environment || "development";
manifest.server.app.generic_error_page_url = process.env.generic_error_page_url || "/404";

/**
 * Services Config
 */
manifest.server.app.services = {};
manifest.server.app.services.host = process.env.services_host || "www.domain.com";
manifest.server.app.services.authHeader = process.env.services_authheader || "Auth Token Here";
manifest.server.app.services.proxy = process.env.services_proxy || null;

/**
 * Server Method Timeouts Config
 */
manifest.server.app.timeout = {};
/**
 * Server Caching Config
 */
manifest.server.app.cache = {};
manifest.server.app.cache.views = process.env.cache_views || "true";

/**
 * CDN Config
 */

// Setup cdn object
manifest.server.app.cdn = {};

// Setup cdn url if using cdn for app client assets
manifest.server.app.cdn.url = process.env.cdn_url || "static/";

// Setup javascript dependencies array (leave array blank if none)
manifest.server.app.cdn.js = process.env.cdn_js || ["https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"];

// Setup css dependencies array (leave array blank if none)
manifest.server.app.cdn.css = process.env.cdn_css || [];

module.exports = manifest;
// $lab:coverage:on$
