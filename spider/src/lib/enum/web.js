import Matchers from "./matchers"


const PageControlAlignment = [

    /**
     * 
     */
    {
        label: "左对齐",
        value: "left",
    },

    /**
     * 
     */
    {
        label: "右对齐",
        value: "right",
    },
]

const FORMAT_TYPE = {

    /**
     * 货币
     * 
     * 
     */
    MONEY: "money",

    /**
     * 枚举
     * 
     * 
     */
    ENUM: "enum",

    /**
     * 日期
     * 
     * 
     */
    DATE: "date",

    /**
     * 百分比
     * 
     * 
     */
    PERCENT: "percent",

    /**
     * 小数
     * 
     * 
     */
    DECIMAL: "decimal",

    /**
     * 整数
     * 
     * 
     */
    INT: "int",

    /**
     * 图片
     * 
     * 
     */
    PICTURE: "picture",

    /**
     * 链接地址
     * 
     * 
     */
    LINK: "link"
}

const UiFramework = [

    /**
     * 
     */
    {
      label: "iview",
      value: "iview",
    },
  
    /**
     * 
     */
    {
      label: "element",
      value: "element",
    },
  
    /**
     * 
     */
    {
      label: "antDesign",
      value: "antDesign",
    }, 
  ]
/**
 * List table format type
 */
const FormatType = [
    {
        value: "money",
        label: "货币",
        matcher: javaType => Matchers.MATCHERS_GROUP(
            javaType,
            [Matchers.NUMBER_MATCHER, Matchers.STRING_MATCHER]
        )
    },
    {
        value: "enum",
        label: "枚举",
        matcher: javaType => Matchers.MATCHERS_GROUP(
            javaType,
            [Matchers.NUMBER_MATCHER, Matchers.STRING_MATCHER]
        )
    },
    {
        value: "date",
        label: "日期",
        matcher: Matchers.DATE_MATCHER
    },
    {
        value: "percent",
        label: "百分比",
        matcher: javaType => Matchers.MATCHERS_GROUP(
            javaType,
            [Matchers.NUMBER_MATCHER, Matchers.STRING_MATCHER]
        )
    },
    {
        label: "小数",
        value: "decimal",
        matcher: javaType => Matchers.MATCHERS_GROUP(
            javaType,
            [Matchers.NUMBER_MATCHER, Matchers.STRING_MATCHER]
        )
    },
    {
        label: "整数",
        value: "int",
        matcher: javaType => Matchers.MATCHERS_GROUP(
            javaType,
            [Matchers.NUMBER_MATCHER, Matchers.STRING_MATCHER]
        )
    },
    {
        label: "图片",
        value: "picture",
        matcher: Matchers.STRING_MATCHER

    },
    {
        label: "链接地址",
        value: "link",
        matcher: Matchers.STRING_MATCHER
    },
]

const CONTROL_TYPE = {

    /**
     * 图片
     * 
     * 
     */
    PICTURE: "picture",

    /**
     * 文件
     * 
     * 
     */
    FILE: "file",

    /**
     * 多行文本框
     * 
     * 
     */
    TEXTAREA: "textarea",

    /**
     * 文本框
     * 
     * 
     */
    TEXT: "text",

    /**
     * 数字输入框
     * 
     * 
     */
    NUMBER: "number",

    /**
     * 日期
     * 
     * 
     */
    DATE: "date",

    /**
     * 多选框
     * 
     * 
     */
    CHECKBOX_GROUP: "checkboxGroup",

    /**
     * 下拉框
     * 
     * 
     */
    SELECT: "select",

    /**
     * 多选下拉框
     * 
     * 
     */
    MUTIPLE_SELECT: "mutipleSelect",

    /**
     * 单选框
     * 
     * 
     */
    RADIO_GROUP: "radioGroup",

    /**
     * 选择框
     * 
     * 
     */
    CHECKBOX: "checkbox",

    /**
     * 数字范围
     * 
     * 
     */
    NUMBER_RANGE: "numberRange"
}

