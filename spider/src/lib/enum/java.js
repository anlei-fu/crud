import STR from "./../str"
const JavaType = [
    {
        value: "String",
        label: "String",
    },
    {
        value: "Integer",
        label: "Integer",
    },
    {
        value: "BigDecimal",
        label: "BigDecimal",
    },
    {
        value: "Date",
        label: "Date",
    },
    {
        value: "LocalDate",
        label: "LocalDate",
    },
    {
        value: "Float",
        label: "Float",
    },
    {
        value: "Double",
        label: "Double",
    },
    {
        value: "Boolean",
        label: "Boolean",
    },
    {
        value: "byte[]",
        label: "byte[]",
    },
]
const EnumType = [
    {
        value: "String",
        label: "String",
    },
    {
        value: "int",
        label: "int",
    },
]

const ProperInjection = [

    /**
     * 
     */
    {
        label: "@AutoWired",
        value: "@AutoWired",
    },

    /**
     * 
     */
    {
        label: "@Resource",
        value: "@Resource",
    },
]

const JdkVersion = [

    /**
     * 
     */
    {
        label: "1.7",
        value: "1.7",
    },

    /**
     * 
     */
    {
        label: "1.8",
        value: "1.8",
    },

    /**
     * 
     */
    {
        label: "11",
        value: "11",
    },

    /**
     * 
     */
    {
        label: "12",
        value: "12",
    },
]

const JavaBuildTool = [

    /**
     * 
     */
    {
      label: "gradle",
      value: "gradle",
    },
  
    /**
     * 
     */
    {
      label: "maven",
      value: "maven",
    }, 
  ]

const JAVA_TYPE = {
    STRING: "String",
    INTEGER: "Integer",
    DATE: "Date",
    FLOAT: "Float",
    BOOLEN: "Boolean",
    DOUBLE: "Double",
    LONG: "Long",
    BIG_DECIMAL: "BigDecimal",
    LOCAL_DATE: "LocalDate",
    BYTE_ARRAY: "byte[]"
}

const ENUM_JAVA_TYPE = [JAVA_TYPE.STRING, JAVA_TYPE.INTEGER, JAVA_TYPE.LONG];


const JavaNumber = ["Integer", "BigDecimal", "Float", "Double", "Long"]

const JavaDate = ["Date", "LocalDate"]

const DEFAULT_FLOAT_MATCHER = fieldName => STR.endsWithAny(fieldName.toLowerCase(), [
    "money",
    "rate",
    "fee",
    "price",
    "cost",
    'reward',
    'income',
    'profit',
    'face',
    'balance',
    'sum',
    "frozen",
    "transferin",
    "transferout"
])

function getJavaTypeCandidate(sqlType) {

}

function getJavaType(sqlType, name) {

    // aready been converted
    if (typeof sqlType == "string")
        return sqlType;

    // type is correct
    if (!sqlType.name && sqlType.length) {
        return new Error(`input(${sqlType}) is not a correct type!`);
    }

    sqlType.name = sqlType.name.toLowerCase();
    if (sqlType.name.includes("char")) {
        return "String";
    } else if (sqlType.name.includes("integer")) {
        return "Long";
    } else if (sqlType.name.includes("text")) {
        return "String";
    } else if (sqlType.name.includes("float")) {
        return "Float";
    } else if (sqlType.name.includes("double")) {
        return "Double";
    } else if (sqlType.name.includes("small")) {
        return "Integer";
    } else if (sqlType.name.includes("time") || sqlType.name.includes("date")) {
        return "Date";
    } else {
        if (name && DEFAULT_FLOAT_MATCHER(name)) {
            return "BigDecimal";
        }

        return "Integer";
    }
}

function isJavaNumber(javaType) {
    return JavaNumber.includes(javaType);
}

function isJavaDate(javaType) {
    return JavaDate.includes(javaType);
}

function isEnumJavaType(javaType) {
    if (!javaType)
        return false;

    return ENUM_JAVA_TYPE.includes(javaType);
}

export default {
    JAVA_TYPE,
    EnumType,
    ENUM_JAVA_TYPE,
    JavaType,
    JavaNumber,
    ProperInjection,
    JdkVersion,
    JavaBuildTool,
    getJavaType,
    isJavaNumber,
    isJavaDate,
    isEnumJavaType,
}