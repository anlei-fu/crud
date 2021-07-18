<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="120">
    <Row justify="space-between"
      ><Col :span="4">
        <FormItem label="生成用户手册" prop="userInstruction">
          <MyCheckbox v-model="data1.userInstruction" /> </FormItem></Col
      ><Col :span="4">
        <FormItem label="生成设计文档" prop="projectStructure">
          <MyCheckbox v-model="data1.projectStructure" /> </FormItem></Col
      ><Col :span="4">
        <FormItem label="生成表关系图" prop="tableRelation">
          <MyCheckbox v-model="data1.tableRelation" /> </FormItem></Col
      ><Col :span="4">
        <FormItem label="生成ddl文件" prop="sql">
          <MyCheckbox v-model="data1.sql" /> </FormItem
      ></Col>
      <Groupbox title="java">
        <Col :span="4">
          <FormItem label="Junit测试" prop="junitTest">
            <MyCheckbox v-model="data1.junitTest" /> </FormItem
        ></Col>
        <Col :span="4">
          <FormItem label="枚举类" prop="enum">
            <MyCheckbox v-model="data1.enum" /> </FormItem
        ></Col>
        <Col :span="4">
          <FormItem label="枚举常量" prop="constant">
            <MyCheckbox v-model="data1.constant" /> </FormItem></Col
        ><Col :span="4">
          <FormItem label="生成接口测试工具" prop="apiTestFile">
            <MyCheckbox v-model="data1.apiTestFile" /> </FormItem
        ></Col>
      </Groupbox>
      <Groupbox title="js">
        <Col :span="4">
          <FormItem label="js实体类" prop="frontendConstant">
            <MyCheckbox v-model="data1.frontendConstant" /> </FormItem></Col
        ><Col :span="4">
          <FormItem label="js枚举类" prop="frontendConstant">
            <MyCheckbox v-model="data1.frontendConstant" /> </FormItem></Col
        ><Col :span="4">
          <FormItem label="js常量" prop="frontendConstant">
            <MyCheckbox
              v-model="data1.frontendConstant"
            /> </FormItem></Col></Groupbox
    ></Row>

    <OperationPanel @save="submit" :operations="operations" />
  </Form>
</template>
<script>
import ConfigFormMixin from "./../../mixins/config-form-mixin";
import * as utils from "./../../../utils";
export default {
  mixins: [ConfigFormMixin],
  data() {
    return {
      data1: {
        userInstruction: null,
        projectStructure: null,
        tableRelation: null,
        sql: null,
        junitTest: null,
        tableInfo: null,
        enum: null,
        constant: null,
        apiTestFile: null,
        frontendConstant: null,
      },
      rules: {
        userInstruction: [
          {
            required: true,
            message: "生成用户手册不能为空",
          },
        ],
        projectStructure: [
          {
            required: true,
            message: "生成设计文档不能为空",
          },
        ],
        tableRelation: [
          {
            required: true,
            message: "生成表关系图不能为空",
          },
        ],
        sql: [
          {
            required: true,
            message: "生成Sql文件不能为空",
          },
        ],
        junitTest: [
          {
            required: true,
            message: "生成Junit测试不能为空",
          },
        ],
        tableInfo: [
          {
            required: true,
            message: "生成表信息不能为空",
          },
        ],
        enum: [
          {
            required: true,
            message: "生成枚举类不能为空",
          },
        ],
        constant: [
          {
            required: true,
            message: "枚举生成常亮不能为空",
          },
        ],
        apiTestFile: [
          {
            required: true,
            message: "生成接口测试工具不能为空",
          },
        ],
        frontendConstant: [
          {
            required: true,
            message: "前段枚举类生成不能为空",
          },
        ],
      },
    };
  },
};
</script>