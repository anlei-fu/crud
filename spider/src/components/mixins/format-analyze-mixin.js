import { mapGetters } from "vuex";
import ARRAY from "./../../lib/array"
import STR from "./../../lib/str"
import JavaUtils from "./../../lib/enum/java"
import UiUtils from "../../lib/enum/web"
import SUFFIXES from "./../../lib/enum/suffixes"
import Matchers from "../../lib/enum/matchers"

const FormatMatchers = [
    {
        name: "money",
        matcher: (javaType, name) => Matchers.NUMBER_MATCHER(javaType)
            && STR.endsWithAny(name.toLowerCase(), SUFFIXES.MONEY_SUFFIXES),
        handler: data => {
            data.format = UiUtils.FORMAT_TYPE.MONEY;
            data.pattern = 2;
        }
    },
    {
        name: "picture",
        matcher: (javaType, name) => Matchers.STRING_MATCHER(javaType)
            && STR.endsWithAny(name.toLowerCase(), SUFFIXES.PICTURE_SUFFIXES),
        handler: data => {
            data.format = UiUtils.FORMAT_TYPE.PICTURE;
        }
    },
    {
        name: "link",
        matcher: (javaType, name) => Matchers.STRING_MATCHER(javaType)
            && STR.endsWithAny(name.toLowerCase(), SUFFIXES.LINK_SUFFIXES),
        handler: data => {
            data.format = UiUtils.FORMAT_TYPE.LINK;
        }
    },
    {
        name: "int",
        matcher: javaType => javaType == JavaUtils.JAVA_TYPE.INTEGER
            || javaType == JavaUtils.JAVA_TYPE.LONG,
        handler: data => {
            data.format = UiUtils.FORMAT_TYPE.INT;
        }
    },
    {
        name: "decimal",
        matcher: Matchers.NUMBER_MATCHER,
        handler: data => {
            data.format = UiUtils.FORMAT_TYPE.DECIMAL;;
            data.pattern = 2;
        }
    },
    {
        name: "date",
        matcher: Matchers.DATE_MATCHER,
        handler: data => {
            data.format = UiUtils.FORMAT_TYPE.DATE;
            data.pattern = "yyyy-MM-dd hh:mm:ss";
        }
    }
]
export default {
    computed: {
        ...mapGetters(["getEnums"]),
    },

    methods: {
        /**
         * Analyze list display default format config
         */
        analyzeFormat(item) {
            if (!item.javaType || !item.entityFieldName)
                return;

            // match from enums
            if (JavaUtils.isEnumJavaType(item.javaType)) {
                let enums = this.getEnums;
                if (ARRAY.hasAny(enums, x => x.baseInfo.name.toLowerCase() == item.entityFieldName.toLowerCase())) {
                    item.format = UiUtils.FORMAT_TYPE.ENUM;;
                    item.pattern = STR.upperFirstLetter(item.entityFieldName);
                    return;
                }
            }

            // match from default matchers
            for (let matcher of FormatMatchers) {
                if (matcher.matcher(item.javaType, item.entityFieldName)) {
                    matcher.handler(item);
                    return;
                }
            }
        }
    }
}