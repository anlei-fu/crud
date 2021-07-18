<template>
  <span @contextmenu="contextMenu">
    <slot />
  </span>
</template>
<script>
export default {
  props: {
    id: String,
  },
  methods: {
    contextMenu(ev) {
      ev.preventDefault();
      this.$emit("contextMenu", ev, this.id);
    },
  },
};
</script>