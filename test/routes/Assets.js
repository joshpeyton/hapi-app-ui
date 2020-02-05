"use strict";
const Code = require("code");
const expect = Code.expect;
const Lab = require("lab");
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const before = lab.before;
// const after = lab.after;
// const beforeEach = lab.beforeEach;
// const afterEach = lab.afterEach;
// const nock = require("nock");
const _ = require("lodash");

const applicationServer = require("../../");

describe("Asset Routes", () => {
    // let nocks;
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

    before((done) => {

        applicationServer((err, obj) => {
            server = obj;
            done();
        });
    });

    describe("Successful Asset Load", () => {

        _.each(jsRoutes, (route) => {
            const url = route.url;

            describe(`When ${route.name} is requested`, () => {
                it("should return a 200 HTTP Code with content-type set to application/javascript", (done) => {
                    server.inject({
                        url,
                        method: "get"
                    }, (response) => {

                        expect(response.statusCode).to.equal(200);
                        expect(response.headers["content-type"]).to.equal("application/javascript; charset=utf-8");

                        done();
                    });
                });
            });
        });

        _.each(cssRoutes, (route) => {
            const url = route.url;

            describe(`When ${route.name} is requested`, () => {
                it("should return a 200 HTTP Code with content-type set to text/css", (done) => {
                    server.inject({
                        url,
                        method: "get"
                    }, (response) => {

                        expect(response.statusCode).to.equal(200);
                        expect(response.headers["content-type"]).to.equal("text/css; charset=utf-8");

                        done();
                    });
                });
            });
        });
    });

    describe("Bad Route", () => {
        const url = "/css/hapi-app.css";

        describe("When a bad route is requested", () => {
            it("should return a 404 HTTP Code", (done) => {
                server.inject({
                    url,
                    method: "get"
                }, (response) => {

                    expect(response.statusCode).to.equal(404);

                    done();
                });
            });
        });
    });
});
