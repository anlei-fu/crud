import STR from "./../../lib/str";
import JavaUtils from "./../../lib/enum/java";

const ExtraInfoMatchers = [
    {
        name: "isPassword",
        matcher: (javaType, name) => {
            if (JavaUtils.JAVA_TYPE.STRING != javaType)
                return false;
            return STR.endsWithAny(name.toLowerCase(), ["password", "pwd"])
        }
    },
    {
        name: "isCreateTime",
        matcher: (javaType, name) => {
            if (!JavaUtils.isJavaDate(javaType))
                return false;

            return STR.endsWithAny(name.toLowerCase(), ["createtime", "createdate"])
        }
    },
    {
        name: "isCreateUser",
        matcher: (javaType, name) => {
            if (JavaUtils.JAVA_TYPE.STRING != javaType)
                return false;
            return STR.endsWithAny(name.toLowerCase(), ["createUser", "creator"])
        }
    },
    {
        name: "isUpdateTime",
        matcher: (javaType, name) => {
            if (!JavaUtils.isJavaDate(javaType))
                return false;
            return STR.endsWithAny(name.toLowerCase(), ["updatetime", "molidytime", "updatedate", "modifydate"])
        }
    },
    {
        name: "isUpdateUser",
        matcher: (javaType, name) => {
            if (JavaUtils.JAVA_TYPE.STRING != javaType)
                return false;

            return STR.endsWithAny(name.toLowerCase(), ["updateuser", "modifyuser"])
        }
    },
    {
        name: "isEmail",
        matcher: (javaType, name) => {
            if (JavaUtils.JAVA_TYPE.STRING != javaType)
                return false;
            return STR.endsWithAny(name.toLowerCase(), ["email"])
        }
    }, {
        name: "isPhoneNo",
        matcher: (javaType, name) => {
            if (JavaUtils.JAVA_TYPE.STRING != javaType)
                return false;
            return STR.includesAny(name.toLowerCase(), ["phone"])
        }
    }, {
        name: "isTelephone",
        matcher: (javaType, name) => {
            if (JavaUtils.JAVA_TYPE.STRING != javaType)
                return false;
            return STR.endsWithAny(name.toLowerCase(), ["telNo", "telephone"])
        }
    },
    {
        name: "isUrl",
        matcher: (javaType, name) => {
            if (JavaUtils.JAVA_TYPE.STRING != javaType)
                return false;
            return STR.endsWithAny(name.toLowerCase(), ["url"])
        }
    },
    {
        name: "isImageUrl",
        matcher: (javaType, name) => {
            if (JavaUtils.JAVA_TYPE.STRING != javaType)
                return false;

            return STR.endsWithAny(name.toLowerCase(), ["image", "picture", "photo"])
        }
    },
    {
        name: "isFileUrl",
        matcher: (javaType, name) => {
            if (JavaUtils.JAVA_TYPE.STRING != javaType)
                return false;
            return STR.endsWithAny(name.toLowerCase(), ["fileUrl"])
        }
    },
    {
        name: "isPostCode",
        matcher: (javaType, name) => {
            if (JavaUtils.JAVA_TYPE.STRING != javaType)
                return false;
            return STR.endsWithAny(name.toLowerCase(), ["postcode"])
        }
    },
    {
        name: "isIdNo",
        matcher: (javaType, name) => {
            if (JavaUtils.JAVA_TYPE.STRING != javaType)
                return false;
            return STR.endsWithAny(name.toLowerCase(), ["idno"])
        }
    },
    {
        name: "isIp",
        matcher: (javaType, name) => {
            if (JavaUtils.JAVA_TYPE.STRING != javaType)
                return false;
            return STR.endsWithAny(name.toLowerCase(), ["ip"])
        }
    },
    {
        name: "isDomain",
        matcher: (javaType, name) => {
            if (JavaUtils.JAVA_TYPE.STRING != javaType)
                return false;
            return STR.endsWithAny(name.toLowerCase(), ["domain"])
        }
    },
    {
        name: "isPort",
        matcher: (javaType, name) => {
            if (JavaUtils.JAVA_TYPE.INTEGER != javaType)
                return false;
            return STR.endsWithAny(name.toLowerCase(), ["port"])
        }
    },
    {
        name: "sortable",
        matcher: (javaType, name) => {

            if (JavaUtils.isJavaNumber(javaType) || JavaUtils.isJavaDate(javaType))
                return true;

            if (JavaUtils.JAVA_TYPE.STRING == javaType) {
                return STR.endsWithAny(name.toLowerCase(), ["no", "id", "name"])
            }

            return false;

        }
    },
    {
        name: "isSortField",
        matcher: (javaType, name, isPrimaryKey) => {

            if (isPrimaryKey)
                return true;

            if (JavaUtils.isJavaDate(javaType))
                return STR.endsWithAny(name.toLowerCase(), ["createtime", "createdate"]);
            return false;

        },
        handler: data => {
            data.isSortField = true,
                data.orderByType = "desc"
        }
    },
]

export default {

    methods: {
        analyzeExtraInfo(data) {
            if (!data.javaType || !data.entityFieldName)
                return;

            ExtraInfoMatchers.forEach(x => {

                if (x.matcher(data.javaType, data.entityFieldName, data.isPrimaryKey)) {
                    if (!x.handler) {
                        data[x.name] = true;
                    } else {
                        x.handler(data);
                    }
                }
            })
        }
    }
}


