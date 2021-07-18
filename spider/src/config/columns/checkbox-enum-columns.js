const CHECKBOX_ENUM_COLUMNS = [
  {
    field: "$$guid",
  },
  {
    title: "名称",
    field: "name",
    description: "生成枚举类或常量时使用，符合变量命名规则,具有唯一性",
    defaultValue: "new-item",
    show: true,
  },
  {
    title: "trueValue",
    description: "选中时的值",
    field: "trueValue",
    show: true,
  },
  {
    title: "trueValue标题",
    description: "trueValue标题",
    field: "trueValueLabel",
    show: true,
    width: "130px",
  },

  {
    title: "trueValue颜色",
    description: "trueValue颜色",
    field: "trueValueColor",
    show: true,
    width: "130px",
  },
  {
    title: "trueValue图标",
    description: "trueValue图标",
    field: "trueValueIcon",
    show: true,
    width: "130px",
  },
  {
    title: "falseValue",
    field: "falseValue",
    description: "未选中时的值",
    show: true,
  },
  {
    title: "falseValue标题",
    description: "trueValue标题",
    field: "falseValueLabel",
    show: true,
    width: "130px",
  },

  {
    title: "falseValue颜色",
    description: "falseValue颜色",
    field: "falseValueColor",
    show: true,
    width: "130px",
  },
  {
    title: "falseValue图标",
    description: "falseValue图标",
    field: "falseValueIcon",
    show: true,
    width: "130px",
  },
  {
    title: "描述",
    field: "description",
    description: "请输入描述信息",
    width: "200px",
    show: true,
  },
]

export default CHECKBOX_ENUM_COLUMNS