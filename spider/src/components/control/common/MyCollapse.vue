<template>
  <div class="_collapse_container">
    <div class="_header">
      <span class="_checkbox_container"
        ><MyCheckbox v-if="checkbox" v-model="value_" />
        <span :title="title" class="_title">{{ title }}</span>
      </span>
    </div>
    <div class="_content" v-if="!checkbox || value_">
      <slot />
    </div>
  </div>
</template>
<script>
import ModelMixin from "./../../mixins/model-mixin";
export default {
  mixins: [ModelMixin],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: String,
    checkbox: Boolean,
  },
};
</script>
<style scoped>
._collapse_container {
    /* padding: 27px 10px; */
    padding: 0px;
    padding-bottom: 30px;
}
._header {
  line-height: 40px;
  border-bottom: 1px solid #e8eaec;
  /* margin-bottom: 10px; */
  /* margin-bottom: 31px; */
}
._checkbox_container {
  margin-left: 10px;
  font-size: 18px;
}
._content {
  padding: 10px;
}
._title {
  font-size: 16px;
  font-weight: 500;
  color: #17233d;
}
</style>