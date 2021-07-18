<template>
  <div>
    <Tabs type="card">
      <TabPane label="表管理">
        <LeftTab @add="addTable" title="表" ref="leftTab" v-model="tables">
          <template slot="content" slot-scope="{ data, updateMenu }">
            <Center width="95%">
              <Tabs>
                <TabPane label="基础信息">
                  <Left width="70%">
                    <TableForm
                      v-model="data.baseInfo"
                      :updateMenu="updateMenu"
                      :checkUnique="checTableUnique"
                    />
                  </Left>
                </TabPane>
                <TabPane label="列配置">
                  <Alert
                    v-if="showTable"
                    @on-close="disableTable"
                    style="text-align: left"
                    type="info"
                    show-icon
                    closable
                    >列信息配置
                    <span slot="desc"
                      ><p>
                        列名称为<strong>下划线命名法</strong>，输入列名称会自动生成实体类字段名称（<strong>驼峰命名法</strong>，数据库列一致），
                        <a
                          target="_Blank"
                          href="https://www.cnblogs.com/linuxAndMcu/p/11280748.html"
                          >查看命名方法</a
                        >。
                      </p>
                      <p>
                        基础信息为数据库列基本信息，选择数据库数据类型，会自动匹配对应的java类型，字符类型长度不能为空，注意默认值符合<a
                          target="_Blank"
                          href="https://www.twle.cn/c/yufei/mysqlfav/mysqlfav-basic-data-type-default.html"
                          >数据库默认值规则</a
                        >。
                      </p>
                      <p>
                        关联配置，标识此列为外键，只支持关联一个表（推荐关联主表）。
                      </p>
                      <p>
                        额外信息主要配置字段校验规则，推荐配置，减少后续步骤工作量。创建时间、创建人、更新时间、更新人不需要前端传递，可由后端通过用户检验获取，自动识别规则可在全局配置->分析配置修改。
                      </p>
                      <p>
                        列表显示配置，配置列列表查询时的格式化方式，详情查看。
                      </p>
                      <p>添加配置，配置列列表查询时的格式化方式，详情查看。</p>
                      <p>查询配置，配置列列表查询时的格式化方式，详情查看。</p>
                    </span></Alert
                  >
                  <div>
                    <OperationPanel
                      @batchDelete="batchDeleteColumn(data.baseInfo.$$guid)"
                      @clone="
                        showTableColumnClone('clone_' + data.baseInfo.$$guid)
                      "
                      :operations="columnOperations"
                    />
                    <TableCloneColumnSelector
                      :ref="'clone_' + data.baseInfo.$$guid"
                      :table="data.baseInfo.$$guid"
                      @submit="cloneTableColumn"
                    />
                  </div>
                  <EditTable
                    :ref="data.baseInfo.$$guid"
                    :columns="tableColumns"
                    :parentKey="data.baseInfo.$$guid"
                    maxHeight="700px"
                    filterPlaceHolder="输入名称进行过滤"
                    keyProperty="name"
                    :showFilter="true"
                    v-model="data.columns"
                  >
                    <template
                      slot="edit"
                      slot-scope="{
                        data,
                        index,
                        save,
                        parentKey,
                        cancel,
                        checkUnique,
                      }"
                    >
                      <TableColumnForm
                        :data="data"
                        :index="index"
                        @save="save"
                        @cancel="cancel"
                        :table="parentKey"
                        :checkUnique="checkUnique"
                      />
                    </template>
                  </EditTable>
                </TabPane>
                <TabPane label="索引配置">
                  <EditTable
                    :columns="indexColumn"
                    maxHeight="700px"
                    v-model="data.indexes"
                    :keySelector="indexKeySelector"
                    :parentKey="data.baseInfo.$$guid"
                  >
                    <template slot="columns" slot-scope="{ row }">
                      <span
                        v-if="row.columns"
                        :title="formatColumns(row.columns)"
                        >{{ formatColumns(row.columns) }}</span
                      >
                      <span v-else></span>
                    </template>
                    <template
                      slot="edit"
                      slot-scope="{
                        data,
                        index,
                        save,
                        cancel,
                        checkUnique,
                        parentKey,
                      }"
                    >
                      <IndexForm
                        :data="data"
                        :index="index"
                        @save="save"
                        :table="parentKey"
                        @cancel="cancel"
                        :checkUnique="checkUnique"
                      />
                    </template>
                  </EditTable>
                </TabPane>
                <TabPane
                  label="其他"
                  @click="activateDdl(data.baseInfo.$$guid + '_ddl')"
                >
                  <TableCodeViewer :data="data" />
                </TabPane>
              </Tabs>
            </Center>
          </template>
        </LeftTab>
      </TabPane>
      <TabPane label="导入数据"
        ><Left width="70%">
          <ImportDataForm @importTables="importTables" :data="{}" /></Left
      ></TabPane>
      <TabPane label="导出数据"
        ><Left width="70%"> <ExportSqlForm :data="{}" /></Left
      ></TabPane>
    </Tabs>
    <Loading :loading="loading" title="解析数据中" />
  </div>
