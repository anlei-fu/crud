import TypeUtils from "./type-utils"
import RegexUtils from "./regex"

/**
 * Require rule validator
 * 
 * @param {Any} _ 
 * @param {Any} value 
 * @param {(Error?)void} callback 
 */
function requireValidator(_, value, callback) {
    if (TypeUtils.isUndefined(value)) {
        callback(new Error("value is undefined"));
    }

    callback();
};

/**
* Create require validation rule
* 
* @param {String} msg 
* @param {String} trigger 
*/
function requireRuleFactory(msg, trigger = "blur") {
    return {
        required: true,
        validator: requireValidator,
        message: msg || "field can not be empty",
        trigger: trigger,
    }
}

/**
* Range validator
* 
* @param {Any} rule 
* @param {Number} value 
* @param {(Error?)Void} callback 
*/
function rangeValidator(rule, value, callback) {

    if (TypeUtils.isUndefined(value)) {
        callback();
        return;
    }

    if (isNaN(value) || value < rule.min || value >= rule.max) {
        callback(new Error(`${value} out of range ${rule.min}-${rule.max}`));
        return;
    }

    callback();
};

/**
* Create range validation rule
* 
* @param {Number} min 
* @param {Number} max 
* @param {String} msg 
* @param {String} trigger 
*/
function rangeRuleFactory(min, max, msg, trigger = "blur") {
    return {
        validator: rangeValidator,
        min: min,
        max: max,
        message: msg || `out of range ${min}-${max} `,
        trigger: trigger,
    }
}

/**
* Create email validation rule
*/
function emailRuleFactory(msg, trigger = "blur") {
    return {
        type: "email",
        message: msg,
        trigger,
    }
}

/**
 * Create regex validator by specific pattern
 * 
 * @param {String} pattern
 * @returns {(Any,Any,callback) => void} 
 */
function regexValidatorFactory(pattern) {
    let regex = new RegExp(pattern);
    return (_, value, callback) => {
        if (TypeUtils.isUndefined(value)) {
            callback();
            return;
        }

        if (!regex.test(value)) {
            callback(Error(`regex(${pattern}) not match value(${value})`));
            return;
        }

        callback();

    }
}

/**
 * Create regex validation rule
 * 
 * @param {String} pattern 
 * @param {String} msg 
 * @param {String} trigger 
 * @returns {ValidationRule}
 */
function regexRuleFactory(pattern, msg, trigger = "blur") {
    return {
        validator: regexValidatorFactory(pattern),
        message: msg,
        trigger: trigger
    }
}

/**
* Create ip validation rule
* 
* @param {String} msg 
* @param {String} trigger 
* @returns {ValidationRule}
*/
function ipRuleFactory(msg, trigger = "blur") {
    return regexRuleFactory("^((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)$", msg, trigger);
};

/**
* Create port validation rule
*
* @param {String} msg 
* @param {String} trigger 
* @returns {ValidationRule}
*/
function portRuleFactory(msg = "out of port number range", trigger = "blur") {
    return rangeRuleFactory(1, 63000, msg, trigger);
};

/**
* Create mobile validation rule
* 
* @param {String} msg 
* @param {String} trigger 
* @returns {ValidationRule}
*/
function phoneRuleFactory(msg, trigger = "blur") {
    return regexRuleFactory("^1[3456789]\d{9}$", msg, trigger);
}

/**
* Create url validation rule
* 
* @param {String} msg 
* @param {String} trigger 
* @returns {ValidationRule}
*/
function urlRuleFactory(msg, trigger = "blur") {
    return {
        type: "url",
        message: msg || "url incorrect",
        trigger: trigger,
    }
}

/**
* Json array validator
* 
* @param {Null} _ 
* @param {String} value 
* @param {(Error?)Void} callback 
*/
function jsonArrayValidator(_, value, callback) {
    if (TypeUtils.isUndefined(value)) {
        callback();
        return;
    }

    try {
        let array = JSON.parse(value);
        if (TypeUtils.isArray(array)) {
            callback();
            return;
        }

        callback(new Error(`(${value}) is not a valid json array!`));
    } catch (ex) {
        callback(new Error(`(${value}) is not a valid json array!`));
    }
}

/**
* Create json-array validation rule
* 
* @param {String} msg 
* @param {String} trigger 
* @returns {ValidationRule}
*/
function jsonArrayRuleFactory(msg, trigger = "blur") {
    return {
        message: msg || "Incorrect json array",
        trigger: trigger,
        validator: jsonArrayValidator
    }
};

