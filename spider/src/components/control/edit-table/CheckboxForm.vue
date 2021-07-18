<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="120">
    <Row justify="space-between"
      ><Col :span="6">
        <FormItem
          label="名称"
          title="生成枚举类或常量时使用，符合变量命名规则，具有唯一性"
          prop="name"
        >
          <MyInput
            v-model="data1.name"
            size="small"
            :maxlength="100"
            placeHolder="请输入名称"
            width="100%"
          /> </FormItem></Col
      ><Col :span="6">
        <FormItem label="trueValue" title="选中时的值" prop="trueValue">
          <MyInput
            v-model="data1.trueValue"
            size="small"
            :maxlength="100"
            placeHolder="选中时的值"
            width="100%"
          /> </FormItem></Col
      ><Col :span="6">
        <FormItem
          label="trueValue标题"
          title="trueValue标题"
          prop="trueValueLabel"
        >
          <MyInput
            v-model="data1.trueValueLabel"
            size="small"
            :maxlength="100"
            placeHolder="请输入trueValue显示标题"
            width="100%"
          /> </FormItem></Col
      ><Col :span="6">
        <FormItem
          label="trueValue颜色"
          title="trueValue颜色"
          prop="trueValueColor"
        >
          <ColorSelector v-model="data1.trueValueColor" /> </FormItem
      ></Col>
      <Col :span="6">
        <FormItem
          label="trueValue标题"
          title="trueValue标题"
          prop="trueValueIcon"
        >
          <IconSelector v-model="data1.trueValueIcon" /> </FormItem></Col
      ><Col :span="6">
        <FormItem label="falseValue" title="未选中时的值" prop="falseValue">
          <MyInput
            v-model="data1.falseValue"
            size="small"
            :maxlength="100"
            placeHolder="请输入未选中时的值"
            width="100%"
          /> </FormItem></Col
      ><Col :span="6">
        <FormItem
          label="falseValue标题"
          title="falseValue显示标题"
          prop="falseValueLabel"
        >
          <MyInput
            v-model="data1.falseValueLabel"
            size="small"
            :maxlength="100"
            placeHolder="请输入falseValue显示标题"
            width="100%"
          /> </FormItem></Col
      ><Col :span="6">
        <FormItem
          label="falseValue颜色"
          title="falseValue颜色"
          prop="falseValueColor"
        >
          <ColorSelector v-model="data1.falseValueColor" /> </FormItem></Col
      ><Col :span="6">
        <FormItem
          label="falseValue图标"
          title="trueValue图标"
          prop="falseValueIcon"
        >
          <IconSelector v-model="data1.falseValueIcon" /> </FormItem></Col
      ><Col :span="24">
        <FormItem label="描述" title="请输入描述信息" prop="description">
          <MyInput
            v-model="data1.description"
            size="small"
            width="100%"
            type="textarea"
            placeHolder="请输入描述信息"
            :maxlength="100"
            :rows="3"
          /> </FormItem></Col
    ></Row>
    <OperationPanel
      @save="save"
      @cancel="cancel"
      @create="save"
      :operations="targetOperations"
    />
  </Form>
</template>
<script>
import EditTableFormMixin from "./mixins/edit-table-form-mixin";
import ValidatorUtils from "./../../../lib/validator-utils";
export default {
  mixins: [EditTableFormMixin],
  data() {
    return {
      data1: {
        name: null,
        trueValue: null,
        trueValueLabel: null,
        trueValueColor: null,
        trueValueIcon: null,
        falseValue: null,
        falseValueLabel: null,
        falseValueColor: null,
        falseValueIcon: null,
        description: null,
      },
      rules: {
        name: [
          ValidatorUtils.RuleFactory.require("名称不能为空"),
          ValidatorUtils.DEFAULT_RULES.VARIABLE_NAME,
        ],
        trueValue: [ValidatorUtils.RuleFactory.require("trueValue不能为空")],
        falseValue: [ValidatorUtils.RuleFactory.require("falseValue不能为空")],
        description: [ValidatorUtils.RuleFactory.require("描述不能为空")],
      },
    };
  },
};
</script>