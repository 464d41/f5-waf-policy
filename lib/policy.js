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
            this.blockingSettings = new BlockingSettings(policy.policy["blocking-settings"]);
            this.headers = new Headers(policy.policy.headers);
            this.urls = new Urls(policy.policy.urls);
        } else {
            this.name = "policy_name";
            this.template = new Template();
            this.applicationLanguage = "utf-8";
            this.enforcementMode = "blocking";
            this.blockingSettings = new BlockingSettings();
            this.headers = new Headers();
            this.urls = new Urls();
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
                urls: this.urls.length > 0 ? this.urls.map(function (url) { return url.toPolicy() }) : undefined,
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
        const defaults = violations.find(v => v.name === violation.name);
        Object.assign(this, defaults, violation)
    }

    toPolicy() {
        return {
            "name": this.name,
            "alarm": this.alarm,
            "block": this.block,
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
        const defaults = {
            name: "",
            type: "explicit",
            decodeValueAsBase64: true,
            htmlNormalization: true,
            mandatory: true,
            allowRepeatedOccurrences: false,
            checkSignatures: true,
        }
        Object.assign(this, defaults, header)
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

class Urls {
    constructor(urls) {
        if (urls) {
            return urls.map(function (url) {
                return new Url(url);
            })
        } else {
            return []
        }
    }
}

class Url {
    constructor(url) {
        const defaults = {
            name: "",
            method: "*",
            protocol: "http",
            type: "explicit",
            attackSignaturesCheck: true,
            metacharsOnUrlCheck: true,
            metacharOverrides: [],
            wildcardOrder: 0,
            urlContentProfiles: [],
        }
        Object.assign(this, defaults, url)
    }

    toPolicy() {
        return {
            name: this.name,
            type: this.type,
            method: this.method,
            protocol: this.protocol,
            attackSignaturesCheck: this.attackSignaturesCheck,
            metacharsOnUrlCheck: this.metacharsOnUrlCheck,
            ...(this.metacharOverrides.length > 0) && { metacharOverrides: this.metacharOverrides },
            wildcardOrder: this.wildcardOrder,
            ...(this.urlContentProfiles.length > 0) && { urlContentProfiles: this.urlContentProfiles },
        };
    }
}

module.exports = { Policy, Header, Url, Violation };