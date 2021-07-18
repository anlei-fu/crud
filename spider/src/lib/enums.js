import SqlUtils from "./enum/sql"


const JavaNumber = ["Integer", "BigDecimal", "Float", "Double", "Long"]

const JavaDate = ["Date", "LocalDate"]





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const IndexType = [
    {
        label: "索引",
        value: "index"
    },
    {
        label: "唯一约束",
        value: "unique"
    },

]
const DataBaseType = [
    {
        label: "oracle",
        value: "oracle"
    },
    {
        label: "mysql",
        value: "mysql"
    },

    {
        label: "sqlite",
        value: "sqlite"
    },
    {
        label: "Ms-SqlServer",
        value: "Ms-SqlServer"
    },
    {
        label: "PostGres",
        value: "PostGres"
    },
]


const JoinType = [
    {
        label: "join",
        value: "join",
    },
    {
        label: "left join",
        value: "left join",
    },
    {
        label: "right join",
        value: "right join",
    },
    {
        label: "full join",
        value: "full join",
    },
]

const WhereCondition = [
    {
        value: "equal",
        label: "等于"
    },

    {
        value: "greatEequal",
        label: "大于等于"
    },
    {
        value: "great",
        label: "大于"
    },
    {
        value: "less",
        label: "小于"
    },
    {
        value: "lessThan",
        label: "小于等于"
    },
    {
        value: "like",
        label: "包含"
    },
    {
        value: "startsWith",
        label: "startsWith"
    },
    {
        value: "endsWidth",
        label: "endsWidth"
    },
]
const RelationType = [
    {
        label: "一对一",
        value: "oneToOne"
    },
    {
        label: "多对一",
        value: "manyToOne"
    },
    {
        label: "多对多",
        value: "manyToMany"
    },
]

const OrderByType = [
    {
        label: "升序",
        value: "asc"
    },
    {
        label: "降序",
        value: "desc"
    }
];

const ImportFileType = [{
    label: "Csv",
    value: "csv"
},
{
    label: "DDLSql",
    value: "ddlSql"
}]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const JdkVersion = [
    {
        label: "1.8",
        value: "1.8"
    },
    {
        label: "11",
        value: "11"
    },
    {
        label: "12",
        value: "12"
    },
]

const JavaBuildTool = [
    {
        label: "gradle",
        value: "gradle"
    },
    {
        label: "maven",
        value: "maven"
    },
]

const VueVersion = [
    {
        label: "2.2",
        value: "2.2"
    },
    {
        label: "2.3",
        value: "2.3"
    },
]

const UiFrameWork = [
    {
        label: "element",
        value: "element"
    },
    {
        label: "iview",
        value: "iview"
    },
]

const ElementVersion = [
    {
        label: "2.2",
        value: "2.2"
    },
    {
        label: "2.3",
        value: "2.3"
    },
]

const EChartVersion = [
    {
        label: "2.2",
        value: "2.2"
    },
    {
        label: "2.3",
        value: "2.3"
    },
]

const IViewVersion = [
    {
        label: "2.2",
        value: "2.2"
    },
    {
        label: "2.3",
        value: "2.3"
    },
]

const GradleVersion = [
    {
        label: "2.2",
        value: "2.2"
    },
    {
        label: "2.3",
        value: "2.3"
    },
]

const MavenVersion = [
    {
        label: "2.2",
        value: "2.2"
    },
    {
        label: "2.3",
        value: "2.3"
    },
]

const SpringBootVersion = [
    {
        label: "2.2",
        value: "2.2"
    },
    {
        label: "2.3",
        value: "2.3"
    },
]

const ConnetionPoolTool = [
    {
        label: "druid",
        value: "element"
    },
    {
        label: "iview",
        value: "iview"
    },
]

const RedisTool = [
    {
        label: "letus",
        value: "element"
    },
    {
        label: "iview",
        value: "iview"
    },
]

const JUnitVersion = [
    {
        label: "2.2",
        value: "2.2"
    },
    {
        label: "2.3",
        value: "2.3"
    },
]


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const FormatType = [
    {
        value: "money",
        label: "货币",
    },
    {
        value: "enum",
        label: "枚举",
    },
    {
        value: "date",
        label: "日期",
    },
    {
        value: "百分比",
        label: "percent",
    },
    {
        label: "小数",
        value: "decimal",
    },
    {
        label: "整数",
        value: "int",
    },
]

const ControlType = [
    {
        value: "text",
        label: "文本框",
    },
    {
        value: "textarea",
        label: "多行文本框",
    },
    {
        value: "date",
        label: "日期",
    },
    {
        value: "dateRange",
        label: "日期",
    },
    {
        label: "多选框",
        value: "checkboxGroup",
    },
    {
        label: "下拉框",
        value: "select",
    },
    {
        label: "多选下拉框",
        value: "mutipleSelect",
    },
    {
        label: "单选框",
        value: "radioGroup",
    },
    {
        label: "选择框",
        value: "checkbox",
    },
    {
        label: "数字范围",
        value: "numberRnage",
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

const DateType = [
    {
        label: "日期(不包含时间信息)",
        value: "date",
        add:true,
        query:false
    },
    {
        label: "时间段(不包含时间信息)",
        value: "daterange",
        add:false,
        query:true
    },
    {
        label: "日期(包含时间信息)",
        value: "datetime",
        add:true,
        query:false
    },
    {
        label: "时间段(包含时间信息)",
        value: "datetimerange",
        add:false,
        query:true
    },
    {
        label: "年",
        value: "year",
        add:true,
        query:false
    },
    {
        label: "月",
        value: "month",
        add:true,
        query:false
    },
]

const MinDate = [
    {
        label: "当日",
        value: "2.2"
    },
    {
        label: "当月",
        value: "2.2"
    },
    {
        label: "当周",
        value: "2.2"
    },
    {
        label: "当前小时",
        value: "2.3"
    },
]

const MaxDate = [
    {
        label: "当日开始",
        value: "2.2"
    },
    {
        label: "当月开始",
        value: "2.2"
    },
    {
        label: "当周开始",
        value: "2.2"
    },
    {
        label: "当前小时开始",
        value: "2.3"
    },
    {
        label: "当日结束",
        value: "2.2"
    },
    {
        label: "当月结束",
        value: "2.2"
    },
    {
        label: "当周结束",
        value: "2.2"
    },
    {
        label: "当前小时结束",
        value: "2.3"
    },
]


////////////////////////////////////////////////////////////////////////////////////

function getJavaType(sqlType, length) {

}

function getFormatType(javaType) {

}



function isNumber(javaType) {
    return JavaNumber.includes(javaType);
}

function isDate(javaType) {
    return JavaDate.includes(javaType);
}

function isEnumControl(controlType) {
    return EnumControl.includes(controlType);
}

const SqlType =SqlUtils.SqlType;

export {
    JavaType,
    ControlType,
    FormatType,
    SqlType,
    DateType,
    JoinType,
    WhereCondition,
    OrderByType,
    JdkVersion,
    JavaBuildTool,
    VueVersion,
    UiFrameWork,
    ElementVersion,
    IViewVersion,
    MavenVersion,
    GradleVersion,
    DataBaseType,
    SpringBootVersion,
    ConnetionPoolTool,
    RedisTool,
    JUnitVersion,
    EChartVersion,
    RelationType,
    IndexType,
    ImportFileType,
    DateFormatPattern
}


