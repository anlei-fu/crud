<template>
  <span
    :data-m_dragId="id"
    :data_m_dragtype="type"
    :style="{ display: block ? 'block' : 'inline' }"
    :draggable="draggable"
    @dragstart="dragStart"
    @dragover="dragOver"
    @drop="drop"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <slot />
  </span>
</template>
<script>
export default {
  props: {
    id: String | Number,
    block: {
      type: Boolean,
      default: false,
    },
    draggable: {
      type: Boolean,
      default: true,
    },
    type: String,
  },
  methods: {
    dragStart(ev) {
      ev.stopPropagation();
      let id = ev.target.dataset.m_dragid;
      let type = ev.target.dataset.m_dragType;
      ev.dataTransfer.setData("id", id);
      ev.dataTransfer.setData("type", type);
    },
    dragOver(ev) {
      ev.stopPropagation();
      ev.preventDefault();
    },
    drop(ev) {
      ev.preventDefault();
      let params1 = {
        id: ev.dataTransfer.getData("id"),
        type: ev.dataTransfer.getData("type"),
      };
      params1.id = params1.id === "undefined" ? null : params1.id;
      params1.type = params1.type === "undefined" ? null : params1.type;

      if (!params1.id || params1.id === "undefined") return;

      let params2 = {
        id: this.findData(ev.target, "m_dragid"),
        type: this.findData(ev.target, "m_dragtype"),
      };

      params2.id = params2.id === "undefined" ? null : params2.id;
      params2.type = params2.type === "undefined" ? null : params2.type;

      if (!params2.id || params2.id === "undefined") return;

      if (params1.type && params2.type) {
        if (params1.id != params2.id && params1.type != params2.type) {
          this.$emit("change", params1, params2);
        }
      } else {
        if (params1.id != params2.id) this.$emit("change", params1, params2);
      }
    },
    findData(node, key) {
      if (!node) return null;

      if (!node.dataset) return null;

      if (!node.dataset[key]) {
        if (node.parentNode) return this.findData(node.parentNode, key);

        return null;
      }

      return node.dataset[key];
    },
    mouseenter() {
      this.$emit("mouseenter");
    },
    mouseleave() {
      this.$emit("mouseleave");
    },
  },
};
</script>