const Alignment = [

    /**
     * 
     */
    {
        label: "左对齐",
        value: "left",
    },

    /**
     * 
     */
    {
        label: "右对齐",
        value: "right",
    },

    /**
     * 
     */
    {
        label: "居中对齐",
        value: "center",
    },

    /**
     * 
     */
    {
        label: "默认",
        value: "none",
    },
]
const RuleType = [
    /**
     * 判断是否可空
     */
    {
        label: "是否可空",
        value: "isNotNullable",
    },

    /**
     * 
     */
    {
        label: "名称字段",
        value: "isNameField",
    },

    /**
     * 
     */
    {
        label: "密码",
        value: "isPassword",
    },

    /**
     * 
     */
    {
        label: "创建时间",
        value: "isCreateTime",
    },

    /**
     * 
     */
    {
        label: "创建人",
        value: "isCreateUser",
    },

    /**
     * 
     */
    {
        label: "更新时间",
        value: "isUpdateTime",
    },

    /**
     * 更新时间
     */
    {
        label: "更新人",
        value: "isUpdateUser",
    },

    /**
     * 
     */
    {
        label: "Sql排序字段",
        value: "isSortField",
    },

    /**
     * 
     */
    {
        label: "外键",
        value: "isForeignKey",
    },

    /**
     * 
     */
    {
        label: "链接字段",
        value: "isLink",
    },

    /**
     * 
     */
    {
        label: "图片地址",
        value: "isImageUrl",
    },

    /**
     * 
     */
    {
        label: "文件地址",
        value: "isFileUrl",
    },

    /**
     * 
     */
    {
        label: "电话号码",
        value: "isPhoneNo",
    },

    /**
     * 
     */
    {
        label: "座机号码",
        value: "isTelNo",
    },

    /**
     * 
     */
    {
        label: "邮政编码",
        value: "isPostCode",
    },

    /**
     * 
     */
    {
        label: "邮箱地址",
        value: "isEmail",
    },

    /**
     * 
     */
    {
        label: "IP地址",
        value: "isIp",
    },

    /**
     * 
     */
    {
        label: "域名",
        value: "isDomain",
    },

    /**
     * 
     */
    {
        label: "端口",
        value: "isPort",
    },

    /**
     * 
     */
    {
        label: "更新条件",
        value: "isEditCondition",
    },

    /**
     * 
     */
    {
        label: "删除条件",
        value: "isDeleteCondition",
    },

    /**
     * 
     */
    {
        label: "查询字段",
        value: "isQueryField",
    },
]

const ControlSize = [

    /**
     * 
     */
    {
        label: "小",
        value: "small",
    },

    /**
     * 
     */
    {
        label: "默认",
        value: "default",
    },

    /**
     * 
     */
    {
        label: "大",
        value: "big",
    },
]

const ColumnFixed = [

    /**
     * 
     */
    {
        label: "靠左",
        value: "left",
    },

    /**
     * 
     */
    {
        label: "靠右",
        value: "right",
    },

    /**
     * 
     */
    {
        label: "默认",
        value: "none",
    },
]

/**
 * 控件类型
 */
const ControlType = [
    {
        label: "图片",
        value: "picture",
        addMatcher: Matchers.STRING_MATCHER,
        queryMatcher: Matchers.FALSE_MATCHE,
        isAddControl: true,
        isQueryControl: false,
    },
    {
        label: "文件",
        value: "file",
        addMatcher: Matchers.STRING_MATCHER,
        queryMatcher: Matchers.FALSE_MATCHE,
        isAddControl: true,
        isQueryControl: false,
    },
    {
        value: "textarea",
        label: "多行文本框",
        addMatcher: Matchers.STRING_MATCHER,
        queryMatcher: Matchers.FALSE_MATCHE,
        isAddControl: true,
        isQueryControl: false,

    },
    {
        value: "text",
        label: "文本框",
        addMatcher: Matchers.STRING_MATCHER,
        queryMatcher: Matchers.STRING_MATCHER,
        isAddControl: true,
        isQueryControl: true,
    },
    {
        value: "number",
        label: "数字输入框",
        addMatcher: Matchers.NUMBER_MATCHER,
        queryMatcher: Matchers.FALSE_MATCHE,
        isAddControl: true,
        isQueryControl: false,
    },

    {
        value: "date",
        label: "日期",
        addMatcher: Matchers.DATE_MATCHER,
        queryMatcher: Matchers.DATE_MATCHER,
        isAddControl: true,
        isQueryControl: true,
    },
    {
        label: "多选框",
        value: "checkboxGroup",
        addMatcher: Matchers.FALSE_MATCHE,
        queryMatcher: Matchers.JAVA_ENUM_MATCHER,
        isEnumControl: true,
        isAddControl: false,
        isQueryControl: true,
    },
    {
        label: "下拉框",
        value: "select",
        addMatcher: Matchers.JAVA_ENUM_MATCHER,
        queryMatcher: Matchers.JAVA_ENUM_MATCHER,
        isEnumControl: true,
        isAddControl: true,
        isQueryControl: true,
    },
    {
        label: "多选下拉框",
        value: "mutipleSelect",
        addMatcher: Matchers.FALSE_MATCHE,
        queryMatcher: Matchers.JAVA_ENUM_MATCHER,
        isEnumControl: true,
        isAddControl: false,
        isQueryControl: true,
    },
    {
        label: "单选框",
        value: "radioGroup",
        addMatcher: Matchers.JAVA_ENUM_MATCHER,
        isEnumControl: true,
        queryMatcher: Matchers.JAVA_ENUM_MATCHER,
        isAddControl: true,
        isQueryControl: true,
    },
    {
        label: "选择框",
        value: "checkbox",
        addMatcher: Matchers.JAVA_ENUM_MATCHER,
        queryMatcher: Matchers.JAVA_ENUM_MATCHER,
        isAddControl: true,
        isQueryControl: true,
    },
    {
        label: "数字范围",
        value: "numberRange",
        addMatcher: Matchers.FALSE_MATCHE,
        queryMatcher: Matchers.NUMBER_MATCHER,
        isAddControl: false,
        isQueryControl: true,
    },

]

