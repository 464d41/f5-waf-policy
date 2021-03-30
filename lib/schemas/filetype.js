"use strict";

const filetypeSchema = {
    $id: "filetype.json",
    definitions: {
        filetype: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    minLength: 1
                },
                type: {
                    enum: ["explicit", "wildcard"]
                },
                allowed: {
                    type: "boolean"
                },
                checkPostDataLength: {
                    type: "boolean"
                },
                postDataLength: {
                    type: "integer"
                },
                checkRequestLength: {
                    type: "boolean"
                },
                requestLength: {
                    type: "integer"
                },
                checkUrlLength: {
                    type: "boolean"
                },
                urlLength: {
                    type: "integer"
                },
                checkQueryStringLength: {
                    type: "boolean"
                },
                queryStringLength: {
                    type: "integer"
                },
                responseCheck: {
                    type: "boolean"
                },
            },
            required: ["name"],
        }
    }
}

module.exports = filetypeSchema;