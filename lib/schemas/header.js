"use strict";

const headerSchema = {
    $id: "header.json",
    definitions: {
        header: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    minLength: 1
                },
                type: {
                    enum: ["explicit", "wildcard"]
                },
                decodeValueAsBase64: {
                    enum: ["enabled", "disabled"]
                },
                htmlNormalization: {
                    type: "boolean"
                },
                mandatory: {
                    type: "boolean"
                },
                allowRepeatedOccurrences: {
                    type: "boolean"
                },
                checkSignatures: {
                    type: "boolean"
                }
            },
            required: ["name"],
        }
    }
}

module.exports = headerSchema;