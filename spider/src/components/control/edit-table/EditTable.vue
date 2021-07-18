<template>
  <div class="_container">
    <div class="_header_row">
      <span v-if="showCheckbox" class="_checkbox"
        ><MyCheckbox v-model="checkAll"
      /></span>
      <span
        v-for="(column, headerKey) of showingColumns"
        :key="headerKey"
        class="_column _header"
        :style="{ width: column.width || '100px' }"
        :title="column.description || column.title"
      >
        {{ column.title }}
      </span>
      <span class="_btn" v-if="showFilter">
        <Input
          v-model="keyword"
          search
          size="small"
          :placeholder="filterPlaceHolder"
        />
      </span>
    </div>
    <div>
      <MyScroll :maxHeight="maxHeight">
        <div class="_body_container">
          <Drag
            :draggable="draggable"
            v-for="(item, index) of showingTempData"
            :key="index"
            :id="index"
            :block="true"
            @change="changePos"
            :class="
              !item.$$edit
                ? '_display_row_container'
                : '_display_row_container_edit'
            "
          >
            <div class="_display_row">
              <span v-if="showCheckbox" class="_checkbox"
                ><MyCheckbox v-model="item.$$checked"
              /></span>
              <span
                class="_column"
                v-for="(column, i) of showingColumns"
                :key="i"
                :style="{ width: column.width || '100px' }"
              >
                <slot :name="column.field" :index="index" :row="item">
                  <!-- <PlainText :value="item[column.field] || ''" /> -->
                  <span :title="format(column, item[column.field])">
                    {{ format(column, item[column.field]) }}</span
                  >
                </slot>
              </span>
              <span class="_btn"
                ><Link
                  v-if="!anyEdit && editable"
                  size="small"
                  @click="item.$$edit = true"
                  label="编辑"
                />
                <Link
                  v-if="!anyEdit && !item.$$new && clonable"
                  size="small"
                  @click="clone(item)"
                  label="克隆"
                />
                <Link
                  v-if="!item.$$edit && !item.$$new"
                  size="small"
                  label="删除"
                  @click="remove(item.$$guid, index)"
                />
              </span>
            </div>
            <!-- <transition name="slide"> -->
            <div v-if="item.$$edit" class="_edit_row">
              <MyScroll :maxHeight="editMaxHeight">
                <slot
                  name="edit"
                  :data="item"
                  :index="index"
                  :save="save"
                  :cancel="cancel"
                  :context="context"
                  :parentKey="parentKey"
                  :checkUnique="checkUnique"
                />
              </MyScroll>
            </div>
            <!-- </transition> -->
          </Drag>
          <div class="_add">
            <span
              @click="addRow"
              :class="{ _add_container: !anyEdit, _add_disable: anyEdit }"
            >
              <span v-if="temData.length == 0" style="color: #515a6e"
                >暂无数据</span
              >
              <Icon type="ios-add" size="18" /><span
                style="vertical-align: middle"
              >
                添加</span
              ></span
            >
          </div>
        </div>
      </MyScroll>
    </div>
  </div>
