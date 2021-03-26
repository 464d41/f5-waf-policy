"use strict";

const urlSchema = {
    $id: "urls.json",
    definitions: {
        url: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    minLength: 1
                },
                method: {
                    type: "string",
                    minLength: 1
                },
                protocol: {
                    enum: ["http", "https"]
                },
                type: {
                    enum: ["explicit", "wildcard"]
                },
                attackSignaturesCheck: {
                    type: "boolean"
                },
                metacharsOnUrlCheck: {
                    type: "boolean"
                },
                metacharOverrides: {
                    type: "array",
                    minItems: 0
                },
                wildcardOrder: {
                    type: "integer"
                },
                urlContentProfiles: {
                    type: "array",
                    minItems: 0
                },
            },
            required: ["name"],
        }
    }
}

module.exports = urlSchema;