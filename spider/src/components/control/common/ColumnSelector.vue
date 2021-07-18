<template>
  <div>
    <div class="_display"></div>
    <MyModal ref="modal">
      <div class="_checkbox_group_container">
        <MycheckBoxGroup v-model="selectedItems" :items="items" />
      </div>
      <div class="_row_container">
        <Drag v-for="(item, index) in selectedItems" :key="index" :id="index">
          <div>
            {{ item }}
          </div>
        </Drag>
      </div>
    </MyModal>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      defaulr: () => [],
    },
    label: {
      type: String,
      default: "label",
    },
    value: {
      type: String,
      default: "value",
    },
  },
  data() {
    return {
      selectedItems: [],
    };
  },
  methods:{
      show(){
          this.$refs.modal.show();
      }
  }
};
</script>