</template>
<script>
import ARRAY from "./../../../lib/array";
import RANDOM from "./../../../lib/random";
import IdUtils from "./../../../lib/Id-utils";
import random from "./../../../lib/random";
import FormatMixin from "./../../mixins/format-mixin";
export default {
  model: {
    prop: "data",
    event: "change",
  },
  mixins: [FormatMixin],
  props: {
    // context
    context: Object,
    // parent key
    parentKey: String,
    // column config
    columns: {
      type: Array,
      default: () => [],
    },
    // v-model property
    data: {
      type: Array,
      default: () => [],
    },
    // scroll max height
    maxHeight: {
      type: String,
      // default: "300px",
    },
    // edit container max height
    editMaxHeight: {
      type: String,
      // default: "300px",
    },
    // search box place holder
    filterPlaceHolder: String,
    // enbale filter
    showFilter: {
      type: Boolean,
      default: false,
    },
    // with check box column
    showCheckbox: {
      type: Boolean,
      default: true,
    },
    msgText: String,
    // pk column
    keyProperty: String,
    // to check unique
    keySelector: Function,
    saveInterceptor: Function,
    removeInterceptor: Function,
    // clone excludes fields
    cloneExcludesField: Array,
    editable: {
      type: Boolean,
      default: true,
    },
    clonable: {
      type: Boolean,
      default: true,
    },
    draggable: {
      type: Boolean,
      default: true,
    },
    enableCheckUnique: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // check all field
      checkAll: false,
      // template data
      temData: [],
      // search keyword
      keyword: "",
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    // display columns
    showingColumns() {
      return this.columns.filter((x) => x.show);
    },
    // showing data
    showingTempData() {
      if (!this.keyword || !this.keyword.trim() || !this.keyProperty)
        return this.temData;

      return this.temData.filter((x) =>
        x[this.keyProperty].includes(this.keyword)
      );
    },
    // any row is editing
    anyEdit() {
      return this.showingTempData.filter((x) => x.$$edit).length > 0;
    },
  },

  watch: {
    // select all changed
    checkAll(val) {
      this.temData.forEach((x) => (x.$$checked = val));
    },

    temData: {
      handler() {
        this.$emit("change", this.temData);
      },
      deep: true,
    },
  },
  methods: {
    init(data) {
      data = data || this.data||[];
      if (!data) return;
      this.temData = [];
      if(!data.forEach)
         return;

      data.forEach((item, i) => {
        this.temData.push({});
        // set defualt checked status
        this.$set(this.temData[i], "$$checked", false);
        // set default edit status
        this.$set(this.temData[i], "$$edit", false);
        // set new property
        this.$set(this.temData[i], "$$new", false);
        // clone property
        this.columns.forEach((column) => {
          this.$set(
            this.temData[i],
            column.field,
            this.$utils.clone(item[column.field])
          );
        });
      });
    },
    // change row position
    changePos(params1, params2) {
      let targetData = this.temData.splice(params1.id, 1);
      this.temData.splice(params2.id, 0, targetData[0]);
    },
    clone(row) {
      this.addRow(row);
    },
    addRow(row = {}, isNew = true) {
      // not allow editting tow more rows at once
      if (this.anyEdit) return;

      this.temData.push({});
      this.columns.forEach((column) => {
        // clone field
        let defaultValue =
          this.cloneExcludesField &&
          this.cloneExcludesField.includes.includes(column.field)
            ? null
            : row[column.field]
            ? this.$utils.clone(row[column.field])
            : column.defaultValue;

        this.$set(
          this.temData[this.temData.length - 1],
          column.field,
          defaultValue
        );
      });
      // set guid
      this.temData[this.temData.length - 1].$$guid = RANDOM.guid();
      if (isNew) {
        // set editting
        this.$set(this.temData[this.temData.length - 1], "$$edit", true);
        // set default checked status
        this.$set(this.temData[this.temData.length - 1], "$$checked", false);
        // set new property
        this.$set(this.temData[this.temData.length - 1], "$$new", true);
      } else {
        this.$set(this.temData[this.temData.length - 1], "$$edit", false);
        // set default checked status
        this.$set(this.temData[this.temData.length - 1], "$$checked", false);
        // set new property
        this.$set(this.temData[this.temData.length - 1], "$$new", false);
      }
    },
    remove(guid, index) {
      if (this.removeInterceptor && !this.removeInterceptor(guid, index)) {
        return;
      }
      if (guid) {
        this.temData = this.temData.filter((x) => x.$$guid != guid);
      } else if (this.keyword) {
        this.$Message.warning("筛选状态下无法进行删除！");
      } else {
        this.temData.splice(index, 1);
      }
    },
    save(index, data) {
      if (this.saveInterceptor && !this.saveInterceptor(data)) return;

      this.$utils.copyFieldsFrom(this.showingTempData[index], data);
      if (this.temData[index].$$new) {
        this.$set(this.showingTempData[index], "$$new", false);
      }
      this.$set(this.showingTempData[index], "$$edit", false);
    },
    cancel(index) {
      if (this.temData[index].$$new) {
        this.temData.splice(index, 1);
      } else {
        this.showingTempData[index].$$edit = false;
      }
    },

    // use a key generator to check unique,default key generator is x=>x[keyProperty]
    checkUnique(data) {
      if (!this.enableCheckUnique) return true;

      let keySelector = this.keySelector || ((x) => x[this.keyProperty]);
      let key = keySelector(data);
      let items = this.temData.filter((x) => keySelector(x) == key);
      if (items.length == 0) return true;

      return items[0].$$guid == data.$$guid;
    },
    cloneColumns(items) {
      if (items) {
        items.forEach((x) => {
          let msg = this.msgText || x[this.keyProperty];
          if (!this.checkUnique(x)) {
            this.$Message.warning(`${msg}已存在`);
            return;
          } else {
            this.$Message.success(`${msg}已复制`);
          }
          this.addRow(x, false);
        });
      }
    },

    batchDelete() {
      let items = this.temData.filter((x) => x.$$checked);
      if (items.length == 0) {
        this.$Message.info("未选择任何一条数据！");
        return;
      }

      this.$utils.showComfirm.call(
        this,
        "批量删除",
        `确认删除这${items.length}条数据吗？`,
        () => {
          this.temData = this.temData.filter((x) => !x.$$checked);
        }
      );
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
._container {
  border: solid 1px #d8d8d8;
  text-align: left;
}
._body_container {
  transition: 0.5s;
}
._header {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 700;
}
._header_row {
  line-height: 40px;
  border-bottom: solid 1px #d8d8d8;
  background-color: #d8d6d5;
}
._header_column {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0px 10px;
}
._column {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0px 10px;
}
._table_container {
  display: inline-block;
}

._checkbox {
  margin-left: 19px;
  display: inline-block;
  width: 25px;
}
._display_row {
  line-height: 35px;
  border-bottom: solid 1px #d8d8d8;
  transition: 0.3s;
}

._display_row_container_edit {
  background-color: #f2f2f2;
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 5%);
}

._display_row_container:hover {
  background-color: #f2f2f2;
}
._edit_row {
  background-color: #f8f8f9;
  border-bottom: solid 1px #d8d8d8;
  /* padding: 10px 35px; */
  padding-top: 10px;
  padding-left: 25px;
  padding-right: 15px;
}
._display_content {
  display: inline-block;
  width: 77%;
}
._btn_container {
  display: inline-block;
  width: 10%;
  vertical-align: middle;
}
._btn {
  float: right;
  margin-right: 20px;
}
._add {
  line-height: 40px;
  margin: 2px;
  text-align: center;
  background-color: #f8f8f9;
}
._add_disable {
  color: #c5c8ce;
  cursor: not-allowed;
}
._add_container {
  color: #2440b3;
}
._add_container:hover {
  color: #31a0fd;
  cursor: pointer;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter,
.slide-leave-to {
  height: 0;
}
</style>
