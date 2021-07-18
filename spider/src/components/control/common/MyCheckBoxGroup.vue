<template>
  <span>
    <span v-if="title" class="control-title">{{ title }}</span>
    <div v-if="orientation == 'horizontal'" class="container">
      <div v-if="withAll" class="_all" title="select/unselect all">
        <span style="vertical-align:middle;"> <Checkbox v-model="all_">{{ allName }}</Checkbox></span>
      </div>
      <div class="_item_container">
        <template v-for="item in options_">
          <span
            class="check-item-h"
            :style="{ width: labelWidth }"
            :key="item[value]"
            :title="item[label]"
          >
            <Checkbox @on-change="emitChange" v-model="item.checked">
              <Icon v-if="item.icon" :type="item.icon"></Icon>
              {{ item[label] }}
            </Checkbox>
          </span>
        </template>
      </div>
    </div>
    <template v-else>
      <div v-if="withAll">
        <Checkbox class="ckeck-item-v" v-model="all_">{{ allName }}</Checkbox>
      </div>
      <template v-for="item in options_">
        <div class="ckeck-item-v" :key="item[value]">
          <Checkbox @on-change="emitChange" v-model="item.checked">
            <Icon v-if="item.icon" :type="item.icon"></Icon>
            {{ item[label] }}
          </Checkbox>
        </div>
      </template>
    </template>
  </span>
</template>
<script>
export default {
  model: {
    prop: "checkedItems",
    event: "change",
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    checkedItems: {
      type: Array,
      default: () => [],
    },
    allName: {
      type: String,
      default: "All",
    },
    title: {
      type: String,
    },
    label: {
      type: String,
      default: "label",
    },
    value: {
      type: String,
      default: "value",
    },
    cache: {
      type: String,
    },
    orientation: {
      type: String,
      default: "horizontal",
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    withAll:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      options_: [],
      _checkItems: [],
      all_: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // get options ,if cache setted from store or from options
      this.options_ = this.$utils.getCache.call(this, this.cache, this.options);
      this.options_.forEach((option) => {
        option.checked = false;
      });
      this.all_ = false;
      this._checkItems = this.checkedItems;
      this.resetCheckItems();
    },
    /**
     * Reset checked items called by init and prop 'checkcedItems' changed
     */
    resetCheckItems() {
      this._checkItems.forEach((item) => {
        this.options_.forEach((option) => {
          let found = false;
          if (option[this.value] == item) {
            option.checked = true;
            found = true;
            return;
          }
        });
      });
    },
    emitChange() {
      this._checkItems = [];
      this.options_.forEach((option) => {
        if (option.checked) this._checkItems.push(option[this.value]);
      });
      this.$emit("change", this._checkItems);
    },
  },
  watch: {
    options() {
      this.init();
    },
    all_(newVal) {
      this._checkItems = [];
      this.options_.forEach((option) => {
        option.checked = newVal;
      });
      this.emitChange();
    },
    cache() {
      this.init();
    },
    checkItems() {
      this._checkItems = checkedItems;
      this.resetCheckItems();
    },
  },
};
</script>
<style scoped>
.check-item-h {
  margin-right: 5px;
  line-height: 22px;
  width: 75px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.ckeck-item-v {
  line-height: 30px;
}
._item_container {
  margin-top: 10px;
  padding-left: 20px;
}
._all {
  line-height: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8eaec;
  padding-left: 20px;
  vertical-align: middle;
}
</style>
