<template>
  <MyModal ref="model" @onOk="update" okText="Save" cancelText="Close" title="Column setting" width="30%">
    <div class="container">
      <template v-if="setting_.table.columns.length > 0">
        <MyCheckBoxGroup
          v-model="columns_"
          :options="setting_.table.columns"
          value="slot"
          label="title"
        />
      </template>
    </div>
  </MyModal>
</template>
<script>
  export default {
    model: {
      type: Object,
    },
    props: {
      setting: {
        type: Object,
        default: () => {
          return {
            filters: {
              options: [],
              enabledFilters: [],
            },
            table: {
              allColumns: [],
              columns: [],
            },
          };
        },
      },
    },
    data() {
      return {
        enbaledFilters_: [],
        columns_: [],
        setting_: {},
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.setting_ = this.$utils.clone(this.setting);
        this.setting_.filters = this.setting_.filters || {};
        this.setting_.filters.options = this.setting_.filters.options || [];
        this.enbaledFilters_ = this.setting_.filters.enabledFilters || [];
        this.setting_.table = this.setting_.table || {};
        this.setting_.table.allColumns = this.setting_.table.allColumns || [];
        this.columns_ = this.setting_.table.columns || [];
      },
      show() {
        this.init();
        this.$refs.model.show();
      },
      update() {
        this.$emit("updated", {
          filters: this.enbaledFilters_,
          columns: this.chechedColumns_,
        });
      },
    },
    watch: {
      setting: {
        deep: true,
        handler: function () {
          this.init();
        },
      },
    },
  };
</script>
<style scoped>
  .container {
    width: 90%;
    margin: auto;
  }
</style>
