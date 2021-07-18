<template>
  <div>
    <Tabs type="card">
      <TabPane label="枚举"
        ><LeftTab ref="leftTab" title="枚举" @add="addEnum" v-model="enums">
          <template slot="content" slot-scope="{ data, updateMenu }">
            <Center width="90%">
              <Tabs>
                <TabPane label="基本信息">
                  <EnumForm
                    v-model="data.baseInfo"
                    :updateMenu="updateMenu"
                    :checkUnique="checkEnumUnique"
                  />
                </TabPane>
                <TabPane label="枚举值"
                  ><div>
                    <OperationPanel
                      @batchDelete="batchDeleteEnum(data.baseInfo.$$guid)"
                      :operations="enumOperations"
                    />
                  </div>
                  <EditTable
                    :columns="enumColumns"
                    v-model="data.enums"
                    :ref="data.baseInfo.$$guid"
                    keyProperty="name"
                  >
                    <template slot="color" slot-scope="{ row }">
                      <span
                        v-if="row.color"
                        :style="{
                          'background-color': row.color,
                          display: 'inline-block',
                          width: '29px',
                          height: '19px',
                          'vertical-align': 'middle',
                        }"
                      ></span>
                      <span v-else></span>
                    </template>
                    <template slot="icon" slot-scope="{ row }">
                      <Icon v-if="row.icon" :type="row.icon" size="16" />
                      <span v-else></span>
                    </template>
                    <template
                      slot="edit"
                      slot-scope="{ data, index, save, cancel, checkUnique }"
                    >
                      <EnumItemForm
                        :data="data"
                        :index="index"
                        @save="save"
                        @cancel="cancel"
                        :checkUnique="checkUnique"
                      />
                    </template> </EditTable
                ></TabPane>
                <TabPane label="代码预览">
                  <EnumViewer :data="data" />
                </TabPane>
              </Tabs>
            </Center>
          </template>
        </LeftTab>
      </TabPane>
      <TabPane label="二元枚举">
        <Alert
          v-if="showCheckboxEnum"
          @on-close="disableCheckboxEnum"
          type="info"
          show-icon
          closable
          >二值枚举配置
          <span slot="desc"
            >用于选择框、开关等控件，如男(1)、女（2），启用(true)、禁用(false)
          </span></Alert
        >
        <EditTable
          ref="checkboxEnum"
          :columns="checkboxColumns"
           :showCheckbox="false"
          v-model="checkboxEnums"
          keyProperty="name"
        >
          <template slot="trueValueColor" slot-scope="{ row }">
            <span
              v-if="row.trueValueColor"
              :style="{
                'background-color': row.trueValueColor,
                display: 'inline-block',
                width: '29px',
                height: '19px',
                'vertical-align': 'middle',
              }"
            ></span>
            <span v-else></span>
          </template>
          <template slot="trueValueIcon" slot-scope="{ row }">
            <Icon
              v-if="row.trueValueIcon"
              :type="row.trueValueIcon"
              size="16"
            />
            <span v-else></span>
          </template>
          <template slot="falseValueColor" slot-scope="{ row }">
            <span
              v-if="row.falseValueColor"
              :style="{
                'background-color': row.falseValueColor,
                display: 'inline-block',
                width: '29px',
                height: '19px',
                'vertical-align': 'middle',
              }"
            ></span>
            <span v-else></span>
          </template>
          <template slot="falseValueIcon" slot-scope="{ row }">
            <Icon
              v-if="row.falseValueIcon"
              :type="row.falseValueIcon"
              size="16"
            />
            <span v-else></span>
          </template>
          <template
            slot="edit"
            slot-scope="{ data, index, save, cancel, checkUnique }"
          >
            <CheckboxForm
              :data="data"
              :index="index"
              @save="save"
              @cancel="cancel"
              :checkUnique="checkUnique"
            />
          </template>
        </EditTable>
      </TabPane>
      <TabPane label="表枚举">
        <Alert
          v-if="showTableEnum"
          @on-close="disableTableEnum"
          type="info"
          show-icon
          closable
          >表枚举
          <span slot="desc"
            >用于下拉框、单选框、多选框等控件，如表student(id,name,age...)，值字段(id)，标题字段(name)，会生成相应的查询sql和controller
          </span></Alert
        >

        <EditTable
          :columns="tableEnumColumns"
          :clonable="false"
          ref="tableEnum"
          keyProperty="name"
          v-model="tableEnums"
        >
          <template slot="orderBys" slot-scope="{ row }">
            <span v-if="row.orderBys" :title="formatOrderBy(row.orderBys)">{{
              formatOrderBy(row.orderBys)
            }}</span>
            <span v-else></span>
          </template>
          <template slot="joins" slot-scope="{ row }">
            <span v-if="row.orderBys" :title="formatJoins(row.joins)">{{
              formatJoins(row.joins)
            }}</span>
            <span v-else></span>
          </template>
          <template slot="filterColumns" slot-scope="{ row }">
            <span
              v-if="row.orderBys"
              :title="formatContextColumns(row.filterColumns)"
              >{{ formatContextColumns(row.filterColumns) }}</span
            >
            <span v-else></span>
          </template>
          <template
            slot="edit"
            slot-scope="{ data, index, save, cancel, checkUnique }"
          >
            <TableEnumForm
              :data="data"
              :index="index"
              :checkUnique="checkUnique"
              @save="save"
              @cancel="cancel"
            />
          </template> </EditTable
      ></TabPane>
     
    </Tabs>
  </div>
