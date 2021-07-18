<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="100">
    <Row justify="space-between"
      ><Col :span="5">
        <FormItem label="枚举名称" prop="name">
          <MyInput
            v-model="data1.name"
            size="small"
            :maxlength="100"
            placeHolder="请输入枚举名称"
            width="100%"
          /> </FormItem></Col
      ><Col :span="5">
        <FormItem label="枚举值" prop="value">
          <MyInput
            v-model="data1.value"
            size="small"
            :maxlength="100"
            placeHolder="请输入枚举值"
            width="100%"
          /> </FormItem></Col
      ><Col :span="5">
        <FormItem label="显示标题" prop="label">
          <MyInput
            v-model="data1.label"
            size="small"
            :maxlength="100"
            placeHolder="请输入显示标题"
            width="100%"
          /> </FormItem></Col
      ><Col :span="4">
        <FormItem label="图标" prop="icon">
          <IconSelector v-model="data1.icon" /> </FormItem></Col
      ><Col :span="5">
        <FormItem label="颜色" prop="color">
          <ColorSelector
            v-model="data1.color"
            size="small"
            :maxlength="100"
            placeHolder="请输入颜色"
            width="100%"
          /> </FormItem
      ></Col>
      <Col :span="24">
        <FormItem label="描述" prop="description">
          <MyInput
            v-model="data1.description"
            size="small"
            :maxlength="100"
            type="textarea"
            placeHolder="请输入描述信息"
            width="100%"
            :rows="3"
          /> </FormItem
      ></Col>
    </Row>
    <OperationPanel
      @save="save"
      @cancel="cancel"
      @create="save"
      :operations="targetOperations"
    />
  </Form>
</template>
<script>
import NamingStrategy from "./../../../lib/naming-strategy";
import EditTableFormMixin from "./mixins/edit-table-form-mixin";
import ValidatorUtils from "./../../../lib/validator-utils";
export default {
  mixins: [EditTableFormMixin],
  data() {
    return {
      data1: {
        name: null,
        label: null,
        value: null,
        icon: null,
        color: null,
        description: null,
      },
      rules: {
        name: [
          ValidatorUtils.RuleFactory.require("枚举名称不能为空"),
          ValidatorUtils.DEFAULT_RULES.VARIABLE_NAME,
        ],
        label: [ValidatorUtils.RuleFactory.require("显示标题不能为空")],
        value: [ValidatorUtils.RuleFactory.require("枚举值不能为空")],
      },
    };
  },
  watch: {
    "data1.name"(val) {
      if (val) {
        this.data1.name = NamingStrategy.toHungary(
          this.data1.name
        ).toUpperCase();
      }
    },
  },
};
</script>