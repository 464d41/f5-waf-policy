"use strict";

const blockingSettingsSchema = {
    $id: "blockingSettings.json",
    definitions: {
        violations: {
            type: "array",
            minItems: 1,
        },
        str: { type: "string" },
    },
}

module.exports = {
    blockingSettingsSchema
};