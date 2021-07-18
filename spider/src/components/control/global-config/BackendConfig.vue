<template>
  <Form ref="form" :model="model" :rules="rules" :label-width="150">
    <Groupbox title="基础配置">
      <FormItem label="Jdk版本" prop="jdkVersion">
        <MySelect
          v-model="model.jdkVersion"
          size="default"
          dicName="jdkVersion"
          placeHolder="请选择Jdk版本"
          helpText="Jdk版本"
        />
      </FormItem>
      <FormItem label="构建工具" prop="buildTool">
        <MySelect
          v-model="model.buildTool"
          size="default"
          width="100%"
          dicName="javaBuildTool"
          placeHolder="请选择构建工具"
        />
      </FormItem>
      <FormItem label="包前缀" prop="packagePrefix">
        <MyInput
          v-model="model.packagePrefix"
          size="default"
          :maxlength="100"
          placeHolder="请输入包前缀"
          width="100%"
        />
      </FormItem>
    </Groupbox>
    <Groupbox title="Java类型配置">
      <EditTable
        v-model="model.javaTypes"
        :showCheckbox="false"
        :columns="javaTypeColumns"
      >
        <template
          slot="edit"
          slot-scope="{ data, index, save, cancel, checkUnique }"
        >
          <JavaTypeForm
            :data="data"
            :index="index"
            @save="save"
            @cancel="cancel"
            :checkUnique="checkUnique"
          />
        </template>
      </EditTable>
    </Groupbox>
    <Groupbox title="数据库配置">
      <Row>
        <Col :span="12">
          <FormItem label="数据库连接池工具" prop="connetionPoolTool">
            <MySelect
              v-model="model.connetionPoolTool"
              size="default"
              width="100%"
              :options="Enum.ConnetionPoolTool"
              placeHolder="请选择数据库连接池工具"
            /> </FormItem
        ></Col>
        <Col :span="12">
          <FormItem label="数据库地址" prop="dataBaseHost">
            <MyInput
              v-model="model.dataBaseHost"
              size="default"
              :maxlength="100"
              placeHolder="请输入数据库地址"
              width="100%"
            /> </FormItem></Col
        ><Col :span="12">
          <FormItem label="数据库端口" prop="dataBasePort">
            <InputNumber
              style="width: 100%"
              v-model="model.dataBasePort"
              size="default"
              :maxlength="100"
              placeHolder="请输入数据库端口"
            /> </FormItem
        ></Col>
        ><Col :span="12">
          <FormItem label="数据库用户名" prop="dataBaseUser">
            <MyInput
              v-model="model.dataBaseUser"
              size="default"
              :maxlength="100"
              placeHolder="请输入数据库用户名"
              width="100%"
            /> </FormItem></Col
        ><Col :span="12">
          <FormItem label="数据库密码" prop="dataBasePassword">
            <MyInput
              v-model="model.dataBasePassword"
              size="default"
              :maxlength="100"
              placeHolder="请输入数据库密码"
              width="100%"
            /> </FormItem></Col
        ><Col :span="12">
          <FormItem label="数据库" prop="dataBase">
            <MyInput
              v-model="model.dataBase"
              size="default"
              :maxlength="100"
              placeHolder="请输入数据库"
              width="100%"
            /> </FormItem></Col
      ></Row>
    </Groupbox>
    <Groupbox title="三方库配置">
      <Row
        ><Col :span="12">
          <FormItem label="启用Junit" prop="useJUnit">
            <MyCheckbox v-model="model.useJUnit" /> </FormItem></Col
        ><Col v-if="model.useJUnit" :span="12">
          <FormItem label="JUnit版本" prop="jUnitVersion">
            <MySelect
              v-model="model.JUnitVersion"
              size="default"
              width="100%"
              :options="Enum.JuniVersion"
              placeHolder="请选择JUnit版本"
            /> </FormItem></Col></Row
      ><Row
        ><Col :span="12">
          <FormItem label="启用Redis" prop="useRedis">
            <MyCheckbox v-model="model.useRedis" /> </FormItem></Col
        ><Col v-if="model.userRedis" :span="12">
          <FormItem label="Redis连接工具" prop="redisTool">
            <MySelect
              v-model="model.redisTool"
              size="default"
              width="100%"
              :options="Enum.RedisTool"
              placeHolder="请选择Redis连接工具"
            /> </FormItem></Col></Row
      ><Row
        ><Col :span="12">
          <FormItem label="启用Swagger" prop="userSwagger">
            <MyCheckbox v-model="model.userSwagger" /> </FormItem></Col
      ></Row>
    </Groupbox>

    <OperationPanel size="default" @save="submit" :operations="operations" />
  </Form>
