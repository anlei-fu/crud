<template>
  <div style="text-align: left">
    <Form ref="form" v-model="model" :rules="rules" :label-width="150">
      <Groupbox title="基础配置">
        <FormItem label="冗余分析忽略表">
          <MyInput
            v-model="model.redundencyAnalyzeExcludes"
            type="textarea"
            placeHolder="输入需要忽略的表名，','（英文）分割"
          />
        </FormItem>
        <FormItem label="主键名称">
          <Alert style="text-align: left" type="info" show-icon closable
            >主键名称 <span slot="desc"> 后续分析时会使用。 </span></Alert
          >
          <MyInput
            type="textarea"
            v-model="model.primaryKeyMatchSuffix"
            placeHolder="输入主键名称，','（英文）分割"
        /></FormItem>
        <FormItem label="外键识别后缀">
          <Alert style="text-align: left" type="info" show-icon closable
            >外键识别后缀
            <span slot="desc">
              外键自动分析时候会使用,如_id,_uid,_no
            </span></Alert
          >
          <MyInput
            type="textarea"
            v-model="model.foreignKeyMatchSuffix"
            placeHolder="输入外键识别后缀，','（英文）分割"
        /></FormItem>
        <FormItem label="外键识别忽略名称">
          <MyInput
            type="textarea"
            v-model="model.foreignKeyIgnores"
            placeHolder="输入外键忽略名称，','（英文）分割"
        /></FormItem>
        <FormItem label="拼写检查忽略单词">
          <Alert style="text-align: left" type="info" show-icon closable
            >拼写检查忽略单词
            <span slot="desc">
              系统会自动检查单词是否拼写正确，如需忽略此单词，请添加到下面，以逗号分隔。
            </span></Alert
          >
          <MyInput
            type="textarea"
            v-model="model.spellCheckIgnoreWords"
            placeHolder="拼写检查忽略单词，','（英文）分割"
        /></FormItem>
      </Groupbox>
      <Groupbox title="规则配置">
        <FormItem label="Java类型">
          <Alert style="text-align: left" type="info" show-icon closable
            >Java类型自动匹配规则
            <span slot="desc">
              根据sql数据类型和列名称自动匹配对应的java类型，sql类型可多选，长度范围（min,max,只填一个则表示大于此长度），名称后缀以逗号分隔。<br />如float(money,price)
              -> BigDecimal，更多java类型可在全局配置->后端配置增加
            </span></Alert
          >
          <EditTable
            v-model="model.javaTypeAnalyzeConfig"
            :showCheckbox="false"
            :enableCheckUnique="false"
            :columns="javaTypeAutoAnalyzeColumns"
          >
            <template
              slot="edit"
              slot-scope="{ data, index, save, cancel, checkUnique }"
            >
              <JavaTypeAutoAnalyzeForm
                :data="data"
                :index="index"
                @save="save"
                @cancel="cancel"
                :checkUnique="checkUnique"
              />
            </template>
            >
          </EditTable>
        </FormItem>
        <FormItem label="添加控件">
          <Alert style="text-align: left" type="info" show-icon closable
            >添加控件自动匹配规则
            <span slot="desc">
              根据java类型和列名称自动匹配对应的添加控件类型，java类型可多选，名称后缀以逗号分隔。<br />如Integer(status)->下拉框，更多java类型可在全局配置->后端配置增加，更多控件类型可在全局配置->控件配置增加。
            </span></Alert
          >
          <EditTable
            v-model="model.addControlAnalyzeConfig"
            :columns="addControlAutoAnalyzeColumns"
            :enableCheckUnique="false"
            :showCheckbox="false"
          >
            <template
              slot="edit"
              slot-scope="{ data, index, save, cancel, checkUnique }"
            >
              <AddControlAutoAnalyzeForm
                :data="data"
                :index="index"
                @save="save"
                @cancel="cancel"
                :checkUnique="checkUnique"
              />
            </template>
            >
          </EditTable>
        </FormItem>
        <FormItem label="查询控件">
          <Alert style="text-align: left" type="info" show-icon closable
            >查询控件自动匹配规则
            <span slot="desc">
              根据java类型和列名称自动匹配对应的添加控件类型，java类型可多选，名称后缀以逗号分隔。<br />如Integer(status)->下拉框，更多java类型可在全局配置->后端配置增加，更多控件类型可在全局配置->控件配置增加。
            </span></Alert
          >
          <EditTable
            v-model="model.queryControlAnalyzeConfig"
            :showCheckbox="false"
            :enableCheckUnique="false"
            :columns="queryControlAutoAnalyzeColumns"
          >
            <template
              slot="edit"
              slot-scope="{ data, index, save, cancel, checkUnique }"
            >
              <QueryControlAutoAnalyzeForm
                :data="data"
                :index="index"
                @save="save"
                @cancel="cancel"
                :checkUnique="checkUnique"
              />
            </template>
            >
          </EditTable>
        </FormItem>
        <FormItem label="校验规则">
          <Alert style="text-align: left" type="info" show-icon closable
            >校验规则自动匹配规则
            <span slot="desc">
              根据java类型和列名称自动匹配对应的检验规则，java类型可多选，名称后缀以逗号分隔。<br />如String(email)->邮件地址，更多java类型可在全局配置->后端配置增加，更多规则可在全局配置->规则配置增加。
            </span></Alert
          >
          <EditTable
            v-model="model.extraAnalyzeConfig"
            :columns="ruAutoAnalyzeColumns"
            :enableCheckUnique="false"
            :showCheckbox="false"
          >
            <template
              slot="edit"
              slot-scope="{ data, index, save, cancel, checkUnique }"
            >
              <RuleAutoAnalyzeForm
                :data="data"
                :index="index"
                @save="save"
                @cancel="cancel"
                :checkUnique="checkUnique"
              />
            </template>
            >
          </EditTable>
        </FormItem>
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
      noValidate: true,
      addControlAutoAnalyzeColumns: COLUMNS.ADD_CONTROL_AUTO_ANALYZE_COLUMNS,
      queryControlAutoAnalyzeColumns:
        COLUMNS.QUERY_CONTROL_AUTO_ANALYZE_COLUMNS,
      javaTypeAutoAnalyzeColumns: COLUMNS.JAVA_TYPE_AUTO_ANALYZE_COLUMNS,
      ruAutoAnalyzeColumns: COLUMNS.RULE_AUTO_ANALYZE_COLUMN,
      model: {
        redundencyAnalyzeExcludes: null,
        primaryKeySuffix: null,
        foreignKeyMatchSuffix: null,
        addControlAnalyzeConfig: [],
        queryControlAnalyzeConfig: [],
        javaTypeAnalyzeConfig: [],
        codeIntelligence: null,
        cascaderAnalyze: null,
        spellCheckIgnoreWords: null,
        extraAnalyzeConfig: null,
      },
      rules: {},
    };
  },
};
</script>