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

describe("Page Routes", () => {
    // let nocks;
    let server;

    const Routes = [
        {
            name: "Route for App Page",
            url: "/"
        }
    ];

    before((done) => {

        applicationServer((err, obj) => {
            server = obj;
            done();
        });
    });

    describe("Successful Page Load", () => {

        _.each(Routes, (route) => {
            const url = route.url;

            describe(`When ${route.name} is requested`, () => {
                it("should return a 200 HTTP Code with content-type set to text/html", (done) => {
                    server.inject({
                        url,
                        method: "get"
                    }, (response) => {

                        expect(response.statusCode).to.equal(200);
                        expect(response.headers["content-type"]).to.equal("text/html; charset=utf-8");

                        done();
                    });
                });
            });
        });
    });

    describe("Bad Route", () => {
        const url = "/tv/";

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
