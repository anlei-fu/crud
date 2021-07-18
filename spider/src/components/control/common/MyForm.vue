<template>
  <Row>
    <Form ref="form" :model="query" :rules="rules" :label-width="100">
      <Col v-for="(item, index) in editFields" :key="index" :span="item.span">
        <MySelect
          v-if="item.type == 'select'"
          :options="item.options"
          v-model="editModel[item.editField]"
          :disabled="item.disabled"
          :lable="item.label"
          :placeHolder="item.placeHolder"
        />
        <MyInput
          v-if="item.type == 'input'"
          v-model="editModel[item.editField]"
          :disabled="item.disabled"
          :lable="item.label"
          :placeHolder="item.placeHolder"
        />
        <MyDateTime
          v-if="item.type == 'time'"
          v-model="editModel[item.editField]"
          :disabled="item.disabled"
          :lable="item.label"
          :placeHolder="item.placeHolder"
        />
        <MyInput
          v-if="item.type == 'textArea'"
          v-model="editModel[item.editField]"
          :disabled="item.disabled"
          :lable="item.label"
          :placeHolder="item.placeHolder"
        />
        <MyCheckBox
          v-if="item.type == 'checkBox'"
          v-model="editModel[item.editField]"
          :disabled="item.disabled"
          :lable="item.label"
          :placeHolder="item.placeHolder"
        />
        <MyRadio
          v-if="item.type == 'radio'"
          v-model="editModel[item.editField]"
          :disabled="item.disabled"
          :lable="item.label"
          :placeHolder="item.placeHolder"
        />
        <slot> </slot>
      </Col>
    </Form>
  </Row>
</template>
<script>
import utils from "./../../../common";
export default {
  props: utils.editProps(),
  data() {
    return {};
  },
  watch: {},
};
</script>
<style scoped>
.form-container {
  display: flex;
  flex-wrap: wrap;
}
.form-container > div {
  display: inline-block;
  width: 47%;
}
</style>
