"use strict";
const Code = require("@hapi/code");
const expect = Code.expect;
const Lab = require("@hapi/lab");
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const before = lab.before;
// const after = lab.after;
// const beforeEach = lab.beforeEach;
// const afterEach = lab.afterEach;
// const nock = require("nock"); // Use nock for testing external apis
const _ = require("lodash");

const { init } = require("../../server");

describe("Asset Routes", () => {

    let server;

    const jsRoutes = [
        {
            name: "Route for JS Assets",
            url: "/static/js/hapi-app-ui.js"
        }
    ];

    const cssRoutes = [
        {
            name: "Route for CSS Assets",
            url: "/static/css/hapi-app-ui.css"
        }
    ];

    before(async () => {


        server = await init();

    });

    describe("Successful Asset Load", () => {

        _.each(jsRoutes, route => {
            const url = route.url;

            describe(`When ${route.name} is requested`, () => {
                it("should return a 200 HTTP Code with content-type set to application/javascript", async () => {
                    await server.inject({
                        url,
                        method: "get"
                    }, response => {

                        expect(response.statusCode).to.equal(200);
                        expect(response.headers["content-type"]).to.equal("application/javascript; charset=utf-8");
                    });
                });
            });
        });

        _.each(cssRoutes, route => {
            const url = route.url;

            describe(`When ${route.name} is requested`, () => {
                it("should return a 200 HTTP Code with content-type set to text/css", async () => {
                    await server.inject({
                        url,
                        method: "get"
                    }, response => {

                        expect(response.statusCode).to.equal(200);
                        expect(response.headers["content-type"]).to.equal("text/css; charset=utf-8");

                    });
                });
            });
        });
    });

    describe("Bad Route", () => {
        const url = "/css/hapi-app.css";

        describe("When a bad route is requested", () => {
            it("should return a 404 HTTP Code", async () => {
                await server.inject({
                    url,
                    method: "get"
                }, response => {

                    expect(response.statusCode).to.equal(404);

                });
            });
        });
    });
});