/**
* Json object validator
* 
* @param {Null} _ 
* @param {String} value 
* @param {(Error?)Void} callback 
*/
function jsonObjectValidator(_, value, callback) {
    if (TypeUtils.isUndefined(value)) {
        callback();
        return;
    }

    try {
        let obj = JSON.parse(value);
        if (TypeUtils.isObject(obj)) {
            callback();
            return;
        }

        callback(new Error(`(${value}) is not a valid json object!`));
    } catch (ex) {
        callback(new Error(`(${value}) is not a valid json object!`));
    }
}

/**
* Create json-object validation rule
* 
* @param {String} msg 
* @param {String} trigger 
* @returns {ValidationRule}
*/
function jsonObjectRuleFactory(msg, trigger = "blur") {
    return {
        message: msg || "Incorrect json object",
        trigger: trigger,
        validator: jsonObjectValidator
    }
};

function varibleNameValidator(rule, value, callback) {
    if (TypeUtils.isUndefined(value)) {
        callback();
        return;
    }

    // 最大长度设置为 40
    if (value.length > 40) {
        callback(new Error());
        return;
    }

    if (!RegexUtils.REGEX.isValidVariableName.test(value)) {
        callback(new Error());
        return;
    }

    callback();
}

function varibleNameRule(msg, trigger = "blur") {
    return {
        message: msg || "Incorrect json object",
        trigger: trigger,
        validator: varibleNameValidator
    }

}

function nameArrayValidator(value, rule, callback) {
    if (TypeUtils.isUndefined(value)) {
        callback();
        return;
    }

    let segs = value.split(",");
    for (const seg of segs) {
        if (RegexUtils.REGEX.isValidVariableName.test(seg)) {
            callback(new Error())
            return;
        }
    }

    callback();
}

function nameArrayRule(msg, trigger = "blur") {
    return {
        message: msg || "Incorrect json object",
        trigger: trigger,
        validator: nameArrayValidator
    }
}

function lengthArrayValidator(rule, value, callback) {
    if (TypeUtils.isUndefined(value)) {
        callback();
        return;
    }

    let segs = value.split(",");
    if (segs.length > 2) {
        callback(new Error())
        return;
    }

    for (const seg of segs) {
        if (!RegexUtils.REGEX.isNumber.test(seg)) {
            callback(new Error())
            return;
        }
    }
     if(segs.length==2){
         if(parseInt(segs[0])>=parseInt(segs[1])){
            callback(new Error())
            return;
         }
     }

    callback();
}

function lengthArrayRule(msg, trigger = "blur") {
    return {
        message: msg || "Incorrect json object",
        trigger: trigger,
        validator: lengthArrayValidator
    }
}

function packageValidator(rule, value, callback) {
    if (TypeUtils.isUndefined(value)) {
        callback();
        return;
    }

    let segs = value.split(".");
    for (const seg of segs) {
        if (!RegexUtils.REGEX.isValidVariableName.test(seg)) {
            callback(new Error())
            return;
        }
    }

    callback();
}

function packageRule(msg, trigger = "blur") {
    return {
        message: msg || "包名称不正确",
        trigger: trigger,
        validator: packageValidator
    }
}

export default {
    RuleFactory: {
        require: requireRuleFactory,
        range: rangeRuleFactory,
        regex: regexRuleFactory,
        port: portRuleFactory,
        phone: phoneRuleFactory,
        email: emailRuleFactory,
        url: urlRuleFactory,
        ip: ipRuleFactory,
        jsonArray: jsonArrayRuleFactory,
        jsonObject: jsonObjectRuleFactory,
        varibleName: varibleNameRule,
        package: packageRule,
        nameArray: nameArrayRule,
        lengthArray: lengthArrayRule
    },
    DEFAULT_RULES: {
        REQUIRE: requireRuleFactory("参数不能为空"),
        PORT: portRuleFactory("端口不正确"),
        PHONE: phoneRuleFactory("手机号不正确"),
        URL: urlRuleFactory("网址不正确"),
        JSON_ARRAY: jsonArrayRuleFactory("json 数组不正确"),
        JSON_OBJECT: jsonObjectRuleFactory("json object 不正确"),
        IP: ipRuleFactory("ip地址不正确"),
        EMAIL: emailRuleFactory("邮箱地址不正确"),
        VARIABLE_NAME: varibleNameRule("命名不正确或者长度超过40个字符"),
        PACKAGE: packageRule(),
        NAEM_ARRAY: nameArrayRule("名称不正确"),
        LENGTH_ARRAY: lengthArrayRule("长度范围不正确")
    }
}
