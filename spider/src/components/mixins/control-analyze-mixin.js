import { mapGetters } from "vuex";
import ARRAY from "../../lib/array"
import STR from "../../lib/str"
import JavaUtils from "../../lib/enum/java"
import Matchers from "./../../lib/enum/matchers"
import UiUtils from "../../lib/enum/web"
import SUFFIXES from "./../../lib/enum/suffixes"

/**
 * Add config analyze matchers
 */
const ADD_CONTROL_MATCHERS = [
    {
        name: "money",
        matcher: Matchers.NUMBER_MATCHER
            && STR.endsWithAny(
                name.toLowerCase(),
                SUFFIXES.MONEY_SUFFIXES
            ),
        handler: data => {
            data.controlType = UiUtils.CONTROL_TYPE.NUMBER;
            data.controlPattern = 2;
        }
    },
    {
        name: "int",
        matcher: javaType => javaType == JavaUtils.JAVA_TYPE.INTEGER
            || javaType == JavaUtils.JAVA_TYPE.LONG,
        handler: data => {
            data.addControlType = UiUtils.CONTROL_TYPE.NUMBER;
            data.addControlPattern = 0;
        }
    },
    {
        name: "number",
        matcher: Matchers.NUMBER_MATCHER,
        handler: data => {
            data.addControlType = UiUtils.CONTROL_TYPE.NUMBER;
            data.addControlPattern = 2;
        }
    },
    {
        name: "date",
        matcher: Matchers.DATE_MATCHER,
        handler: data => {
            data.addControlType = UiUtils.CONTROL_TYPE.DATE;
            data.addControlPattern = "datetime";
        }
    },
    {
        name: "textarea",
        matcher: (javaType, name) => Matchers.STRING_MATCHER(javaType)
            && STR.endsWithAny(
                name.toLowerCase(),
                SUFFIXES.TEXTAREA_SUFFIXES
            ),
        handler: data => {
            data.addControlType = UiUtils.CONTROL_TYPE.TEXTAREA;
        }
    },
    {
        name: "picture",
        matcher: (javaType, name) => Matchers.STRING_MATCHER(javaType)
            && STR.endsWithAny(
                name.toLowerCase(),
                SUFFIXES.PICTURE_SUFFIXES
            ),
        handler: data => {
            data.queryControlType = UiUtils.CONTROL_TYPE.PICTURE;
        }
    },
    {
        name: "file",
        matcher: (javaType, name) => Matchers.STRING_MATCHER(javaType)
            && STR.endsWithAny(
                name.toLowerCase(),
                SUFFIXES.FILE_SUFFIXES
            ),
        handler: data => {
            data.queryControlType = UiUtils.CONTROL_TYPE.FILE;
        }
    },
    {
        name: "default",
        matcher: () => {
            return true;
        },
        handler: data => {
            data.addControlType = UiUtils.CONTROL_TYPE.TEXT;
        }
    },
]

const QUERY_CONTROL_MATCHERS = [
    {
        name: "string",
        matcher: (javaType, name) => Matchers.STRING_MATCHER(javaType) && Matchers.ENDS_WITH_MATCHER(name, SUFFIXES.TEXT_QUERY_SUFFIXES),
        handler: data => {
            data.queryControlType = UiUtils.CONTROL_TYPE.TEXT;
            data.queryControlPattern = "like";
        }
    },

    {
        name: "date",
        matcher: (javaType, name) => Matchers.DATE_MATCHER(javaType) && Matchers.ENDS_WITH_MATCHER(name, SUFFIXES.CREATE_TIME_SUFFIXES),
        handler: data => {
            data.queryControlType = UiUtils.CONTROL_TYPE.DATE;
            data.queryControlPattern = "datetimerange";
        }
    },
    {
        name: "numberRange",
        matcher: (javaType, name) => Matchers.NUMBER_MATCHER(javaType) && Matchers.ENDS_WITH_MATCHER(name, SUFFIXES.NUMBER_RANGE_SUFFIXES),
        handler: data => {
            data.queryControlType = UiUtils.CONTROL_TYPE.NUMBER_RANGE;
            data.queryControlPattern = "2";
        }
    }
]
export default {
    computed: {
        ...mapGetters(["getEnums"]),
    },

    methods: {
        /**
         * Analyze add control config
         */
        analyzeAddConfig(item) {
            if (!item.javaType || !item.entityFieldName)
                return;

            // match enums
            if (this.analyzeEnum("addControlType", "addControlPattern"))
                return;

            // match default matchers
            for (const matcher of ADD_CONTROL_MATCHERS) {
                if (matcher.matcher(item.javaType, item.entityFieldName)) {
                    matcher.handler(item);
                    return;
                }
            }
        },
        /**
         * Analyze query control config
         */
        analyzeQueryConfig(item) {
            if (!item.javaType || !item.entityFieldName)
                return;

            if (this.analyzeEnum("queryControlType", "queryControlPattern"))
                return;


            for (const matcher of QUERY_CONTROL_MATCHERS) {
                if (matcher.matcher(item.javaType, item.entityFieldName)) {
                    matcher.handler(item);
                    return;
                }
            }
            item.isQueryField = this.isQueryField(item);
        },

        analyzeEnum(item, field1, field2) {
            if (JavaUtils.isEnumJavaType(item.javaType)) {
                let enums = this.getEnums;
                if (ARRAY.hasAny(enums, x => x.baseInfo.name.toLowerCase() == item.entityFieldName.toLowerCase())) {
                    item[field1] = UiUtils.CONTROL_TYPE.SELECT;
                    item[field2] = STR.upperFirstLetter(item.entityFieldName);
                    return true;
                }
            }

            return false;
        },

        isQueryField(data) {
            if (data.javaType == JavaUtils.JAVA_TYPE.DATE && data.entityFieldName.endsWith("createTime")) {

                return true;
            }

            if (data.format == UiUtils.FORMAT_TYPE.ENUM || data.queryControlType == UiUtils.CONTROL_TYPE.SELECT) {
                return true;
            }

            if (JavaUtils.isEnumJavaType(data.javaType)) {
                return !STR.equalAny(name.toLowerCase(), SUFFIXES.Pk)
                    && STR.endsWithAny(name.toLowerCase(),
                        ["name", "no", "id", "uid", ...SUFFIXES.ENUM_SUFFIXES]
                    );
            }
        }
    }
}