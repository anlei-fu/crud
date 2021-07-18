const TABLE_COLUMNS = [
    {
        field: "$$guid",
    },
    {
        title: "列名称",
        field: "name",
        show: true,
        width: "160px",
    },
    {
        title: "显示标题",
        field: "label",
        show: true,
        width: "120px",
    },
    {
        title: "数据库类型",
        field: "sqlType",
        show: true,
        width: "80px",
    },
    {
        title: "长度",
        field: "length",
        show: true,
        width: "60px",
    },
    {
        title: "实体类字段名称",
        field: "entityFieldName",
        show: true,
        width: "160px",
    },
    {
        title: "java类型",
        field: "javaType",
        show: true,
        width: "70px",
    },
    {
        title: "主键",
        field: "isPrimaryKey",
        show: true,
        defaultValue: false,
        width: "60px",
    },
    {
        title: "可空",
        field: "nullable",
        defaultValue: false,
        show: true,
        width: "60px",
    },
    {
        title: "自增",
        field: "isAutoIncrement",
        defaultValue: false,
        show: true,
        width: "60px",
    },
    {
        title: "自增起始值",
        field: "autoIncrementStart",
        defaultValue: 0,
        width: "60px",
    },
    {
        title: "默认值",
        field: "defaultValue",
        show: true,
        width: "100px",
    },
    {
        title: "备注",
        field: "description",
        show: true,
        width: "200px",
    },

    {
        title: "名称字段",
        field: "isNameField",
    },
    {
        title: "密码字段",
        field: "isPassword",
    },
    {
        title: "创建时间",
        field: "isCreateTime",
    },
    {
        title: "创建人",
        field: "isCreateUser",
    },
    {
        title: "更新时间",
        field: "isUpdateTime",
    },
    {
        title: "更新人",
        field: "isUpdateUser",
    },
    {
        title: "可排序",
        field: "sortable",
    },
    {
        title: "排序字段",
        field: "isSortField",
    },
    {
        title: "排序类型",
        field: "orderByType",
    },
    {
        title: "查询字段",
        field: "isQueryField",
    },
    {
        title: "外键",
        field: "isForeignKey",
    },
    {
        title: "关联表",
        field: "joinTable",
    },
    {
        title: "关联表字段",
        field: "relationTableField",
    },
    {
        title: "关系类型",
        field: "relationType",
    },
    {
        title: "链接地址",
        field: "isLink",
    },
    {
        title: "图片地址",
        field: "isEmgUrl",
    },
    {
        title: "手机号",
        field: "isPhoneNo",
    },
    {
        title: "电话号码",
        field: "isTelNo",
    },
    {
        title: "身份证号",
        field: "isIdNo",
    },
    {
        title: "邮政编码",
        field: "isPostCode",
    },
    {
        title: "邮箱地址",
        field: "isEmail",
    },
    {
        title: "ip地址",
        field: "isIp",
    },
    {
        title: "域名",
        field: "isDomain",
    },
    {
        title: "端口",
        field: "isPort",
    },
    {
        title: "金额",
        field: "isMoney",
    },
    {
        title: "不可编辑",
        field: "notEditable",
    },
    {
        title: "更新条件",
        field: "isEditCondition",
    },
    {
        title: "删除条件",
        field: "isDeleteCondition",
    },
    {
        title: "格式化",
        field: "format",
    },
    {
        title: "格式化pattern",
        field: "pattern",
    },
    {
        title: "添加控件类型",
        field: "addControlType",
    },
    {
        title: "添加控件pattern",
        field: "addControlPattern",
    },
    {
        title: "查询控件类型",
        field: "queryControlType",
    },
    {
        title: "查询控件pattern",
        field: "queryControlPattern",
    },
    {
        title: "空值显示",
        field: "placeHolder",
    },
    {
        title: "最小宽度",
        field: "minWidth",
    },
    {
        title: "正则表达式",
        field: "regex",
    },
    {
        title: "最小值",
        field: "minValue",
    },
    {
        title: "最大值",
        field: "maxValue",
    },
    {
        title: "最小时间",
        field: "minDate",
    },
    {
        title: "最大时间",
        field: "maxDate",
    },
]

export default TABLE_COLUMNS