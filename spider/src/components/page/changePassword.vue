<template>
  <div class="change-password-wrapper">
    <Form ref="changePasswordForm" :model="changePasswordReq" :rules="rules" :label-width="80">
      <FormItem prop="oldPassword" lable="oldPassword" style="textalign: right;">
        oldPassword
        <Input v-model="changePasswordReq.newPassword" style="width: 300px;" />
      </FormItem>
      <FormItem prop="newPassword" style="textalign: right;">
        New password
        <Input v-model="changePasswordReq.oldPassword" style="width: 300px;" />
      </FormItem>
      <FormItem prop="newPasswordConfirm" style="textalign: right;">
        new password
        <Input v-model="changePasswordReq.newPasswordConfim" style="width: 300px;" />
      </FormItem>
    </Form>
    <Button @click="changePassword">Submit</Button>
  </div>
</template>
<script>
  export default {
    name: "changePassword",
    data: () => {
      return {
        changePasswordReq: {
          oldPassword: "",
          newPassword: "",
          newPasswordConfirm: "",
        },
        rules: {
          oldPassword: [],
          newPassword: [],
          newPasswordConfirm: [],
        },
      };
    },
    methods: {
      changePassword() {},
    },
  };
</script>
<style scoped>
  .change-password-wrapper {
    margin-top: 200px;
  }
  .form-tem-row {
    text-align: right;
  }
</style>
