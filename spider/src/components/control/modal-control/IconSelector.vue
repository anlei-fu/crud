<template>
  <div>
    <span class="_btn" @click="show">
      <Icon size="18" v-if="value_" :type="value_" />
      <span v-else>无</span>
    </span>
    <MyModal ref="modal" title="选择图标" width="60%" @ok="ok" :noCancel="true">
      <div style="width: 100%; text-align: center">
        <div class="_search_container">
          <span class="_icon_container">
            <Card>
              <div v-if="candidateIcon">
              <div class="_child">
                <Icon :type="candidateIcon" size="25" />
              </div>
              <div class="_child" :title="candidateIcon">
                {{ candidateIcon }}
              </div>
              </div>
              <div v-else>无</div>
            </Card>
          </span>

          <span class="_search"
            ><Input
              v-model="keyword"
              placeholder="输入名称过滤"
              search
              width="90%"
          /></span>
        </div>
        <div class="_icons">
          <MyScroll maxHeight="300px">
            <span
              class="_icon_container"
              v-for="(item, index) in icons"
              :key="index"
              @click="click(item)"
            >
              <Card>
                <div class="_child">
                  <Icon :type="item" size="25" />
                </div>
                <div class="_child" :title="item">
                  {{ item }}
                </div>
              </Card>
            </span>
          </MyScroll>
        </div>
      </div>
    </MyModal>
  </div>
</template>
<script>
import * as IViewIcon from "./../../../lib/icon/iview-icon";
import ModelMixin from "./../../mixins/model-mixin";
export default {
  mixins: [ModelMixin],
  data() {
    return {
      keyword: "",
      candidateIcon: null,
    };
  },
  computed: {
    icons() {
      return this.keyword
        ? IViewIcon.ICON.filter((x) => x.includes(this.keyword))
        : IViewIcon.ICON;
    },
  },
  methods: {
    click(value) {
      this.candidateIcon = value;
    },
    show() {
      this.$refs.modal.show();
    },
    ok() {
      this.value_ = this.candidateIcon;
      this.$refs.modal.close();
    },
  },
};
</script>
<style scoped>
._search_container {
  line-height: 0px;
  border-bottom: 1px solid #e6e6e6;
  padding: 8px 0px;
  margin-bottom: 10px;
  text-align: center;
}
._display_icon {
  color: skyblue;
  font-size: 30px;
  margin: 0px 20px;
}
._search {
  display: inline-block;
  width: 79%;
  vertical-align: middle;
  margin-bottom: 25px;
}

._icons {
  background-color: whitesmoke;
  padding: 11px;
  text-align: center;
}

._icon_container {
  display: inline-block;
  line-height: 28px;
  font-size: 12px;
  width: 121px;
  background-color: white;
  margin: 5px;
  /* padding: 5px; */
  border-radius: 3px;
  text-align: center;
}

._child {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0px 6px;
  transition: all 0.3s ease;
}
._icon_container :hover {
  color: #2DB7F5;
  cursor: pointer;
}
._btn {
  display: block;
  width: 40px;
  /* vertical-align: text-bottom; */
  /* height: 100%; */
  text-align: center;
  -webkit-box-shadow: 0 1px 6px 0 rgb(0 0 0 / 5%);
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 5%);
  border: 1px solid #dcdee2;
  border-radius: 5px;
  padding: 0px;
}
/* .ivu-card-body {
  padding: 0px;
} */
</style>
