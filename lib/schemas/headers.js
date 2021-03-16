"use strict";

const headerSchema = {
    $id: "headers.json",
    definitions: {
        header: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    minLength: 1
                },
                type: {
                    enum: ["explicit"]
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
            required: ["name", "type", "decodeValueAsBase64", "htmlNormalization", "mandatory", "allowRepeatedOccurrences", "checkSignatures"],
        }
    }
}

module.exports = headerSchema;