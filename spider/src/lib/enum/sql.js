
import JavaUtils from "./java"
import ARRAY from "./../../lib/array"

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

const SqlType = [
    {
        label: "varchar",
        value: "varchar",
        defaultValue: "",
        defaultLength: 45,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.STRING],
        withLength: true,
        canHaveDefaultValue: true,
    },
    {
        label: "char",
        value: "char",
        defaultValue: "",
        defaultLength: 45,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.STRING],
        withLength: true,
        canHaveDefaultValue: true,
    },
    {
        label: "int",
        value: "int",
        defaultValue: 0,
        defaultLength: 11,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.INTEGER],
        canHaveDefaultValue: true,
    },
    {
        label: "timestamp",
        value: "timestamp",
        defaultValue: "current_timestamp",
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.DATE],
        canHaveDefaultValue: true,
    },
    {
        label: "tinyint",
        value: "tinyint",
        defaultValue: 0,
        defaultLength: 11,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.INTEGER],
        canHaveDefaultValue: true,
    },
    {
        label: "text",
        value: "text",
        defaultValue: "",
        defaultLength: 45,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.STRING],
        canHaveDefaultValue: false,
    },

    {
        label: "date",
        value: "date",
        defaultValue: "current_date",
        defaultLength: 11,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.DATE],
        canHaveDefaultValue: true,

    },
    {
        label: "smallint",
        value: "smallint",
        defaultValue: 0,
        defaultLength: 11,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.INTEGER],
        canHaveDefaultValue: true,
    },
    {
        label: "mediumint",
        value: "mediumint",
        defaultValue: 0,
        defaultLength: 11,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.INTEGER],
        canHaveDefaultValue: true,
    },

    {
        label: "mediumtext",
        value: "mediumtext",
        defaultValue: "",
        defaultLength: 45,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.STRING],
        canHaveDefaultValue: false,
    },
    {
        label: "tinytext",
        value: "tinytext",
        defaultValue: "",
        defaultLength: 45,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.STRING],
        canHaveDefaultValue: false,
    },
    {
        label: "longtext",
        value: "longtext",
        defaultValue: "",
        allowedJavaTypes: [],
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.STRING],
        canHaveDefaultValue: false,
    },

    {
        label: "bigint",
        value: "bigint",
        defaultValue: 0,
        defaultLength: 11,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.LONG],
        canHaveDefaultValue: true,
    },
    {
        label: "float",
        value: "float",
        defaultValue: 0,
        defaultLength: 11,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.FLOAT],
        canHaveDefaultValue: true,
    },
    {
        label: "double",
        value: "double",
        defaultValue: 0,
        defaultLength: 11,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.DOUBLE],
        canHaveDefaultValue: true,
    },
    {
        label: "decimal",
        value: "decimal",
        defaultValue: 0,
        defaultLength: 11,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.BigDecimal],
        canHaveDefaultValue: true,
    },

    {
        label: "time",
        value: "time",
        defaultValue: "current_timestamp",
        defaultLength: 11,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.DATE],
        canHaveDefaultValue: true,
    },
    {
        label: "year",
        value: "year",
        defaultValue: "current_timestamp",
        defaultLength: 11,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.DATE],
        canHaveDefaultValue: true,
    },
    {
        label: "datetime",
        value: "datetime",
        defaultValue: "current_timestamp",
        defaultLength: 11,
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.DATE],
        canHaveDefaultValue: true,
    },


    {
        label: "tinyblob",
        value: "tinyblob",
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.BYTE_ARRAY],
        canHaveDefaultValue: false,
    },

    {
        label: "blob",
        value: "blob",
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.BYTE_ARRAY],
        canHaveDefaultValue: false,
    },

    {
        label: "mediumblob",
        value: "mediumblob",
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.BYTE_ARRAY],
        canHaveDefaultValue: false,
    },

    {
        label: "longblob",
        value: "longblob",
        allowedJavaTypes: [JavaUtils.JAVA_TYPE.BYTE_ARRAY],
        canHaveDefaultValue: false,
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
        label: "??????"
    },

    {
        value: "greatEequal",
        label: "????????????"
    },
    {
        value: "great",
        label: "??????"
    },
    {
        value: "less",
        label: "??????"
    },
    {
        value: "lessThan",
        label: "????????????"
    },
    {
        value: "like",
        label: "??????"
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

const StringFilters = [
    {
        value: "like",
        label: "??????"
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
        label: "?????????",
        value: "oneToOne"
    },
    {
        label: "?????????",
        value: "manyToOne"
    },
    {
        label: "?????????",
        value: "manyToOne"
    },
]

const OrderByType = [
    {
        label: "asc",
        value: "asc"
    },
    {
        label: "desc",
        value: "desc"
    }
];

const IndexType = [
    {
        label: "??????",
        value: "index"
    },
    {
        label: "????????????",
        value: "unique"
    },

]

function getDefaultValue(sqlType) {
    let items = SqlType.filter(x => x.value == sqlType);
    if (items.length != 0)
        return items[0].defaultValue;

    return "";
}

function getDefaultLength(sqlType) {
    let items = SqlType.filter(x => x.value == sqlType);
    if (items.length != 0)
        return items[0].defaultLength || 1;

    return 1;
}

function getJavaTypeCandidate(sqlType) {
    let item = ARRAY.findFirst(SqlType, x => x.value == sqlType);
    let result = [];
    if (item) {
        item.allowedJavaTypes.forEach(x => {
            result.push({ label: x + "????????????", value: x });
        });
    }
    return result;
}

/**
 * 
 * @param {[]} orderBys 
 */
function makeOrderText(orderBys) {
    if (!orderBys)
        return "";

    let text = "";
    orderBys.forEach(x => {
        if (x.customer) {
            orderBys += `${x.customerSql} \r\n`;
        } else {
            text += `${x.table}.${x.column} ${x.orderByType} \r\n`;
        }
    })

    return text;
}

function withLength(sqlType) {
    if (!sqlType)
        return false;

    let sqlTypeInfo = ARRAY.firstOrDefault(SqlType.filter(x => x.value == sqlType));
    if (!sqlTypeInfo)
        return false;

    return sqlTypeInfo.withLength;
}

function canHaveDefaultValue(sqlType) {
    if (!sqlType)
        return false;

    let sqlTypeInfo = ARRAY.firstOrDefault(SqlType.filter(x => x.value == sqlType));
    if (!sqlTypeInfo)
        return false;

    return sqlTypeInfo.canHaveDefaultValue;
}

export default {
    getDefaultValue,
    getJavaTypeCandidate,
    getDefaultLength,
    makeOrderText,
    SqlType,
    StringFilters,
    RelationType,
    OrderByType,
    JoinType,
    DataBaseType,
    withLength,
    IndexType,
    canHaveDefaultValue
}