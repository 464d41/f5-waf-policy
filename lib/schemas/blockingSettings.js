"use strict";

const blockingSettingsSchema = {
    $id: "blockingSettings.json",
    definitions: {
        violations: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        enum: [
                            "VIOL_ASM_COOKIE_MODIFIED",
                            "VIOL_ATTACK_SIGNATURE",
                            "VIOL_BLACKLISTED_IP",
                            "VIOL_BOT_CLIENT",
                            "VIOL_COOKIE_EXPIRED",
                            "VIOL_COOKIE_LENGTH",
                            "VIOL_COOKIE_MALFORMED",
                            "VIOL_COOKIE_MODIFIED",
                            "VIOL_DATA_GUARD",
                            "VIOL_ENCODING",
                            "VIOL_EVASION",
                            "VIOL_FILETYPE",
                            "VIOL_FILE_UPLOAD",
                            "VIOL_FILE_UPLOAD_IN_BODY",
                            "VIOL_GRPC_FORMAT",
                            "VIOL_GRPC_MALFORMED",
                            "VIOL_GRPC_METHOD",
                            "VIOL_HEADER_LENGTH",
                            "VIOL_HEADER_METACHAR",
                            "VIOL_HTTP_PROTOCOL",
                            "VIOL_HTTP_RESPONSE_STATUS",
                            "VIOL_JSON_FORMAT",
                            "VIOL_JSON_MALFORMED",
                            "VIOL_JSON_SCHEMA",
                            "VIOL_MANDATORY_PARAMETER",
                            "VIOL_MANDATORY_REQUEST_BODY",
                            "VIOL_METHOD",
                            "VIOL_PARAMETER",
                            "VIOL_PARAMETER_ARRAY_VALUE",
                            "VIOL_PARAMETER_DATA_TYPE",
                            "VIOL_PARAMETER_EMPTY_VALUE",
                            "VIOL_PARAMETER_LOCATION",
                            "VIOL_PARAMETER_MULTIPART_NULL_VALUE",
                            "VIOL_PARAMETER_NAME_METACHAR",
                            "VIOL_PARAMETER_NUMERIC_VALUE",
                            "VIOL_PARAMETER_REPEATED",
                            "VIOL_PARAMETER_STATIC_VALUE",
                            "VIOL_PARAMETER_VALUE_BASE64",
                            "VIOL_PARAMETER_VALUE_LENGTH",
                            "VIOL_PARAMETER_VALUE_METACHAR",
                            "VIOL_PARAMETER_VALUE_REGEXP",
                            "VIOL_POST_DATA_LENGTH",
                            "VIOL_QUERY_STRING_LENGTH",
                            "VIOL_RATING_THREAT",
                            "VIOL_RATING_NEED_EXAMINATION",
                            "VIOL_REQUEST_LENGTH",
                            "VIOL_REQUEST_MAX_LENGTH",
                            "VIOL_THREAT_CAMPAIGN",
                            "VIOL_URL",
                            "VIOL_URL_CONTENT_TYPE",
                            "VIOL_URL_LENGTH",
                            "VIOL_URL_METACHAR",
                            "VIOL_XML_FORMAT",
                            "VIOL_XML_MALFORMED",
                            "VIOL_THREAT_CAMPAIGN"
                        ],
                    },
                    alarm: {
                        type: "boolean"
                    },
                    block: {
                        type: "boolean"
                    },
                    learn: {
                        type: "boolean"
                    },
                },
                required: ["name"],
            },
            minItems: 1,
        },
        str: { type: "string" },
    },
}

module.exports = {
    blockingSettingsSchema
};