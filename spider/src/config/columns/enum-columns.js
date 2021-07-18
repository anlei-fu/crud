const ENUM_COLUMNS = [
  {
    field: "$$guid",
  },
  {
    title: "枚举名称",
    field: "name",
    description: "生成枚举类或常量时使用，符合变量命名规则，具有唯一性",
    defaultValue: "newitem",
    width: "180px",
    show: true,
  },
  {
    title: "显示标题",
    field: "label",
    description: "列表等显示标题",
    show: true,
  },
  {
    title: "枚举值",
    field: "value",
    description: "字符串或者数字",
    show: true,
  },
  {
    title: "颜色",
    field: "color",
    description: "这个值的对应的颜色",
    show: true,
  },
  {
    title: "图标",
    field: "icon",
    description: "这个值的对应的图标",
    show: true,
  },
  {
    title: "描述",
    field: "description",
    description: "描述这个值的用法",
    width: "200px",
    show: true,
  },
]

export default ENUM_COLUMNS