const REGEX_PATTERNS = {
    isNumber: "^[0-9]+$",
    isChinese: "^[\u4e00-\u9fa5]{0,}$",
    isAlphaNumber: "^[A-Za-z0-9]+$}$",
    isAlpha: "^[A-Za-z]+$/",
    isEmail: "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$",
    isTelephone: "(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}",
    isMobile: "^1(3|4|5|6|7|8|9)\d{9}$",
    isDomain: "^((http:\/\/)|(https:\/\/))?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}(\/)",
    isUrl: "^(http|https)://([w-]+.)+[w-]+(/[w-./?%&=]*)?$",
    isQq: "[1-9][0-9]{4,}",
    isPostCode: "[1-9]d{5}(?!d)",
    isIpAddress: "((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))",
    isDecimal: "^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$",
    isPositiveDecimal: "^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$",
    isPositiveDecimalOrZero: "^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$",
    isPositiveInteger: "^[1-9]\d*$",
    isPositiveIntegerOrZero: "^-[1-9]\d*|0$",
    isValidVariableName: "^(_|[a-zA-Z])\w.$",
}

const REGEX = {
    isNumber: new RegExp("^[0-9]+$"),
    isChinese: new RegExp("^[\u4e00-\u9fa5]{0,}$"),
    isAlphaNumber: new RegExp("^[A-Za-z0-9]+$}$"),
    isAlpha: new RegExp("^[A-Za-z]+$/"),
    isEmail: new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$"),
    isTelephone: new RegExp("(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}"),
    isMobile: new RegExp("^1(3|4|5|6|7|8|9)\d{9}$"),
    isDomain: new RegExp("^((http:\/\/)|(https:\/\/))?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}(\/)"),
    isUrl: new RegExp("^(http|https)://([w-]+.)+[w-]+$"),
    isQq: new RegExp("[1-9][0-9]{4,}"),
    isPostCode: new RegExp("[1-9]d{5}(?!d)"),
    isIpAddress: new RegExp("((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))"),
    isDecimal: new RegExp("^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$"),
    isPositiveDecimal: new RegExp("^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$"),
    isPositiveDecimalOrZero: RegExp("^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$"),
    isPositiveInteger: new RegExp("^[1-9]\d*$"),
    isPositiveIntegerOrZero: RegExp("^-[1-9]\d*|0$"),
    isValidVariableName: new RegExp("^((_)|[a-zA-Z])((_)|[a-zA-Z0-9])*$"),
}

export default{
    REGEX_PATTERNS,
    REGEX
}