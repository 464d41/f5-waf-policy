"use strict"

const Ajv = require("ajv").default;
const violationSchema = require("./violation.js");
const methodSchema = require("./method.js");
const urlSchema = require("./url.js");
const filetypeSchema = require("./filetype.js");
const parameterSchema = require("./parameter.js");
const headerSchema = require("./header.js");



const policySchema = {
    $id: "policy.json",
    type: "object",
    properties: {
        policy: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    minLength: 1
                },
                applicationLanguage: {
                    type: "string",
                    minLength: 1
                },
                enforcementMode: {
                    enum: ["transparent", "blocking"]
                },
                template: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            minLength: 1,
                        }
                    },
                    required: ["name"],
                },
                "blocking-settings": {
                    type: "object",
                    properties: {
                        violations: {
                            type: "array",
                            items: { $ref: "violation.json#/definitions/violation" },
                            minItems: 1
                        },
                    },
                    anyOf: [
                        { required: ["violations"] },
                    ],
                },
                "methods": {
                    type: "array",
                    items: { $ref: "method.json#/definitions/method" },
                    minItems: 1
                },
                "urls": {
                    type: "array",
                    items: { $ref: "url.json#/definitions/url" },
                    minItems: 1
                },
                "filetypes": {
                    type: "array",
                    items: { $ref: "filetype.json#/definitions/filetype" },
                    minItems: 1
                },
                "headers": {
                    type: "array",
                    items: { $ref: "header.json#/definitions/header" },
                    minItems: 1
                },
                "parameters": {
                    type: "array",
                    items: { $ref: "parameter.json#/definitions/parameter" },
                    minItems: 1
                },
            },
            required: ["name", "applicationLanguage", "enforcementMode", "template"],
        },
    },
    required: ["policy"],
    additionalProperties: false,
}

const ajv = new Ajv({ strict: false })
const validate = ajv
    .addSchema(methodSchema)
    .addSchema(urlSchema)
    .addSchema(filetypeSchema)
    .addSchema(headerSchema)
    .addSchema(parameterSchema)
    .addSchema(violationSchema)
    .compile(policySchema)

module.exports = validate;