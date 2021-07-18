<template>
  <div style="text-align: left">
    <Form ref="form" :model="data1" :rules="rules" :label-width="180">
      <Groupbox title="Java代码">
        <Col :span="12">
          <FormItem label="DTO后缀">
            <MyInput v-model="data1.dtoSuffix" /> </FormItem
        ></Col>
        <Col :span="12">
          <FormItem label="VO后缀">
            <MyInput v-model="data1.voSuffix" /> </FormItem
        ></Col>
        <Col :span="12">
          <FormItem label="Controller后缀">
            <MyInput v-model="data1.controllerSuffix" /> </FormItem
        ></Col>
        <Col :span="12">
          <FormItem label="DAO后缀">
            <MyInput v-model="data1.daoSuffix" /> </FormItem
        ></Col>
        <Col :span="12">
          <FormItem label="Service后缀">
            <MyInput v-model="data1.serviceSuffix" /> </FormItem
        ></Col>
        <Col :span="12">
          <FormItem label="ServiceImpl后缀">
            <MyInput v-model="data1.serviceImplSuffix" /> </FormItem
        ></Col>

        <Col :span="12">
          <FormItem label="属性注入方式">
            <MySelect
              dicName="propertyInjection"
              v-model="data1.propertyInjection"
            /> </FormItem
        ></Col>
      </Groupbox>
      <Groupbox title="数据库">
        <FormItem label="默认值">
          <Alert style="text-align: left" type="info" show-icon closable
            >数据库类型默认值配置
            <span slot="desc">
              sql类型可多选，如(int，float)->0,(timestamp)->current_timestamp。注意默认值需满足对应的数据库规则。<a
                target="_Blank"
                href="https://www.twle.cn/c/yufei/mysqlfav/mysqlfav-basic-data-type-default.html"
                >查看更多</a
              >。
            </span></Alert
          >
          <EditTable
            v-model="data1.sqlDefaultValues"
            :columns="sqlDefaultValueColumns"
            :showCheckbox="false"
          >
            <template
              slot="edit"
              slot-scope="{ data, index, save, cancel, checkUnique }"
            >
              <SqlDefaultValueForm
                :data="data"
                :index="index"
                @save="save"
                @cancel="cancel"
                :checkUnique="checkUnique"
              />
            </template>
          </EditTable>
        </FormItem>
        <FormItem label="自增序列起始值">
          <InputNumber v-model="data1.decimalRound" :min="0" :step="1" />
        </FormItem>
      </Groupbox>
      <Groupbox title="列表显示">
        <Row>
          <Col :span="12"
            ><FormItem label="货币后缀">
              <MyInput v-model="data1.moneySuffix" /> </FormItem
          ></Col>
          <Col :span="12"
            ><FormItem label="货币显示颜色">
              <ColorSelector v-model="data1.moneyColor" /> </FormItem></Col
        ></Row>
        <Row>
          <Col :span="12"
            ><FormItem label="标题对齐方式">
              <MySelect
                dicName="alignment"
                v-model="data1.headerAlign"
                :min="0"
                :max="20"
                :step="1"
              />
            </FormItem>
          </Col>
          <Col :span="12"
            ><FormItem label="内容齐方式">
              <MySelect
                dicName="alignment"
                v-model="data1.columnAlign"
              /> </FormItem
          ></Col>
        </Row>
        <Row>
          <Col :span="12"
            ><FormItem label="分页尺寸">
              <MyInput
                :min="1"
                type="textarea"
                v-model="data1.pageSizes"
              /> </FormItem
          ></Col>
          <Col :span="6"
            ><FormItem label="默认分页大小">
              <InputNumber
                :min="1"
                v-model="data1.defaultPageSize"
              /> </FormItem
          ></Col>

          <Col :span="6"
            ><FormItem label="分页控件对齐方式">
              <MySelect
                dicName="pageControlAlignment"
                v-model="data1.pageAlign"
              /> </FormItem
          ></Col>
        </Row>
        <Row>
          <Col :span="6">
            <FormItem label="默认时间格式化串">
              <MyInput v-model="data1.dateFormat" /> </FormItem
          ></Col>
          <Col :span="6">
            <FormItem label="时间控件默认宽度">
              <InputNumber :min="0" v-model="data1.dateWidth" /> </FormItem
          ></Col>
        </Row>
        <Row>
          <Col :span="12"
            ><FormItem label="小数保留位数">
              <InputNumber
                v-model="data1.decimalRound"
                :min="0"
                :max="20"
                :step="1"
              /> </FormItem
          ></Col>
        </Row>
      </Groupbox>
      <Groupbox title="查询控件">
        <Row>
          <Col :span="6">
            <FormItem label="默认时间格式化串">
              <MyInput v-model="data1.dateFormat" /> </FormItem
          ></Col>
          <Col :span="6">
            <FormItem label="时间控件默认宽度">
              <InputNumber :min="0" v-model="data1.dateWidth" /> </FormItem
          ></Col>
          <Col :span="6">
            <FormItem label="默认时间段类型">
              <MyInput v-model="data1.dateRangeFormat" /> </FormItem
          ></Col>

          <Col :span="6">
            <FormItem label="时间段控件默认宽度">
              <InputNumber
                :min="0"
                v-model="data1.dateRangeWidth"
              /> </FormItem></Col
        ></Row>
        <Row>
          <Col :span="12">
            <FormItem label="控件默认尺寸">
              <MySelect
                dicName="controlSize"
                v-model="data1.controlSize"
                :min="0"
                :max="20"
                :step="1"
              /> </FormItem
          ></Col>
        </Row>

        <Col :span="12"
          ><FormItem label="文本框默认宽度">
            <InputNumber :min="0" v-model="data1.textWidth" /> </FormItem
        ></Col>
        <Col :span="12">
          <FormItem label="下拉框默认宽度">
            <InputNumber :min="0" v-model="data1.selectWidth" /> </FormItem
        ></Col>
        <Col :span="12">
          <FormItem label="多选框默认宽度">
            <InputNumber
              :min="0"
              v-model="data1.mutipleSelectWidth"
            /> </FormItem
        ></Col>
          <Col :span="12">
          <FormItem label="单选框默认宽度">
            <InputNumber
              :min="0"
              v-model="data1.radioWidth"
            /> </FormItem
        ></Col>
      </Groupbox>
           <Groupbox title="添加控件">
        <Row>
          <Col :span="6">
            <FormItem label="默认时间格式化串">
              <MyInput v-model="data1.dateFormat" /> </FormItem
          ></Col>
          </Row>
        <Row>
          <Col :span="12">
            <FormItem label="控件默认尺寸">
              <MySelect
                dicName="controlSize"
                v-model="data1.controlSize"
                :min="0"
                :max="20"
                :step="1"
              /> </FormItem
          ></Col>
        </Row>

        <Col :span="12"
          ><FormItem label="多行文本框默认行数">
            <InputNumber :min="0" v-model="data1.multipleTextRows" /> </FormItem
        ></Col>
        
      </Groupbox>
      <OperationPanel size="default" @save="submit" :operations="operations" />
    </Form>
  </div>
</template>
<script>
import ConfigFormMixin from "./../../mixins/config-form-mixin";
import ValidatorUtils from "./../../../lib/validator-utils";
import COLUMNS from "./../../../config/columns";
export default {
  mixins: [ConfigFormMixin],
  data() {
    return {
      sqlDefaultValueColumns: COLUMNS.SQL_DEFAULT_VALUE_COLUMNS,

      data1: {
        dtoSuffix: null,
        voSuffix: null,
        daoSuffix: null,
        controllerSuffix: null,
        serviceSuffix: null,
        serviceImplSuffix: null,
        propertyInjection: null,
        autoIncrementStart: null,
        sqlDefaultValues: [],
        moneySuffix: null,
        moneyColor: null,
        decimalRound: null,
        dateFormat: null,
        dateRangeFormat: null,
      },
      rules: {},
    };
  },

  methods: {
    sumbmit() {
      this.$refs.form.validate((valid) => {});
    },
  },
};
</script>