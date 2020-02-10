"use strict";

const rest = require("rest");
const defaultRequest = require("rest/interceptor/defaultRequest");
const mime = require("rest/interceptor/mime");
const errorCode = require("rest/interceptor/errorCode");

module.exports = rest
    .wrap(mime)
    .wrap(errorCode, { code: 400})
    .wrap(defaultRequest, { headers: { "Accept": "application/hal+json" }});
