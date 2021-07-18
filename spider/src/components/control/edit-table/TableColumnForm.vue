<template>
  <Form ref="form" :model="data1" :rules="rules" :label-width="110">
      <Groupbox title="基础信息">
        <Col :span="5">
          <FormItem label="列名称" title="数据库字段名称" prop="name">
            <MyInput
              v-model="data1.name"
              size="small"
              :maxlength="100"
              placeHolder="请输入列名称"
              width="100%"
            /> </FormItem></Col
        ><Col :span="5">
          <FormItem label="显示标题" title="列表等显示标题" prop="label">
            <MyInput
              v-model="data1.label"
              size="small"
              :maxlength="100"
              placeHolder="请输入标题"
              width="100%"
            /> </FormItem></Col
        ><Col :span="5">
          <FormItem label="数据库类型" title="数据库数据类型" prop="sqlType">
            <MySelect
              v-model="data1.sqlType"
              size="small"
              width="100%"
              dicName="sqlType"
              placeHolder="请选择数据库类型"
            /> </FormItem></Col
        ><Col :span="5">
          <FormItem label="长度" title="长度（字符类型有效）" prop="length">
            <InputNumber
              v-model="data1.length"
              :min="1"
              size="small"
              width="100%"
            /> </FormItem></Col
        ><Col :span="5">
          <FormItem label="实体类字段名称" title="Java实体字段名称（推荐和和数据库一致）" prop="entityFieldName">
            <MyInput
              v-model="data1.entityFieldName"
              size="small"
              :maxlength="100"
              placeHolder="请输入实体字段名称"
              width="100%"
            /> </FormItem></Col
        ><Col :span="5">
          <FormItem label="java类型" title="java类型" prop="javaType">
            <MySelect
              v-model="data1.javaType"
              size="small"
              width="100%"
              :options="javaTypes"
              placeHolder="请选择java类型"
            /> </FormItem></Col
        >
        <Col :span="24">
        <Col :span="2">
          <FormItem label="主键" title="标识是否是主键列，一个表只能有一个主键" prop="isPrimaryKey">
            <MyCheckbox v-model="data1.isPrimaryKey" /> </FormItem></Col
        >
        <Col :span="2">
          <FormItem label="自增" title="标识该列是否自增" prop="isAutoIncrement">
            <MyCheckbox v-model="data1.isAutoIncrement" /> </FormItem
        ></Col>
         <Col v-if="data1.isAutoIncrement" :span="6">
          <FormItem label="自增起始值" title="标识该列是否自增" prop="autoIncrementStart">
            <InputNumber v-model="data1.autoIncrementStart" :min="0" :step="1" /> </FormItem
        ></Col>
        <Col :span="2">
          <FormItem label="可空" title="标识此列是否可空" prop="nullable">
            <MyCheckbox v-model="data1.nullable" /> </FormItem></Col
        >
        <Col :span="6">
          <FormItem label="默认值" title="默认值" prop="defaultValue">
            <MyInput
              v-model="data1.defaultValue"
              size="small"
              :maxlength="100"
              placeHolder="请输入默认值"
              width="100%"
            /> </FormItem></Col
        >
        </Col>
        <Col :span="24">
          <FormItem label="备注" title="列备注信息" prop="description">
            <MyInput
              v-model="data1.description"
              size="small"
              width="100%"
              type="textarea"
              placeHolder="输入此列的描述信息"
              :maxlength="100"
              :rows="3"
            /> </FormItem></Col
        >
      </Groupbox>
	
	<Col   :span="24">
	  <MyCollapse :checkbox="true" v-model="data1.isForeignKey" title="外键">
       <Col :span="24">
       <Alert type="info" 
          >此字段关联的表
          <span slot="desc"
            >只支持关联主表。 <Button size="small" @click="analyzeJoin">自动分析</Button>
          </span></Alert>
         
        </Col
      >
	 <Col :span="5">
        <FormItem label="关联表" title="外键关联表" prop="joinTable">
             <TableSelector
              size="small"
             :excludes="[table]"
        v-model="data1.joinTable"
          /> </FormItem></Col
      ><Col  :span="5">
        <FormItem label="关联列" title="关联表的关联列" prop="relationTableField">
          <TableColumnSelector
           size="small"
          :table="data1.joinTable"
        v-model="data1.relationTableField"
          /> </FormItem></Col
      ><Col :span="5">
        <FormItem label="关联类型"  title="关联类型" prop="relationType">
          <MySelect
            v-model="data1.relationType"
            size="small"
            width="100%"
            dicName="relationType"
            placeHolder="请选择关联类型"
          /> </FormItem></Col
      >
	  </MyCollapse>
	  </Col>
	  <Col :span="24">
	    <MyCollapse  title="额外信息">
      
				
      <Col :span="24">
       <Alert type="info" 
          >字段额外信息
          <span slot="desc"
            >配置了额外信息，查询、添加、数据校验等功能可以自动识别相应配置，减少工作量。 <Button size="small" @click="analyzeExtraInfo(data1)">自动分析</Button>
          </span></Alert>
         
        </Col
      >
      <Col :span="2">
        <FormItem label="名称列"  title="标识此列是否为表名称（枚举相关控件，label值），一个表只能有一个名称列。" prop="isNameField" >
          <MyCheckbox v-model="data1.isNameField" /> </FormItem></Col
      ><Col :span="2">
        <FormItem label="密码字段" title="标识此列是否是密码" prop="isPassword">
          <MyCheckbox v-model="data1.isPassword" /> </FormItem></Col
      ><Col :span="2">
        <FormItem label="创建时间" title="标识此列是否为创建时间" prop="isCreateTime">
          <MyCheckbox v-model="data1.isCreateTime" /> </FormItem></Col
      ><Col :span="2">
        <FormItem label="创建人" title="标识此列是否为创建人" prop="isCreateUser">
          <MyCheckbox v-model="data1.isCreateUser" /> </FormItem></Col
      ><Col :span="2">
        <FormItem label="更新时间" title="标识此列是否为更新时间" prop="isUpdateTime">
          <MyCheckbox v-model="data1.isUpdateTime" /> </FormItem></Col
      ><Col :span="2">
        <FormItem label="更新人" title="标识此列是否为更新人"  prop="isUpdateUser">
         <MyCheckbox v-model="data1.isUpdateUser" /> </FormItem> </FormItem></Col
      ><Col :span="2">
        <FormItem label="列表可排序" title="标识此列列表显示时是否可排序" prop="sortable">
          <MyCheckbox v-model="data1.sortable" /> </FormItem>
		  </Col
      >
     
      <Col :span="2">
        <FormItem label="排序字段" title="标识此列是否为查询sql排序列" prop="isSortField">
          <MyCheckbox v-model="data1.isSortField" /> </FormItem>
		  </Col
      >
         <Col v-if="data1.isSortField" :span="4">
        <FormItem label="排序类型" title="此列默认排序类型" prop="orderByType">
          <MySelect
            v-model="data1.orderByType"
            size="small"
            width="100%"
             dicName="orderByType"
            placeHolder="请选择排序类型" /> </FormItem>
		  </Col
      >
     
	  <Col :span="2">
        <FormItem label="链接地址" title="标识此列是否为链接地址" prop="isLink">
          <MyCheckbox v-model="data1.isLink" /> </FormItem></Col
      ><Col :span="2">
        <FormItem label="图片地址" title="标识此列是否为图片" prop="isEmgUrl">
          <MyCheckbox v-model="data1.isEmgUrl" /> </FormItem></Col
      ><Col :span="2">
        <FormItem label="手机号" title="标识此列是否为手机号" prop="isPhoneNo">
          <MyCheckbox v-model="data1.isPhoneNo" /> </FormItem></Col
      ><Col :span="2">
        <FormItem label="电话号码" title="标识此列是否为电话号码" prop="isTelNo">
          <MyCheckbox v-model="data1.isTelNo" /> </FormItem></Col
      ><Col :span="3">
        <FormItem label="身份证号" title="标识此列是否为身份证号" prop="isIdNo">
          <MyCheckbox v-model="data1.isIdNo" /> </FormItem></Col
      ><Col :span="2">
        <FormItem label="邮政编码" title="标识此列是否为邮政编码" prop="isPostCode">
          <MyCheckbox v-model="data1.isPostCode" /> </FormItem></Col
      ><Col :span="2">
        <FormItem label="邮箱地址" title="标识此列是否为邮箱地址" prop="isEmail">
          <MyCheckbox v-model="data1.isEmail" /> </FormItem></Col
      >
      <Col :span="2">
        <FormItem label="ip地址" title="标识此列是否为ip地址" prop="isIp">
          <MyCheckbox v-model="data1.isIp" /> </FormItem></Col
      >
       <Col :span="2">
        <FormItem label="域名" title="标识此列是否为域名" prop="isDomain">
          <MyCheckbox v-model="data1.isDomain" /> </FormItem></Col
      >
      <Col :span="2">
        <FormItem label="端口" title="标识此列是否为端口" prop="isPort">
          <MyCheckbox v-model="data1.isPort" /> </FormItem></Col
      >
       <Col :span="2">
        <FormItem label="金额" title="标识此列是否为端口" prop="isMoney">
          <MyCheckbox v-model="data1.isMoney" /> </FormItem></Col
      >

       <Col :span="2">
        <FormItem label="不可更改" title="标识此列插入后就不可更改" prop="notEditable">
          <MyCheckbox v-model="data1.notEditable" /> </FormItem></Col
      >
       <Col :span="2">
        <FormItem label="更新条件" title="标识此列为更新where条件" prop="isEditCondition">
          <MyCheckbox v-model="data1.isEditCondition" /> </FormItem></Col
      >
      <Col :span="2">
        <FormItem label="删除条件" title="标识此列为删除where条件" prop="isDeleteCondition">
          <MyCheckbox v-model="data1.isDeleteCondition" /> </FormItem></Col
      >
     <Col v-if="isJavaNumber" :span="4">
        <FormItem label="最小值" title="添加、更新允许的最小值" prop="minValue">
          <InputNumber size="small" v-model="data1.minValue" /> </FormItem></Col
      >
     
      <Col  v-if="isJavaNumber" :span="4">
        <FormItem label="最大值" title="添加、更新允许的最大值" prop="maxValue">
          <InputNumber size="small" v-model="data1.maxValue" /> </FormItem></Col
      >
     
       <Col  v-if="isJavaDate" :span="4">
        <FormItem label="最小时间" title="添加、更新允许的最早时间" prop="minDate">
          <InputNumber size="small" v-model="data1.minDate" /> </FormItem></Col
      >
      <Col  v-if="isJavaDate" :span="4">
        <FormItem label="最大时间" title="添加、更新允许的最大时间" prop="maxDate">
          <InputNumber size="small" v-model="data1.maxDate" /> </FormItem>
          </Col
      >
        <Col :span="6">
        <FormItem label="正则表达式" title="自定义添加、更新校验正则表达式" prop="regex">
          <MyInput size="small"  width="100%" v-model="data1.regex" /> </FormItem></Col
      >
	  </MyCollapse>
	  </Col>
	  <Col :span="24">
	  <MyCollapse  title="列表显示配置">
        <Col :span="24">
        <Alert type="info" 
          >列表显示格式化配置
          <span slot="desc"
            >支持金钱、整数、时间、枚举等。枚举包含一般枚举和表枚举，如未找到需要的枚举，请先在枚举配置添加。 <Button size="small" @click="analyzeFormat(data1)">自动分析</Button>
          </span></Alert>
         
        </Col
      >
	  <Col :span="5">
        <FormItem label="格式化" title="格式化类型" prop="format">
          <MySelect
            v-model="data1.format"
			:options="formatTypes"
            size="small"
            placeHolder="请选择格式化类型"
            width="100%"
          /> </FormItem></Col
      >
	   <Col v-if="data1.format=='date'" :span="12">
	      <FormItem  title="日期格式化字符串，例如yyyy年MM月" label="格式化字符串" prop="pattern">
          <MySelect
            v-model="datePattern"
			:options="Enum.DateFormatPattern"
            size="small"
            placeHolder="请输入日期格式化字符串"
            width="30%"/>
			<MyInput size="small" width="50%" v-model="data1.pattern"/>
			</FormItem>
		  
		  </Col
      >
	  	   <Col v-if="data1.format=='enum'" :span="5">
        <FormItem label="枚举类型" title="枚举类型" prop="pattern">
          <EnumSelector
            v-model="data1.pattern"
            size="small"
          /> </FormItem></Col
      >
	  	   <Col v-if="showDecimal" :span="5">
        <FormItem label="保留小数位数" title="显示保留小数位数" prop="pattern">
          <InputNumber
            v-model="data1.pattern"
            size="small"
            :min="0"
            :step="1"
          /> </FormItem></Col
      >
      <Col v-if="data1.nullable" :span="5">
           <FormItem label="空值显示" title="空值默认显示，不填为'--'" prop="placeHolder">
          <MyInput
            v-model="data1.placeHolder"
            size="small"
          /> </FormItem>
      </Col>
      <Col :span="5">
        <FormItem label="最小宽度" title="列表显示最小宽度" prop="minWidth">
          <InputNumber size="small" v-model="data1.minWidth" /> </FormItem></Col
      >
	  </MyCollapse>
	  </Col>
	  <Col :span="24">
	  <MyCollapse v-if="showAddConfig"  title="添加控件配置">
      <Col :span="24">
        <Alert type="info" 
          >分析添加配置
          <span slot="desc"
            >支持金钱、整数、时间、枚举等。枚举包含一般枚举和表枚举，如未找到需要的枚举，请先在枚举配置添加。 <Button size="small" @click="analyzeAddConfig(data1)">自动分析</Button>
          </span></Alert>
         
        </Col
      >
	  <Col :span="5">
        <FormItem label="控件类型" title="添加对应的控件类型" prop="addControlType">
          <MySelect
            v-model="data1.addControlType"
            size="small"
            width="100%"
            :options="addControlTypes"
            placeHolder="请选择控件类型"
          /> </FormItem></Col
    >
      <Col v-if="showAddControlEnum" :span="5">
        <FormItem label="枚举类型" title="控件所使用的的枚举类型" prop="addControlPattern">
          <EnumSelector
            v-model="data1.addControlPattern"
             size="small"
          /> </FormItem></Col
    >
    <Col v-if="data1.addControlType =='checkbox'" :span="5">
        <FormItem label="二元枚举" title="二元枚举类型" prop="addControlPattern">
          <CheckboxEnumSelector
            v-model="data1.addControlPattern"
            size="small"
          /> </FormItem></Col
    >
      <Col v-if="data1.addControlType =='date'" :span="5">
        <FormItem label="时间控件类型" title="时间字段format类型" prop="addControlPattern">
           <MySelect
            v-model="data1.addControlPattern"
			:options="addDateFormatTypes"
            size="small"
            placeHolder="请选择时间控件类型"
            width="100%"/> </FormItem></Col
    >
     <Col v-if="data1.addControlType =='number'" :span="5">
        <FormItem label="步长" title="数字输入框步长" prop="addControlPattern">
          <InputNumber size="small"  :min="0" v-model="data1.addControlPattern" />  </FormItem></Col
    >
	  </MyCollapse>
	  </Col>
     <Col :span="24">
	  <MyCollapse :checkbox="true" v-model="data1.isQueryField"  title="该字段可查询">
       <Col :span="24">
        <Alert type="info" 
          >分析查询配置
          <span slot="desc"
            >支持金钱、整数、时间、枚举等。枚举包含一般枚举和表枚举，如未找到需要的枚举，请先在枚举配置添加。 <Button size="small" @click="analyzeQueryConfig(data1)">自动分析</Button>
          </span></Alert>
         
        </Col
      >
	  <Col :span="5">
        <FormItem label="控件类型" title="添加对应的控件类型" prop="queryControlType">
          <MySelect
            v-model="data1.queryControlType"
            size="small"
            width="100%"
            dicName="controlType"
            placeHolder="请选择控件类型"
          /> </FormItem></Col
    >
      <Col v-if="showQueryControlEnum" :span="5">
        <FormItem label="枚举类型" title="控件所使用的的枚举类型" prop="queryControlPattern">
          <EnumSelector
            v-model="data1.queryControlPattern"
             size="small"
          /> </FormItem></Col
    >
    <Col v-if="data1.queryControlType=='text'||data1.queryControlType=='textarea'" :span="5">
        <FormItem label="字符串筛选类型" title="控件所使用的的枚举类型" prop="queryControlPattern">
          <MySelect
            v-model="data1.queryControlPattern"
             size="small"
              width="100%"
            dicName="stringMatchRule"
            placeHolder="筛选类型"
          /> </FormItem></Col
    >
    <Col v-if="data1.queryControlType =='checkbox'" :span="5">
        <FormItem label="选择框枚举" title="checkbox枚举类型" prop="queryControlPattern">
          <CheckboxEnumSelector
            v-model="data1.queryControlPattern"
            size="small"
          /> </FormItem></Col
    >
      <Col v-if="data1.queryControlType =='date'" :span="5">
        <FormItem label="时间类型" title="时间字段format类型" prop="queryControlPattern">
           <MySelect
            v-model="data1.queryControlPattern"
			:options="queryDateFormatTypes"
            size="small"
            placeHolder="请选择时间控件类型"
            width="100%"/> </FormItem></Col
    >
    <Col v-if="data1.queryControlType =='numberRange'" :span="5">
        <FormItem label="步长" title="数字输入框步长" prop="queryControlPattern">
          <InputNumber size="small"  :min="0" v-model="data1.queryControlPattern" />  </FormItem></Col
    >
    
	  </MyCollapse>
	  </Col>
	  <Col :span="24">
    <OperationPanel
      @save="save"
      @cancel="cancel"
      @create="save"
      :operations="targetOperations"
    />
	</Col>
  </Form>