const EnumControl = ["checkboxGroup", "select", "mutipleSelect", "radioGroup"]

const DateFormatPattern = [
    {
        label: "yyyy-MM-dd",
        value: "yyyy-MM-dd",
    },
    {
        label: "yyyy-MM",
        value: "yyyy-MM",
    },
    {
        label: "yyyy-MM-dd HH:mm:ss",
        value: "yyyy-MM-dd HH:mm:ss",
    },

]

/**
 * 时间控件类型
 */
const DateType = [
    {
        label: "日期(不包含时间信息)",
        value: "date",
        add: true,
        query: false
    },
    {
        label: "时间段(不包含时间信息)",
        value: "daterange",
        add: false,
        query: true
    },
    {
        label: "日期(包含时间信息)",
        value: "datetime",
        add: true,
        query: false
    },
    {
        label: "时间段(包含时间信息)",
        value: "datetimerange",
        add: false,
        query: true
    },
    {
        label: "年",
        value: "year",
        add: true,
        query: false
    },
    {
        label: "月",
        value: "month",
        add: true,
        query: false
    },
]

/**
 * Get select options of "format-type"
 * 
 * @param {String} javaType 
 * @param {String} name 
 * @returns {[]}
 */
function getFormatType(javaType, name = "") {
    return FormatType.filter(x => x.matcher(javaType, name));
}


/**
 * Get add-config select options of "control-type"
 * 
 * @param {String} javaType 
 * @param {String} name 
 * @returns {[]}
 */
function getAddControlType(javaType, name = "") {
    return ControlType.filter(x => x.addMatcher(javaType, name));
}

/**
 * Get query-config select options of "control-type"
 * 
 * @param {String} javaType 
 * @param {String} name 
 * @returns {[]}
 */
function getQueryControlType(javaType, name = "") {
    return ControlType.filter(x => x.queryMatcher(javaType, name));
}

/**
 * To check is control is a "enum-control"
 * 
 * @param {String} javaType 
 * @param {String} name 
 * @returns {[]}
 */
function isEnumControl(controlType) {
    return ControlType.filter(x => x.value == controlType && x.isEnumControl).length > 0;
}

/**
 * Get add-config date-control-type options
 * 
 * @param {String} javaType 
 * @param {String} name 
 * @returns {[]}
 */
function getAddDateFormatType() {
    return DateType.filter(x => x.add);
}

/**
 * Get query-config date-control-type options
 * 
 * @param {String} javaType 
 * @param {String} name 
 * @returns {[]}
 */
function getQueryDateFormatType() {
    return DateType.filter(x => x.query);
}

function getAddControl() {
    return ControlType.filter(x => x.isAddControl);
}

function getQueryControl() {
    return ControlType.filter(x => x.isQueryControl);
}

export default {
    FORMAT_TYPE,
    FormatType,
    CONTROL_TYPE,
    ControlType,
    EnumControl,
    RuleType,
    DateFormatPattern,
    getAddDateFormatType,
    getQueryDateFormatType,
    getFormatType,
    getAddControlType,
    getQueryControlType,
    isEnumControl,
    getAddControl,
    getQueryControl,
    ControlSize,
    ColumnFixed,
    Alignment,
    PageControlAlignment,
    UiFramework
}