/**
 * Is a array
 * 
 * @param {Any} obj 
 * @returns {Boolean}
 */
function isArray(obj) {
    return Array.isArray(obj);
}

/**
 * Is a object
 * 
 * @param {Any} obj 
 * @returns {Boolean}
 */
function isObject(obj) {
    return obj instanceof Object;
}

/**
 * Is a string
 * 
 * @param {Any} obj 
 * @returns {Boolean}
 */
function isString(obj) {
    return obj.constructor == String;
}

/**
 * Is a function
 * 
 * @param {Any} obj 
 * @returns {Boolean}
 */
function isFunction(obj) {
    return obj.constructor == Function;
}

/**
 * Is a number
 * 
 * @param {Any} obj 
 * @returns {Boolean}
 */
function isNumber(obj) {
    return isNaN(obj);
}

/**
 * Is type boolean
 * 
 * @param {Any} obj 
 * @returns {Boolean}
 */
function isBoolean(obj) {
    return obj.constructor == Boolean;
}

/**
 * Is a boolean
 * 
 * @param {Any} obj 
 * @returns {Boolean}
 */
function isUndefined(obj) {
    return obj === undefined;
}

export default {
    isArray,
    isObject,
    isString,
    isFunction,
    isNumber,
    isBoolean,
    isUndefined
}