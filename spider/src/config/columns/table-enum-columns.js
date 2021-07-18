const TABLE_ENUM_COLUMNS = [
  {
    field: "$$guid",
  },
  {
    title: "名称",
    description: "生成枚举类或常量时使用，符合变量命名规则，具有唯一性",
    field: "name",
    show: true,
  },
  {
    title: "主表",
    field: "table",
    description: "所关联的表",
    format: "table",
    show: true,
  },
  {
    title: "值列",
    description: "主表的值列（一般为主键）",
    field: "valueField",
    format: "column",
    show: true,
  },
  {
    title: "标题列",
    description: "主表标题列",
    field: "labelField",
    format: "column",
    show: true,
  },
  {
    title: "关联配置",
    field: "joins",
    show: true,
    width: "200px",
  },
  {
    title: "筛选配置",
    field: "filterColumns",
    show: true,
    width: "200px",
  },
  {
    title: "排序配置",
    field: "orderBys",
    show: true,
    width: "200px",
  },
  {
    title: "描述",
    field: "description",
    description: "请输入描述信息",
    width: "150px",
    show: true,
  },
]

export default TABLE_ENUM_COLUMNS