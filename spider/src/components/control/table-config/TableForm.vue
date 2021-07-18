<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="120">
    <Row justify="space-between"
      ><Col :span="24">
        <FormItem label="名称" prop="name">
          <MyInput
            v-model="data1.name"
            size="default"
            :maxlength="100"
            placeHolder="请输入名称"
            width="100%"
          /> </FormItem></Col
      ><Col :span="24">
        <FormItem label="实体类名称" prop="entityName">
          <MyInput
            v-model="data1.entityName"
            size="default"
            :maxlength="100"
            placeHolder="请输入实体类名称"
            width="100%"
          /> </FormItem></Col
      ><Col :span="24">
        <FormItem label="描述" prop="description">
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
</template>
<script>
import * as utils from "./../../../utils";
import NamingStrategy from "./../../../lib/naming-strategy";
import * as Enum from "./../../../lib/enums";
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
        entityName: null,
        description: null,
      },
      rules: {
        name: [
          ValidatorUtils.RuleFactory.require("名称不能为空"),
          ValidatorUtils.DEFAULT_RULES.VARIABLE_NAME,
        ],
        entityName: [ValidatorUtils.RuleFactory.require("实体类名称不能为空")],
        // description: [
        //   ValidatorUtils.RuleFactory.require("描述不能为空")
        // ],
      },
      operations: [
        { label: "保存", event: "save", type: "primary", create: true },
      ],
    };
  },
  created() {
    this.data1 = this.$utils.clone(this.value);
  },
  watch: {
    value() {
      this.data1 = this.$utils.clone(this.value);
    },
    "data1.name"() {
      if (this.data1.name) {
        this.data1.name = NamingStrategy.toHungary(this.data1.name);
        this.data1.entityName = NamingStrategy.toPascal(this.data1.name);
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
            this.$Message.warning(`表:${this.data1.name}已经存在！`);
          }
        }
      });
    },
  },
};
</script>