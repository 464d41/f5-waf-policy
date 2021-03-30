"use strict";

const methodSchema = {
    $id: "method.json",
    definitions: {
        method: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    minLength: 1
                },
                action: {
                    enum: ["delete"]
                },
            },
            required: ["name"],
        }
    }
}

module.exports = methodSchema;