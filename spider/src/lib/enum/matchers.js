import JavaUtils from "./java"
import NamingStrategy from "./../../lib/naming-strategy"
import STR from "./../../lib/str"

const JAVA_ENUM_MATCHER = javaType => JavaUtils.isEnumJavaType(javaType);
const FALSE_MATCHE = () => false;
const STRING_MATCHER = javaType => javaType == JavaUtils.JAVA_TYPE.STRING;
const JAVA_NUMBER_MATCHER = javaType => JavaUtils.isJavaNumber(javaType);
const JAVA_DATE_MATCHER = javaType => JavaUtils.isJavaDate(javaType);

/**
 * Match anay
 * 
 * @param {String} javaType 
 * @param {String} matchers 
 */
const MATCHERS_GROUP = (javaType, matchers) => {
    for (const matcher of matchers) {
        if (matcher(javaType))
            return true;
    }

    return false;
}

const ENDS_WITH_MATCHER = (name,suffixes)=>{
    return STR.endsWithAny(NamingStrategy.toCamel(name).toLowerCase(),suffixes);
}

export default {
    JAVA_ENUM_MATCHER,
    FALSE_MATCHE,
    STRING_MATCHER,
    NUMBER_MATCHER: JAVA_NUMBER_MATCHER,
    DATE_MATCHER: JAVA_DATE_MATCHER,
    MATCHERS_GROUP,
    ENDS_WITH_MATCHER
}