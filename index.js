"use strict";

const Policy = require("./lib/policy").Policy;
const Method = require("./lib/policy").Method;
const Url = require("./lib/policy").Url;
const Filetype = require("./lib/policy").Filetype;
const Header = require("./lib/policy").Header;
const Parameter = require("./lib/policy").Parameter;

const isValidPolicy = require("./lib/schemas/policy")

module.exports = { Policy, Method, Url, Filetype, Header, Parameter, isValidPolicy };