<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="120">
    <Row justify="space-between"
      ><Col :span="8">
        <FormItem label="控件名称" prop="name">
          <MyInput
            v-model="data1.name"
            size="small"
            :maxlength="100"
            placeHolder="请输入控件名称"
            width="100%"
          /> </FormItem></Col
      ><Col :span="8">
        <FormItem label="控件类型" prop="controlType">
          <MySelect
            v-model="data1.controlType"
            size="small"
            width="100%"
            :options="Enum.ControlType"
            placeHolder="请选择控件类型"
          /> </FormItem></Col
      ><Col :span="24">
        <FormItem label="控件模板" prop="controlTemplate">
          <MyInput
            v-model="data1.controlTemplate"
            size="small"
            :maxlength="100"
            type="textarea"
            placeHolder="请输入控件模板"
            width="100%"
          /> </FormItem></Col
      ><Col :span="24">
        <FormItem label="描述" prop="description">
          <MyInput
            v-model="data1.description"
            size="small"
            :maxlength="100"
            type="textarea"
            placeHolder="请输入描述"
            width="100%"
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
        controlType: null,
        controlTemplate: null,
        description: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: "控件名称不能为空",
          },
        ],
        controlType: [
          {
            required: true,
            message: "控件类型不能为空",
          },
        ],
        controlTemplate: [
          {
            required: true,
            message: "控件模板不能为空",
          },
        ],
        description: [
          {
            required: true,
            message: "描述不能为空",
          },
        ],
      },
    };
  },
};
</script>