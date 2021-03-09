"use strict";

const violations = require("./violations")
const validate = require("./schemas/policy")

class Policy {
    constructor(policy) {
        this.policy = {
            ...policy.policy.hasOwnProperty("name") ? { name: policy.policy.name } : {},
            ...policy.policy.hasOwnProperty("template") ? { template: new Template(policy.policy?.template) } : {},
            ...policy.policy.hasOwnProperty("applicationLanguage") ? { applicationLanguage: policy.policy.applicationLanguage } : {},
            ...policy.policy.hasOwnProperty("enforcementMode") ? { enforcementMode: policy.policy.enforcementMode } : {},
            ...policy.policy.hasOwnProperty("blocking-settings") ? { "blocking-settings": new BlockingSettings(policy.policy?.["blocking-settings"]) } : {},
        }
    }
    isValid() {
        return validate(this.toPolicy())
    }
    toPolicy() {
        return this;
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

module.exports = Policy;