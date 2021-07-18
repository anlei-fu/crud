<template>
  <Left width="70%">
    <Form ref="form" :model="data1" :rules="rules" :label-width="120">
      <Row justify="space-between"
        ><Col :span="24">
          <FormItem
            label="枚举名称"
            title="生成枚举或常量时使用，需要符合代码命名规则"
            prop="name"
          >
            <MyInput
              v-model="data1.name"
              size="default"
              :maxlength="100"
              placeHolder="生成枚举或常量时使用，需要符合代码命名规则"
              width="100%"
            /> </FormItem
        ></Col>
        <Col :span="24">
          <FormItem
            label="枚举类型"
            title="枚举类型可选项为int或者String"
            prop="type"
          >
            <MySelect
              v-model="data1.type"
              size="default"
              :maxlength="100"
              placeHolder="请选择枚举类型"
              :options="enumTypes"
              width="100%"
            /> </FormItem
        ></Col>
        <Col :span="24">
          <FormItem label="显示标题" title="列表等显示字面标题" prop="label">
            <MyInput
              v-model="data1.label"
              size="default"
              :maxlength="100"
              placeHolder="列表等显示字面标题"
              width="100%"
            /> </FormItem></Col
        ><Col :span="24">
          <FormItem label="描述" title="请输入描述信息" prop="description">
            <MyInput
              v-model="data1.description"
              size="default"
              width="100%"
              type="textarea"
              placeHolder="请输入描述信息"
              :maxlength="100"
              :rows="3"
            /> </FormItem></Col
      ></Row>
      <OperationPanel @save="save" size="default" :operations="operations" />
    </Form>
  </Left>
</template>
<script>
import NamingStrategy from "./../../../lib/naming-strategy";
import * as utils from "./../../../utils";
import * as Enum from "./../../../lib/enums";
import JavaUtils from "./../../../lib/enum/java";
import ValidatorUtils from "./../../../lib/validator-utils";
export default {
  model: {
    props: "value",
    event: "change",
  },
  props: {
    value: Object,
    checkUnique: Function,
    updateMenu: Function,
  },
  data() {
    return {
      Enum,
      data1: {
        name: null,
        label: null,
        type: null,
        description: null,
      },
      rules: {
        name: [
          ValidatorUtils.RuleFactory.require("名称不能为空"),
          ValidatorUtils.DEFAULT_RULES.VARIABLE_NAME,
        ],
        label: [ValidatorUtils.RuleFactory.require("标题不能为空")],
        type: [ValidatorUtils.RuleFactory.require("类型不能为空")],
      },

      operations: [
        { label: "保存", event: "save", type: "primary", create: true },
      ],
    };
  },
  created() {
    this.data1 = this.$utils.clone(this.value);
  },
  computed: {
    enumTypes() {
      return JavaUtils.EnumType;
    },
  },
  watch: {
    value() {
      this.data1 = this.$utils.clone(this.value);
    },
    "data1.name"(val) {
      if (val) {
        this.data1.name = NamingStrategy.toPascal(this.data1.name);
      }
    },
  },
  methods: {
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.checkUnique(this.data1.name, this.data1.$$guid)) {
            this.$Message.success(`保存成功`);
            this.$emit("change", this.data1);
            this.updateMenu(this.data1.name);
          } else {
            this.$Message.warning(`枚举:${this.data1.name}已经存在！`);
          }
        }
      });
    },
  },
};
</script>