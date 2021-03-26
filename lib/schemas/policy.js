"use strict"

const Ajv = require("ajv").default;
const blockingSettingsSchema = require("./blockingSettings.js");
const headerSchema = require("./headers.js");
const urlSchema = require("./urls.js");


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
                        violations: { $ref: "blockingSettings.json#/definitions/violations" },
                    },
                    required: ["violations"],
                },
                "headers": {
                    type: "array",
                    items: { $ref: "headers.json#/definitions/header" },
                    minItems: 1
                },
                "urls": {
                    type: "array",
                    items: { $ref: "urls.json#/definitions/url" },
                    minItems: 1
                }

            },
            required: ["name", "applicationLanguage", "enforcementMode", "template"],
        },
    },
    required: ["policy"],
    additionalProperties: false,
}

const ajv = new Ajv({ strict: false })
const validate = ajv.addSchema(urlSchema).addSchema(headerSchema).addSchema(blockingSettingsSchema).compile(policySchema)

module.exports = validate;