</template>
<script>
import RANDOM from "./../../../lib/random";
import FormatMixin from "./../../mixins/format-mixin";
import IdUtils from "./../../../lib/Id-utils";
import { mapMutations, mapGetters } from "vuex";
import NoticeMixin from "./../../mixins/notice-mixin";
import AutoSaveMixin from "./../../mixins/auto-save-mixin";
import ColumnConfig from "./../../../config/columns";
export default {
  mixins: [FormatMixin, AutoSaveMixin, NoticeMixin],
  data() {
    return {
      enums: [],
      checkboxEnums: [],
      tableEnums: [],
      enumColumns: ColumnConfig.ENUM_COLUMNS,
      checkboxColumns: ColumnConfig.CHECKBOX_ENUM_COLUMNS,
      tableEnumColumns: ColumnConfig.TABLE_ENUM_COLUMNS,
      enumOperations: [
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
    this.bind("enumInfo", "leftTab", "getEnums");
    this.bind("checkbox", "checkboxEnum", "getCheckboxEnums");
    this.bind("tableEnum", "tableEnum", "getTableEnums");
  },
  computed: {
    ...mapGetters([
      "getEnums",
      "getTableEnums",
      "getCheckboxEnums",
    ]),
  },
  methods: {
    addEnum() {
      let id = RANDOM.guid().substring(0, 6);
      let name = "newItem_" + id;
      this.enums.unshift({
        baseInfo: {
          name,
          label: null,
          $$guid: RANDOM.guid(),
        },
        enums: [],
      });

      this.$refs.leftTab.updateSelectedMenu(name);
    },
    checkEnumUnique(name, guid) {
      let enums = this.enums.filter((x) => x.baseInfo.name == name);
      if (enums.length == 0) return true;

      return enums[0].baseInfo.$$guid == guid;
    },
    ...mapMutations({
      updateEnums: "updateEnums",
      updateCheckboxEnums: "updateCheckboxEnums",
      updateTableEnums: "updateTableEnums",
      updateCasscaders: "updateCasscaders",
    }),
    batchDeleteEnum(guid) {
      this.$refs[guid].batchDelete();
    },
  },
  watch: {
    enums: {
      handler() {
        this.updated["enumInfo"] = true;
        this.updateEnums(this.enums);
      },
      deep: true,
    },
    checkboxEnums: {
      handler() {
        this.updated["checkbox"] = true;
        this.updateCheckboxEnums(this.checkboxEnums);
      },
      deep: true,
    },
    tableEnums: {
      handler() {
        this.updated["tableEnum"] = true;
        this.updateTableEnums(this.tableEnums);
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
._menu_container {
  display: inline-block;
  width: 20%;
  vertical-align: top;
}
._table_container {
  display: inline-block;
  width: 79%;
}
._enum_name {
  display: inline-block;
}
._enum_label {
  display: inline-block;
}
._enum_description {
}
._enum_container {
  padding-left: 50px;
}
</style>