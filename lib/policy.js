"use strict";

const violations = require("./violations")
const validate = require("./schemas/policy")

class Policy {
    constructor(policy) {
        this.policy = {
            ...policy.policy.hasOwnProperty("name") ? { name: policy.policy.name } : {},
            ...policy.policy.hasOwnProperty("template") ? { template: new Template(policy.policy.template) } : {},
            ...policy.policy.hasOwnProperty("applicationLanguage") ? { applicationLanguage: policy.policy.applicationLanguage } : {},
            ...policy.policy.hasOwnProperty("enforcementMode") ? { enforcementMode: policy.policy.enforcementMode } : {},
            ...policy.policy.hasOwnProperty("blocking-settings") ? { "blocking-settings": new BlockingSettings(policy.policy.["blocking-settings"]) } : {},
            headers: new Headers(policy.policy.headers)
        }
    }
    isValid() {
        return validate(this.toPolicy())
    }
    toPolicy() {
        return {
            policy: {
                name: this.policy.name,
                template: this.policy.template.toPolicy(),
                applicationLanguage: this.policy.applicationLanguage,
                enforcementMode: this.policy.enforcementMode,
                ...this.policy.hasOwnProperty("blocking-settings") ? this.policy["blocking-settings"].toPolicy() : {},
                headers: this.policy.headers.toPolicy()
            }
        };
    }
    getAllViolations() {
        return violations
    }
}

class Template {
    constructor(template) {
        if (template.hasOwnProperty("name")) {
            this.name = template.name
        }
    }

    toPolicy() {
        return this
    }
}

class BlockingSettings {
    constructor(blockingSettings) {
        this.violations = blockingSettings.hasOwnProperty("violations") ? blockingSettings.violations.map(function (violation) {
            return new Violation(violation);
        }) : [];
    }
    toPolicy() {
        return {
            "violations": this.violations.map(function (violation) {
                return violation.toPolicy();
            }),
        };
    }
}

class Violation {
    constructor(violation) {
        this.name = violation.name;
        this.alarm = violation.alarm;
        this.block = violation.block;
        this.learn = violation.learn;

    }
    toPolicy() {
        return {
            "name": this.name,
            "alarm": this.alarm,
            "block": this.block,
            "learn": this.learn,
        };
    }
}

class Headers {
    constructor(headers) {
        if (headers) {
            this.headers = headers.map(function (header) {
                return new Header(header);
            })
        } else {
            this.headers = []
        }
    }

    toPolicy() {
        if (this.headers.length > 0) {
            return this.headers.map(function (header) {
                return header.toPolicy();
            })
        }
    }

    add(header) {
        this.headers.push(header)
    }

    del(index) {
        this.headers.splice(index, 1)
    }

    delAll() {
        this.headers = []
    }
}

class Header {
    constructor(header) {
        if (header) {
            this.name = header.name;
            this.type = header.type;
            this.decodeValueAsBase64 = header.decodeValueAsBase64;
            this.htmlNormalization = header.htmlNormalization;
            this.mandatory = header.mandatory;
            this.allowRepeatedOccurrences = header.allowRepeatedOccurrences;
            this.checkSignatures = header.checkSignatures;
        } else {
            this.name = "";
            this.type = "explicit";
            this.decodeValueAsBase64 = true;
            this.htmlNormalization = true;
            this.mandatory = true;
            this.allowRepeatedOccurrences = false;
            this.checkSignatures = true;
        }

    }

    toPolicy() {
        return {
            "name": this.name,
            "type": this.type,
            "decodeValueAsBase64": this.decodeValueAsBase64 ? "enabled" : "disabled",
            "htmlNormalization": this.htmlNormalization,
            "mandatory": this.mandatory,
            "allowRepeatedOccurrences": this.allowRepeatedOccurrences,
            "checkSignatures": this.checkSignatures,
        };
    }
}
module.exports = { Policy, Header };