</template>
<script>
import ConfigFormMixin from "./../../mixins/config-form-mixin";
import ValidatorUtils from "./../../../lib/validator-utils";
import COLUMNS from "./../../../config/columns";
export default {
  mixins: [ConfigFormMixin],
  data() {
    return {
      javaTypeColumns: COLUMNS.JAVA_TYPE_COLUMNS,
      model: {
        jdkVersion: null,
        springBootVersion: null,
        buildTool: null,
        gradleVersion: null,
        mavenVersion: null,
        packagePrefix: null,
        useJUnit: null,
        jUnitVersion: null,
        useRedis: null,
        redisTool: null,
        userSwagger: null,
        connetionPoolTool: null,
        dataBaseHost: null,
        dataBasePort: null,
        dataBaseUser: null,
        dataBasePassword: null,
        dataBase: null,
        javaTypes: [],
      },
      rules: {
        jdkVersion: [ValidatorUtils.RuleFactory.require("Jdk版本不能为空")],
        springBootVersion: [
          ValidatorUtils.RuleFactory.require("SpringBoot版本不能为空"),
        ],
        buildTool: [ValidatorUtils.RuleFactory.require("构建工具不能为空")],
        gradleVersion: [
          ValidatorUtils.RuleFactory.require("Gradle版本不能为空"),
        ],
        mavenVersion: [ValidatorUtils.RuleFactory.require("Maven版本不能为空")],
        packagePrefix: [
          ValidatorUtils.RuleFactory.require("包前缀不能为空"),
          ValidatorUtils.DEFAULT_RULES.PACKAGE,
        ],
        // useJUnit: [
        //   {
        //     required: true,
        //     message: "启用Junit不能为空",
        //     trigger: "change",
        //   },
        // ],
        // jUnitVersion: [
        //   {
        //     required: true,
        //     message: "JUnit版本不能为空",
        //     trigger: "change",
        //   },
        // ],
        // useRedis: [
        //   {
        //     required: true,
        //     message: "启用Redis不能为空",
        //     trigger: "change",
        //   },
        // ],
        // redisTool: [
        //   {
        //     required: true,
        //     message: "Redis连接工具不能为空",
        //     trigger: "change",
        //   },
        // ],
        // userSwagger: [
        //   {
        //     required: true,
        //     message: "启用Swagger不能为空",
        //     trigger: "change",
        //   },
        // ],
        // connetionPoolTool: [
        //   {
        //     required: true,
        //     message: "数据库连接池工具不能为空",
        //     trigger: "change",
        //   },
        // ],
        dataBaseHost: [
          ValidatorUtils.RuleFactory.require("数据库地址不能为空"),
          ValidatorUtils.DEFAULT_RULES.IP,
        ],
        dataBasePort: [
          ValidatorUtils.RuleFactory.require("数据库端口不能为空"),
          ValidatorUtils.DEFAULT_RULES.PORT,
        ],
        dataBaseUser: [
          ValidatorUtils.RuleFactory.require("数据库用户名不能为空"),
        ],
        dataBasePassword: [
          ValidatorUtils.RuleFactory.require("数据库密码不能为空"),
        ],
        dataBase: [ValidatorUtils.RuleFactory.require("数据库不能为空")],
      },
    };
  },
};
</script>