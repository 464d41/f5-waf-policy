"use strict";

const parameterSchema = {
    $id: "parameter.json",
    definitions: {
        parameter: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    minLength: 1
                },
                type: {
                    enum: ["explicit", "wildcard"]
                },
                level: {
                    enum: ["global"]
                },
                parameterLocation: {
                    enum: ["any"]
                },
                valueType: {
                    enum: ["auto-detect"]
                },
                allowEmptyValue: {
                    type: "boolean"
                },
                checkMaxValueLength: {
                    type: "boolean"
                },
                allowRepeatedParameterName: {
                    type: "boolean"
                },
                sensitiveParameter: {
                    type: "boolean"
                },
                attackSignaturesCheck: {
                    type: "boolean"
                },
                signatureOverrides: {
                    type: "array",
                    minItems: 0
                },
                checkMetachars: {
                    type: "boolean"
                },
                nameMetacharOverrides: {
                    type: "array",
                    minItems: 0
                },
                metacharsOnParameterValueCheck: {
                    type: "boolean"
                },
                valueMetacharOverrides: {
                    type: "array",
                    minItems: 0
                },
            },
            required: ["name"],
        }
    }
}

module.exports = parameterSchema;