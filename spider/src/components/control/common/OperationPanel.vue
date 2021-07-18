<template>
  <div class="_container" :style="{ 'text-align': align }">
    <span>
      <span class="_btn_item" v-for="(item, index) in operations" :key="index">
        <Button
          :size="size"
          :icon="item.icon"
          :type="item.type"
          @click="click(item.event)"
        >
          {{ item.label }}</Button
        >
      </span>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    operations: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: "small",
    },
    align: {
      type: String,
      default: "right",
    },
  },

  methods: {
    click(event) {
      this.$emit(event);
    },
  },
};
</script>
<style scoped>
._container {
  text-align: right;
  /* margin-bottom: 5px; */
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 7px;
}

._btn_item {
  margin-right: 10px;
}
</style>