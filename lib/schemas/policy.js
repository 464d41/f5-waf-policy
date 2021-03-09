"use strict"

const Ajv = require("ajv").default;
const blockingSettingsSchema = require("./blockingSettings.js");

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
                }

            },
            required: ["name", "applicationLanguage", "enforcementMode", "template"],
        },
    },
    required: ["policy"],
    additionalProperties: false,
}

const ajv = new Ajv({ strict: false })
const validate = ajv.addSchema(blockingSettingsSchema).compile(policySchema)

module.exports = validate;