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
            this.methods = new Methods(policy.policy.methods);
            this.urls = new Urls(policy.policy.urls);
            this.filetypes = new Urls(policy.policy.filetypes);
            this.headers = new Headers(policy.policy.headers);
            this.parameters = new Parameters(policy.policy.parameters);
        } else {
            this.name = "policy_name";
            this.template = new Template();
            this.applicationLanguage = "utf-8";
            this.enforcementMode = "blocking";
            this.blockingSettings = new BlockingSettings();
            this.methods = new Methods();
            this.urls = new Urls();
            this.filetypes = new Urls();
            this.headers = new Headers();
            this.parameters = new Parameters();
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
                methods: this.methods.length > 0 ? this.methods.map(function (method) { return method.toPolicy() }) : undefined,
                urls: this.urls.length > 0 ? this.urls.map(function (url) { return url.toPolicy() }) : undefined,
                filetypes: this.filetypes.length > 0 ? this.filetypes.map(function (filetype) { return filetype.toPolicy() }) : undefined,
                headers: this.headers.length > 0 ? this.headers.map(function (header) { return header.toPolicy() }) : undefined,
                parameters: this.parameters.length > 0 ? this.parameters.map(function (parameter) { return parameter.toPolicy() }) : undefined,
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
            name: this.name,
            alarm: this.alarm,
            block: this.block,
        };
    }
}

class Methods {
    constructor(methods) {
        if (methods) {
            return methods.map(function (method) {
                return new Method(method);
            })
        } else {
            return []
        }
    }
}

class Method {
    constructor(method) {
        const defaults = {
            name: "",
            action: undefined,
        }
        Object.assign(this, defaults, method)
    }

    toPolicy() {
        return {
            name: this.name,
            ...(this.action) && { $action: this.action },
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

class Filetypes {
    constructor(filetypes) {
        if (filetypes) {
            return headers.map(function (filetype) {
                return new Filetype(filetype);
            })
        } else {
            return []
        }
    }
}

class Filetype {
    constructor(filetype) {
        const defaults = {
            name: "",
            type: "explicit",
            allowed: true,
            checkUrlLength: true,
            urlLength: 2048,
            checkQueryStringLength: true,
            queryStringLength: 2048,
            checkPostDataLength: false,
            postDataLength: 4096,
            checkRequestLength: false,
            requestLength: 8192,
            responseCheck: false
        }
        Object.assign(this, defaults, filetype)
    }

    toPolicy() {
        return {
            name: this.name,
            type: this.type,
            allowed: this.allowed,
            checkUrlLength: this.checkUrlLength,
            urlLength: this.urlLength,
            checkQueryStringLength: this.checkQueryStringLength,
            queryStringLength: this.queryStringLength,
            checkPostDataLength: this.checkPostDataLength,
            postDataLength: this.postDataLength,
            checkRequestLength: this.checkRequestLength,
            requestLength: this.requestLength,
            responseCheck: this.responseCheck
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
            name: this.name,
            type: this.type,
            decodeValueAsBase64: this.decodeValueAsBase64 ? "enabled" : "disabled",
            htmlNormalization: this.htmlNormalization,
            mandatory: this.mandatory,
            allowRepeatedOccurrences: this.allowRepeatedOccurrences,
            checkSignatures: this.checkSignatures,
        };
    }
}

class Parameters {
    constructor(parameters) {
        if (parameters) {
            return parameters.map(function (parameter) {
                return new Parameter(parameter);
            })
        } else {
            return []
        }
    }
}

class Parameter {
    constructor(parameter) {
        const defaults = {
            name: "",
            type: "wildcard",
            level: "global",
            parameterLocation: "any",
            valueType: "auto-detect",
            allowEmptyValue: true,
            checkMaxValueLength: false,
            allowRepeatedParameterName: true,
            sensitiveParameter: false,
            attackSignaturesCheck: true,
            signatureOverrides: [],
            checkMetachars: true,
            nameMetacharOverrides: [],
            metacharsOnParameterValueCheck: true,
            valueMetacharOverrides: [],
        }
        Object.assign(this, defaults, parameter)
    }

    toPolicy() {
        return {
            name: this.name,
            type: this.type,
            level: this.level,
            parameterLocation: this.parameterLocation,
            valueType: this.valueType,
            allowEmptyValue: this.allowEmptyValue,
            checkMaxValueLength: this.checkMaxValueLength,
            allowRepeatedParameterName: this.allowRepeatedParameterName,
            sensitiveParameter: this.sensitiveParameter,
            attackSignaturesCheck: this.attackSignaturesCheck,
            ...(this.signatureOverrides.length > 0) && { signatureOverrides: this.signatureOverrides },
            checkMetachars: this.checkMetachars,
            ...(this.nameMetacharOverrides.length > 0) && { nameMetacharOverrides: this.nameMetacharOverrides },
            metacharsOnParameterValueCheck: this.metacharsOnParameterValueCheck,
            ...(this.valueMetacharOverrides.length > 0) && { valueMetacharOverrides: this.valueMetacharOverrides },
        };
    }
}

module.exports = { Policy, Method, Url, Filetype, Header, Parameter, Violation };