</template>
<script>
import ARRAY from "./../../../lib/array";
import RANDOM from "./../../../lib/random";
import IdUtils from "./../../../lib/Id-utils";
import FormatMixin from "./../../mixins/format-mixin";
import AutoSaveMixin from "./../../mixins/auto-save-mixin";
import NoticeMixin from "./../../mixins/notice-mixin";
import ExtraInfoAnalyzeMixin from "./../../mixins/extra-info-analyze-mixin";
import ControlAnalyzeMixin from "./../../mixins/control-analyze-mixin";
import FormatAnalyzeMixin from "./../../mixins/format-analyze-mixin";
import { mapMutations, mapGetters } from "vuex";
import ColumnConfig from "./../../../config/columns";
export default {
  mixins: [
    FormatMixin,
    AutoSaveMixin,
    NoticeMixin,
    ExtraInfoAnalyzeMixin,
    ControlAnalyzeMixin,
    FormatAnalyzeMixin,
  ],
  data() {
    return {
      loading: false,
      tables: [],
      indexes: [],
      tableColumns: ColumnConfig.TABLE_COLUMNS,
      indexColumn: ColumnConfig.INDEX_COLUMNS,

      columnOperations: [
        {
          label: "从其他表克隆",
          event: "clone",
        },
        {
          label: "批量删除",
          event: "batchDelete",
          icon: "ios-trash-outline",
          type: "error",
        },
      ],
    };
  },
  mounted() {
    // this.bind("tableInfo", "leftTab", "getTables");
  },
  computed: {
    ...mapGetters(["getTables"]),
  },
  methods: {
    addTable() {
     if(!this.tables){
       this.tables=[];
     }


      let id = RANDOM.guid().substring(0, 10);
      let name = "newtable-" + id;
      this.tables.push({
        baseInfo: {
          name,
          label: "",
          $$guid: RANDOM.guid(),
        },
        columns: [],
      });

      this.$refs.leftTab.updateSelectedMenu(name);
    },

    importTables(tables) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
      let success = 0;
      tables.forEach((x) => {
        if (this.importTable(x)) success++;
      });

      this.$Message.success({
        content: `成功导入了${success}个表`,
        duration: 6,
      });
    },

    importTable(table) {
      table.baseInfo.$$guid = RANDOM.guid();
      let targetTable = ARRAY.firstOrDefault(
        this.tables.filter((x) => x.baseInfo.name == table.baseInfo.name)
      );
      if (targetTable) {
        this.$Message.warning({
          content: `${table.baseInfo.name}已经存在！`,
          duration: 3,
        });
        return;
      }

      table.columns.forEach((column) => {
        this.analyzeAddConfig(column);
        this.analyzeQueryConfig(column);
        this.analyzeFormat(column);
        this.analyzeExtraInfo(column);

        column.$$guid = RANDOM.guid();
      });

      table.indexes.forEach((index) => {
        let columns = [];
        index.columns.forEach((column) => {
          columns.push(
            ARRAY.firstOrDefault(table.columns.filter((x) => x.name == column))
              .$$guid
          );
        });

        index.columns = columns;
        index.$$guid = RANDOM.guid();
      });

      this.tables.push(table);
      this.$refs.leftTab.updateSelectedMenu(table.name);
      return true;
    },

    checTableUnique(name, guid) {
      let tables = this.tables.filter((x) => x.baseInfo.name == name);
      if (tables.length == 0) return true;

      return tables[0].baseInfo.$$guid == guid;
    },

    ...mapMutations({
      updateTables: "updateTables",
    }),

    batchDeleteColumn(guid) {
      this.$refs[guid].batchDelete();
    },

    showTableColumnClone(ref) {
      let targetRef = this.$refs[ref];
      targetRef.show();
    },

    cloneTableColumn(guid, items) {
      this.$refs[guid].cloneColumns(items);
    },

    indexKeySelector(data) {
      if (!data || !data.columns) return "";

      let text = "";
      data.columns.forEach((x) => {
        text += x;
      });

      return text;
    },
  },
  watch: {
    tables: {
      handler() {
        this.updated["tableInfo"] = true;
        this.updateTables(this.tables);
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
._menu_container {
  display: inline-block;
  width: 12%;
  vertical-align: top;
}
._table_container {
  display: inline-block;
}
</style>