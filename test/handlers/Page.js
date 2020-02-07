"use strict";
const Code = require("@hapi/code");
const expect = Code.expect;
const Lab = require("@hapi/lab");
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;

const PageHandlerImpl = require("../../server/app/handlers/page.js");

const thisObj = {
    global: {
        cdn: {},
        isProd: false
    }
};

const optionsObj = {};

const serverObj = {};

const requestObj = {
    params: {},
    server: {},
    query: {},
    state: {},
    url: {}
};

const replyObj = {
    view: (name, context) => {
        return context;
    }
};

describe("Page Handler", () => {
    it("context should be an object", async () => {
        const context = PageHandlerImpl.apply(thisObj, [optionsObj, serverObj, requestObj, replyObj]);

        expect(context).to.be.object();

    });
});
