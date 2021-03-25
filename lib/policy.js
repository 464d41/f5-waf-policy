"use strict";

const violations = require("./violations")
const validate = require("./schemas/policy")

class Policy {
    constructor(policy) {
        if (policy) {
            policy.policy.hasOwnProperty("name") ? this.name = policy.policy.name : this.name = "";
            this.template = new Template(policy.policy.template);
            policy.policy.hasOwnProperty("applicationLanguage") ? this.applicationLanguage = policy.policy.applicationLanguage : this.applicationLanguage = "";
            policy.policy.hasOwnProperty("enforcementMode") ? this.enforcementMode = policy.policy.enforcementMode : this.enforcementMode = "";
            this.blockingSettings = new BlockingSettings(policy.policy.blockingSettings);
            this.headers = new Headers(policy.policy.headers);
        } else {
            this.name = "policy_name";
            this.template = new Template();
            this.applicationLanguage = "utf-8";
            this.enforcementMode = "blocking";
            this.blockingSettings = new BlockingSettings();
            this.headers = new Headers();
        }
    }

    isValid() {
        return validate(this.toPolicy())
    }

    toPolicy() {
        return {
            policy: {
                name: this.name,
                template: this.template.toPolicy(),
                applicationLanguage: this.applicationLanguage,
                enforcementMode: this.enforcementMode,
                "blocking-settings": this.blockingSettings.toPolicy(),
                headers: this.headers.length > 0 ? this.headers.map(function (header) { return header.toPolicy() }) : undefined,
            }
        };
    }

    getAllViolations() {
        return violations.map(function (violation) {
            return new Violation(violation);
        });
    }
}

class Template {
    constructor(template) {
        if (template) {
            this.name = template.name;
        } else {
            this.name = "POLICY_TEMPLATE_NGINX_BASE";
        }
    }

    toPolicy() {
        return this
    }
}

class BlockingSettings {
    constructor(blockingSettings) {
        if (blockingSettings) {
            if (blockingSettings.violations) {
                this.violations = new Violations(blockingSettings.violations)
            } else {
                this.violations = new Violations()
            }
        } else {
            this.violations = new Violations()
        }
    }

    toPolicy() {
        if (this.violations.length > 0) {
            return {
                violations: this.violations.map(function (violation) {
                    return violation.toPolicy();
                }),
            };
        }
    }
}

class Violations {
    constructor(violations) {
        if (violations) {
            return violations.map(function (violation) {
                return new Violation(violation);
            });
        } else {
            return []
        }
    }
}

class Violation {
    constructor(violation) {
        this.name = violation.name;
        this.title = violation.title;
        this.description = violation.description;
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
            return headers.map(function (header) {
                return new Header(header);
            })
        } else {
            return []
        }
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
module.exports = { Policy, Header, Violation };