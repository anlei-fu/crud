<template>
  <div class="_add">
    <span @click="add" class="_add_container"
      ><Icon type="ios-add" size="18" /><span style="vertical-align: middle"
        >添加</span
      ></span
    >
    <span @click="remove" class="_add_container"
      ><Icon type="ios-trash-outline" size="18" /><span
        style="vertical-align: middle"
        >删除</span
      ></span
    >
  </div>
</template>
<script>
export default {
  methods: {
    add() {
      this.$emit("add");
    },
    remove() {
      this.$emit("remove");
    },
  },
};
</script>
<style scoped>
._add {
  line-height: 40px;
  background-color: #f7f7f7;
  border-bottom: none;
  padding-left: 30px;
}
._add_container {
  font-weight: 600;
  color: #57acf6;
  margin-right: 10px;
}
._add_container:hover {
  color: #4f9bde;
  cursor: pointer;
}
</style>