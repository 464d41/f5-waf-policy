"use strict";

const Policy = require("./lib/policy").Policy;
const Header = require("./lib/policy").Header;
const isValidPolicy = require("./lib/schemas/policy")

module.exports = { Policy, Header, isValidPolicy };