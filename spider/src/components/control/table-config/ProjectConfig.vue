<template>
  <Form ref="form" :model="model" :rules="rules" :label-width="100">
    <FormItem label="项目名称" prop="projectName">
      <MyInput
        v-model="model.projectName"
        size="default"
        :maxlength="100"
        placeHolder="请输入项目名称"
        width="100%"
      />
    </FormItem>
    <FormItem label="公司名称" prop="companyName">
      <MyInput
        v-model="model.companyName"
        size="default"
        :maxlength="100"
        placeHolder="请输入公司名称"
        width="100%"
      />
    </FormItem>
    <FormItem label="版本" prop="version">
      <MyInput
        v-model="model.version"
        size="default"
        placeHolder="请输入版本"
      />
    </FormItem>
    <FormItem label="作者" prop="author">
      <MyInput
        v-model="model.author"
        size="default"
        :maxlength="100"
        placeHolder="请输入作者"
        width="100%"
      />
    </FormItem>
    <FormItem label="项目描述" prop="description">
      <MyInput
        v-model="model.description"
        size="default"
        width="100%"
        type="textarea"
        placeHolder="请输入项目描述"
        :maxlength="100"
        :rows="3"
      />
    </FormItem>
    <OperationPanel @save="submit" size="default" :operations="operations" />
  </Form>
</template>
<script>
import ConfigFormMixin from "./../../mixins/config-form-mixin";
import ValidatorUtils from "./../../../lib/validator-utils";
export default {
  mixins: [ConfigFormMixin],
  data() {
    return {
      model: {
        projectName: null,
        companyName: null,
        description: null,
        version: null,
        author: null,
      },
      rules: {
        projectName: [ValidatorUtils.RuleFactory.require("项目名称不能为空")],
        companyName: [ValidatorUtils.RuleFactory.require("公司名称不能为空")],
        description: [ValidatorUtils.RuleFactory.require("项目描述不能为空")],
        version: [ValidatorUtils.RuleFactory.require("版本不能为空")],
        author: [ValidatorUtils.RuleFactory.require("作者不能为空")],
      },
    };
  },
};
</script>