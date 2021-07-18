<template>
  <div>
    <Center width="90%" style="padding: 5px">
      <Tabs>
        <TabPane label="项目配置"
          ><Center width="85%"
            ><ProjectConfig ref="projectConfig" v-model="projectConfig"
          /></Center>
        </TabPane>
        <TabPane label="后端配置"
          ><Center width="85%"
            ><BackendConfig
              ref="backendConfig"
              v-model="backendConfig" /></Center
        ></TabPane>
        <TabPane label="前端配置"
          ><Center width="85%"
            ><FrontendConfig
              ref="frontendConfig"
              v-model="frontendConfig" /></Center
        ></TabPane>
        <TabPane label="分析配置"
          ><Center width="85%">
            <AnalyzeConfig
              ref="analyzeConfig"
              v-model="analyzeConfig" /></Center
        ></TabPane>
        <TabPane label="默认值配置"
          ><Center width="85%">
            <DefaultValueConfig
              ref="defaultValueConfig"
              v-model="defaultValueConfig" /></Center
        ></TabPane>
        <TabPane label="校验规则">
          <EditTable
            :columns="validateRuleColumns"
            :showCheckbox="false"
            v-model="ruleConfig"
            ref="ruleConfig"
          >
            <template
              slot="edit"
              slot-scope="{ data, index, save, cancel, checkUnique }"
            >
              <ValidateRuleForm
                :data="data"
                :index="index"
                :checkUnique="checkUnique"
                @save="save"
                @cancel="cancel"
              />
            </template>
          </EditTable>
        </TabPane>
        <TabPane label="控件配置">
          <EditTable
            :columns="controlColumns"
            :showCheckbox="false"
            v-model="controlConfig"
            ref="controlConfig"
          >
            <template
              slot="edit"
              slot-scope="{ data, index, save, cancel, checkUnique }"
            >
              <ControlForm
                :data="data"
                :index="index"
                :checkUnique="checkUnique"
                @save="save"
                @cancel="cancel"
              />
            </template>
          </EditTable>
        </TabPane>
        <TabPane label="主题配置"> <GenerateConfigForm :data="{}" /></TabPane>
      </Tabs>
    </Center>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import AutoSaveMixin from "./../../mixins/auto-save-mixin";
import ColumnConfig from "./../../../config/columns";
import JavaUtils from "./../../../lib/enum/java";
export default {
  mixins: [AutoSaveMixin],
  data() {
    return {
      validateRuleColumns: ColumnConfig.VALIDATE_RULE_COLUMNS,
      controlColumns: ColumnConfig.CONTROL_COLUMNS,
      projectConfig: {},
      backendConfig: {},
      frontendConfig: {},
      analyzeConfig: {},
      defaultValueConfig: {},
      ruleConfig: {},
      controlConfig: {},
    };
  },
  mounted() {
    let ids = this.getIds;
    this.bindConfigForm(
      "pProjectConfig",
      "projectConfig",
      ids.projectId,
      ids.projectId,
      "getProjectConfig"
    );
    this.bindConfigForm(
      "pBackendConfig",
      "backendConfig",
      ids.backendConfigId,
      ids.projectId,
      "getBackendConfig"
    );
    this.bindConfigForm(
      "pFrontendConfig",
      "frontendConfig",
      ids.frontendConfigId,
      ids.projectId,
      "getFrontendConfig"
    );
    this.bindConfigForm(
      "pAnalyzeConfig",
      "analyzeConfig",
      ids.analyzeConfigId,
      ids.projectId,
      "getAnalyzeConfig"
    );
    this.bindConfigForm(
      "pDefaultValueConfig",
      "defaultValueConfig",
      ids.defaultValueConfigId,
      ids.projectId,
      "getDefaultValueConfig"
    );
    this.bindConfigForm(
      "pRuleConfig",
      "ruleConfig",
      ids.ruleConfigId,
      ids.projectId,
      "getRuleConfig"
    );
    this.bindConfigForm(
      "pControlConfig",
      "controlConfig",
      ids.controlConfigId,
      ids.projectId,
      "getControlConfig"
    );
  },
  computed: {
    ...mapGetters([
      "getProjectConfig",
      "getBackendConfig",
      "getFrontendConfig",
      "getGenerateConfig",
      "getAnalyzeConfig",
      "getDefaultValueConfig",
      "getRuleConfig",
      "getControlConfig",
      "getIds",
    ]),
  },
  methods: {
    ...mapMutations({
      updateProjectConfig: "updateProjectConfig",
      updateBackendConfig: "updateBackendConfig",
      updateFrontendConfig: "updateFrontendConfig",
      updateGenerateConfig: "updateGenerateConfig",
      updateAnalyzeConfig: "updateAnalyzeConfig",
      updateDictionary: "updateDictionary",
      updateDefaultValueConfig: "updateDefaultValueConfig",
      updateRuleConfig: "updateRuleConfig",
      updateControlConfig: "updateControlConfig",
    }),
  },

  watch: {
    projectConfig: {
      handler() {
        this.updateProjectConfig(this.projectConfig);
        this.updated["pProjectConfig"] = true;
      },
      deep: true,
    },
    backendConfig: {
      handler() {
        this.updateBackendConfig(this.backendConfig);
        this.updated["pBackendConfig"] = true;
        if (this.backendConfig.javaTypes) {
          let dic = this.$utils.makeDictionary(
            this.backendConfig.javaTypes,
            "name",
            "name"
          );
          this.updateDictionary({
            name: "javaType",
            dic: JavaUtils.JavaType.concat(dic),
          });
        }
      },
      deep: true,
    },
    frontendConfig: {
      handler() {
        this.updateFrontendConfig(this.frontendConfig);
        this.updated["pFrontendConfig"] = true;
      },
      deep: true,
    },
    analyzeConfig: {
      handler() {
        this.updateAnalyzeConfig(this.analyzeConfig);
        this.updated["pAnalyzeConfig"] = true;
      },
      deep: true,
    },
    defaultValueConfig: {
      handler() {
        this.updateDefaultValueConfig(this.defaultValueConfig);
        this.updated["pDefaultValueConfig"] = true;
      },
      deep: true,
    },
    ruleConfig: {
      handler() {
        debugger
        this.updateRuleConfig(this.ruleConfig);
        this.updated["pRuleConfig"] = true;
      },
      deep: true,
    },
    controlConfig: {
      handler() {
        this.updateControlConfig(this.controlConfig);
        this.updated["pControlConfig"] = true;
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
._menu_container {
  display: inline-block;
  width: 20%;
  vertical-align: top;
}
._table_container {
  display: inline-block;
  width: 79%;
}
</style>