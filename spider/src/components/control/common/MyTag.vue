<template>
  <Tag v-if="show&&show_" closable @on-close="changeShow">
    {{ label }}
  </Tag>
</template>
<script>
export default {
  props: {
    label: String,
    value: Boolean,
    show:Boolean
  },
  data() {
    return {
      show_: false,
    };
  },
  watch: {
    show_(newVal) {
      this.$emit("change", newVal);
    },
    value(newVal) {
      this.show_ = newVal;
    },
  },
};
</script>