</template>
<script>
import EditTableFormMixin from "./mixins/edit-table-form-mixin";
import ValidatorUtils from "./../../../lib/validator-utils";
import FormatAnalyzeMixin from "./../../mixins/format-analyze-mixin";
import ExtraInfoAnalyzeMixin from "./../../mixins/extra-info-analyze-mixin";
import ControlAnalyzeMixin from "./../../mixins/control-analyze-mixin";
import JavaTypeUtils from "./../../../lib/enum/java";
import SqlUtils from "./../../../lib/enum/sql";
import UiUtils from "./../../../lib/enum/web";
import NamingStrategy from "./../../../lib/naming-strategy";
import * as utils from "./../../../utils";
import * as Enum from "./../../../lib/enums";
import typeUtils from "../../../lib/type-utils";
import { mapGetters } from "vuex";
import Api from "./../../../api/index";
import sql from "./../../../lib/enum/sql";
export default {
  mixins: [
    EditTableFormMixin,
    FormatAnalyzeMixin,
    ControlAnalyzeMixin,
    ExtraInfoAnalyzeMixin,
  ],
  props: {
    table: String,
  },
  data() {
    return {
      datePattern: "yyyy-MM-dd",
      data1: {
        name: null,
        label: null,
        sqlType: null,
        length: null,
        entityFieldName: null,
        javaType: null,
        description: null,
        defaultValue: null,
        nullable: null,
        isPrimaryKey: null,
        isAutoIncrement: null,
        autoIncrementStart: null,
        isNameField: null,
        isPassword: null,
        isCreateTime: null,
        isCreateUser: null,
        isUpdateTime: null,
        isUpdateUser: null,
        isSortField: null,
        isForeignKey: null,
        joinTable: null,
        relationTableField: null,
        relationType: null,
        isLink: null,
        isEmgUrl: null,
        isPhoneNo: null,
        isTelNo: null,
        isIdNo: null,
        isPostCode: null,
        isEmail: null,
        isIp: null,
        isDomain: null,
        isPort: null,
        isMoney: null,
        notEditable: null,
        isEditondition: null,
        isDeleteCondition: null,
        orderByType: null,
        isQueryField: null,
        regex: null,
        format: null,
        pattern: null,
        placeHolder: null,
        minWidth: null,
        addControlType: null,
        addControlPattern: null,
        queryControlType: null,
        queryControlPattern: null,
        minValue: null,
        maxValue: null,
      },
      rules: {
        name: [
          ValidatorUtils.RuleFactory.require("列名称不能为空"),
          ValidatorUtils.DEFAULT_RULES.VARIABLE_NAME,
        ],
        label: [ValidatorUtils.RuleFactory.require("标题不能为空")],
        sqlType: [ValidatorUtils.RuleFactory.require("数据库类型不能为空")],
        // length: [ValidatorUtils.RuleFactory.require("长度不能为空")],
        entityFieldName: [
          ValidatorUtils.RuleFactory.require("实体类字段名称不能为空"),
          ValidatorUtils.DEFAULT_RULES.VARIABLE_NAME,
        ],
        javaType: [ValidatorUtils.RuleFactory.require("java类型不能为空")],

        joinTable: [ValidatorUtils.RuleFactory.require("关联表不能为空")],
        relationTableField: [
          ValidatorUtils.RuleFactory.require("关联表字段不能为空"),
        ],
        relationType: [ValidatorUtils.RuleFactory.require("关系类型不能为空")],
      },
    };
  },

  computed: {
    ...mapGetters(["getTableNames", "getPkColumn", "getTableByName"]),
    showAddConfig() {
      return (
        !this.data1.isAutoIncrement &&
        !this.data1.isPrimaryKey &&
        !this.data1.isUpDate &&
        !this.data1.isUpdateTime &&
        !this.data1.isCreateTime &&
        !this.data1.isCreateUser
      );
    },

    showDefaultValue() {
      if (!this.sqlType) return false;
    },

    isJavaNumber() {
      if (!this.data1.javaType) return false;
      return JavaTypeUtils.isJavaNumber(this.data1.javaType);
    },

    stringFilters() {
      return SqlUtils.StringFilters;
    },
    isJavaDate() {
      if (!this.data1.javaType) return false;
      return JavaTypeUtils.isJavaDate(this.data1.javaType);
    },
    showAddControlEnum() {
      if (!this.data1.addControlType) return false;
      return UiUtils.isEnumControl(this.data1.addControlType);
    },
    showQueryControlEnum() {
      if (!this.data1.queryControlType) return false;
      return UiUtils.isEnumControl(this.data1.queryControlType);
    },
    formatTypes() {
      if (!this.data1.javaType) return [];
      return UiUtils.getFormatType(this.data1.javaType, this.data1.name);
    },
    addControlTypes() {
      if (!this.data1.javaType) return [];
      return UiUtils.getAddControlType(
        this.data1.javaType,
        this.data1.entityFieldName
      );
    },
    queryControlTypes() {
      if (!this.data1.javaType) return [];
      return UiUtils.getQueryControlType(
        this.data1.javaType,
        this.data1.entityFieldName
      );
    },
    addDateFormatTypes() {
      return UiUtils.getAddDateFormatType();
    },
    queryDateFormatTypes() {
      return UiUtils.getQueryDateFormatType();
    },
    javaTypes() {
      return SqlUtils.getJavaTypeCandidate(this.data1.sqlType);
    },
    showDecimal() {
      return ["money", "decimal", "percent", "decimal"].includes(
        this.data1.format
      );
    },
  },
  watch: {
    datePattern(val) {
      this.data1.pattern = val;
    },
    "data1.javaType"(val) {
      // if (!val) {
      //   this.data1.format = null;
      //   this.data1.controlType = null;
      //   return;
      // }
    },
    "data1.entityFieldName"() {
      // ExtraInfoProcessor.extraInfoProcessor.call(
      //   this.data1,
      //   this.data1.entityFieldName,
      //   this.data1.javaType
      // );
    },
    "data1.isPrimaryKey"(val) {
      if (val) this.data1.defaultValue = null;
    },
    "data1.isAutoIncrement"(val) {
      if (val) this.data1.defaultValue = null;
    },

    "data1.name"(val) {
      if (!val) {
        this.data1.entityFieldName = null;
        return;
      }
      this.data1.name = NamingStrategy.toHungary(val);
      this.data1.entityFieldName = NamingStrategy.toCamel(val);
    },
    "data1.sqlType"(val) {
      if (!val) {
        this.data1.defaultValue = "";
        return;
      }

      if (!SqlUtils.withLength(val)) {
        this.data1.length = null;
      } else {
        this.data1.length = SqlUtils.getDefaultLength(val);
      }

      if (!sql.canHaveDefaultValue(val)) {
        this.data1.defaultValue = null;
      } else {
        this.data1.defaultValue = SqlUtils.getDefaultValue(val);
      }

      // this.changeJavaType();
    },
    "data1.nullable"(val) {
      if (val) this.data1.placeHolder = "---";
    },
    // "data1.length"(val) {
    //   this.changeJavaType();
    // },
    "data1.format"(val) {
      // this.data1.pattern = null;
      // if (this.val == "date") {
      //   this.datePattern = "yyyy-MM-dd";
      //   this.data1.pattern = "yyyy-MM-dd";
      // } else if (val != "enum") {
      //   this.data1.pattern = 2;
      // }
    },
    "data1.joinTable"(val) {
      if (!val) {
        this.data1.relationTableField = null;
      }
    },
  },
  methods: {
    beforeSave() {
      // length check
      if (SqlUtils.withLength(this.data1.sqlType)) {
        if (!this.data1.length) this.$Message.warning("字符串类型长度不能为空");
        return false;
      } else {
        if (this.data1.length) {
          this.$Message.warning("该数据类型不能指定长度");
          this.data1.length = null;
        }
      }

      // default value check
      if (
        !SqlUtils.canHaveDefaultValue(this.data1.sqlType) &&
        this.data1.defaultValue
      ) {
        this.$Message.warning("该数据类型不能指定默认值");
        this.data1.defaultValue = null;
      }

      // empty string check
      if (!this.data1.nullable) {
        if (this.data1.javaType != "String") {
          if (
            typeUtils.isUndefined(this.data1.defaultValue) ||
            this.data1.defaultValue === ""
          ) {
            if (!this.data1.isPrimaryKey || !this.data1.isAutoIncrement) {
              this.$Message.warning({
                content: "字段不可为空，但未设置默认值！",
                closable: true,
                duration: 10,
              });
            }
          }
        }
      }

      return true;
    },

    async analyzeJoin() {
      let names = this.getTableNames;
      let resp = await Api.spell.find({ words: names, word: this.data1.name });
      if (resp.isSuccess && resp.data.length > 0) {
        let table = this.getTableByName(resp.data[0].name);
        if (table) {
          this.data1.joinTable = `{"$$guid":"${table.baseInfo.$$guid}"}`;

          let pkColumn = this.getPkColumn(resp.data[0].name);
          if (pkColumn) {
            this.data1.relationTableField = pkColumn.$$guid;
          }
          this.data1.relationType = "manyToOne";
        }
      }
    },
  },
};
</script>