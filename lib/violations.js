const violations = [
    {
        "name": "VIOL_ASM_COOKIE_MODIFIED",
        "title": "Modified ASM cookie",
        "description": "The system checks that the request contains an ASM cookie that has not been modified or tampered with. Blocks modified requests.",
        "alarm": true,
        "block": true,
    },
    {
        "name": "VIOL_ATTACK_SIGNATURE",
        "title": "Attack signature detected",
        "description": "The system examines the HTTP message for known attacks by matching it against known attack patterns.",
    },
    {
        "name": "VIOL_BLACKLISTED_IP",
        "title": "IP is in the deny list",
        "description": "The violation is issued when a request comes from an IP address that falls in the range of an IP address exception marked for “always blocking”, that is, the deny list of IPs.",
        "alarm": true,
    },
    {
        "name": "VIOL_BOT_CLIENT",
        "title": "Bot Client Detected",
        "description": "TThe system detects automated clients, and classifies them to Bot types.",
        "alarm": true,
        "block": true,
    },
    {
        "name": "VIOL_COOKIE_EXPIRED",
        "title": "Expired timestamp",
        "description": "The system checks that the timestamp in the HTTP cookie is not old. An old timestamp indicates that a client session has expired. Blocks expired requests. The timestamp is extracted and validated against the current time. If the timestamp is expired and it is not an entry point, the system issues the Expired Timestamp violation.",
        "alarm": true
    },
    {
        "name": "VIOL_COOKIE_LENGTH",
        "title": "Illegal cookie length",
        "description": "The system checks that the request does not include a cookie header that exceeds the acceptable length specified in the security policy.",
        "alarm": true,

    },
    {
        "name": "VIOL_COOKIE_MALFORMED",
        "title": "Cookie not RFC-compliant",
        "description": "his violation occurs when HTTP cookies contain at least one of the following components: Quotation marks in the cookie name; A space in the cookie name.; An equal sign (=) in the cookie name. Note: A space between the cookie name and the equal sign (=), and between the equal sign (=) and cookie value is allowed.; An equal sign (=) before the cookie name.;A carriage return (hexadecimal value of 0xd) in the cookie name.",
        "alarm": true,
        "block": true,

    },
    {
        "name": "VIOL_COOKIE_MODIFIED",
        "title": "Modified domain cookie(s)",
        "description": "The system checks that the web application cookies within the request have not been tampered, and the system checks that the request includes a web application cookie defined in the security policy.",
        "alarm": true,

    },
    {
        "name": "VIOL_DATA_GUARD",
        "title": "Data Guard: Information leakage detected",
        "description": "The system examines responses and searches for sensitive information.",
        "alarm": true,

    },
    {
        "name": "VIOL_ENCODING",
        "title": "Failed to convert character",
        "description": "The system detects that one of the characters does not comply with the configured language encoding of the web application’s security policy.",
        "alarm": true,
        "block": true,

    },
]

module.exports = {
    violations
};