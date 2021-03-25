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
            blockingSettings: new BlockingSettings(policy.policy.blockingSettings),
            headers: new Headers(policy.policy.headers),
            test: new Test()
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
                "blocking-settings": this.policy.blockingSettings.toPolicy(),
                headers: this.policy.headers.toPolicy(),
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
        if (this.violations.violations.length > 0) {
            return {
                violations: this.violations.violations.map(function (violation) {
                    return violation.toPolicy();
                }),
            };
        }
    }
}

class Violations {
    constructor(violations) {
        if (violations) {
            this.violations = violations.map(function (violation) {
                return new Violation(violation);
            });
        } else {
            this.violations = []
        }
    }

    add(violation) {
        this.violations.push(violation)
    }

    del(index) {
        this.violations.splice(index, 1)
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
module.exports = { Policy, Header, Violation };