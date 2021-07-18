import Vue from 'vue'
import Vuex from 'vuex'
import utils from "./utils"
import TypeUtils from "./lib/type-utils"
import SqlUtils from "./lib/enum/sql"
import UiUtils from "./lib/enum/web"
import JavaUtils from "./lib/enum/java"
import ARRAY from "./lib/array-utils"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        tables: [],
        enums: [],
        tableEnums: [],
        checkboxEnums: [],
        casscaders: [],
        dictionary: {
            sqlType: SqlUtils.SqlType,
            joinType: SqlUtils.JoinType,
            relationType: SqlUtils.RelationType,
            orderByType: SqlUtils.OrderByType,
            dataBaseType: SqlUtils.DataBaseType,
            indexType: SqlUtils.IndexType,
            stringMatchRule: SqlUtils.StringFilters,
            propertyInjection: JavaUtils.ProperInjection,
            jdkVersion: JavaUtils.JdkVersion,
            javaBuildTool: JavaUtils.JavaBuildTool,

            uiFrameWork: UiUtils.UiFramework,
            controlType: UiUtils.ControlType,
            queryContro: UiUtils.getQueryControl(),
            addControl: UiUtils.getAddControl(),
            formatType: UiUtils.FormatType,
            dateFormat: UiUtils.DateFormatPattern,
            alignment: UiUtils.Alignment,
            controlSize: UiUtils.ControlSize,
            fixed: UiUtils.ColumnFixed,
            pageControlAlignment: UiUtils.PageControlAlignment

        },
        noticeConfig: {
            tableEnum: {
                show: true,
                title: "",
                detail: ""
            },
            join: {
                show: true,
                title: "",
                detail: ""
            },
            checkboxEnum: {
                show: true,
                title: "",
                detail: ""
            },
            ddlSql: {
                show: true,
                title: "",
                detail: ""
            },
            javaEntity: {
                show: true,
                title: "",
                detail: ""
            },
            checkBoxEnum: {
                show: true,
                title: "",
                detail: ""
            },
            enum: {
                show: true,
                title: "",
                detail: ""
            },
            index: {
                show: true,
                title: "",
                detail: ""
            },
            table: {
                show: true,
                title: "",
                detail: ""
            }

        },
        globalConfig: {
            projectConfig: {},
            backendConfig: {},
            frontendConfig: {},
            generateConfig: {},
            analyzeConfig: {},
            defaultValueConfig: {},
            ruleConfig: {},
            controlConfig: {},
            confirmConfig: {
                showDeleteTableConfirm: true,
                showDeleteEnumConfirm: true,
                showDeleteTableColumnConfirm: true,
                showDeleteCheckboxEnumConfirm: true,
                showDeleteTableEnumCnfirm: true,
                showDeleteCascaderConfirm: true,
                showNotice: true

            },

        },
        ids: {
            projectId: null,
            tableId: null,
            enumId: null,
            tableEnumId: null,
            checkboxEnumId: null,
            backendConfigId: null,
            frontendConfigId: null,
            analyzeConfigId: null,
            defaultValueConfigId: null,
            ruleConfigId: null,
            controlConfigId: null
        }
    },
    mutations: {

        updateIds(state, ids) {
            state.ids = ids;
        },

        updateDictionary(state, config) {
            state.dictionary[config.name] = config.dic;
        },

        // global config
        updateProjectConfig(state, config) {
            state.globalConfig.projectConfig = config;
        },
        updateBackendConfig(state, config) {
            state.globalConfig.backendConfig = config;
        },
        updateFrontendConfig(state, config) {
            state.globalConfig.frontendConfig = config;
        },
        updateGenerateConfig(state, config) {
            state.globalConfig.generateConfig = config;
        },
        updateAnalyzeConfig(state, config) {
            state.globalConfig.analyzeConfig = config;
        },
        updateDefaultValueConfig(state, config) {
            state.globalConfig.defaultValueConfig = config;
        },
        updateRuleConfig(state, config) {
            state.globalConfig.ruleConfig = config;
        },
        updateControlConfig(state, config) {
            state.globalConfig.controlConfig = config;
        },

        // table
        updateTables(state, tables) {
            state.tables = tables || [];
        },

        // enums
        updateEnums(state, enums) {
            state.enums = enums || [];
        },
        updateTableEnums(state, tableEnums) {
            state.tableEnums = tableEnums || [];

        },
        updateCheckboxEnums(state, checkboxEnums) {
            state.checkboxEnums = checkboxEnums || [];
        },
        updateCasscaders(state, casscaders) {
            state.casscaders = casscaders;
        },

        // notice
        disableTableEnum(state) {
            state.noticeConfig.tableEnum.show = false;
        },
        disableJoin(state) {
            state.noticeConfig.join.show = false;
        },

        disableCheckboxEnum(state) {
            state.noticeConfig.checkBoxEnum.show = false;
        },
        disableDdlSql(state) {
            state.noticeConfig.ddlSql.show = false;
        },
        disableJavaEntity(state) {
            state.noticeConfig.javaEntity.show = false;
        },
        disableEnum(state) {
            state.noticeConfig.enum.show = false;
        },
        disableIndex(state) {
            state.noticeConfig.index.show = false;
        },
        disableTable(state) {
            state.noticeConfig.table.show = false;
        },


    },
    getters: {
        getIds: state => {
            return state.ids;
        },

        getDictionary: state => dicName => {
            return state.dictionary[dicName];
        },

        // global config
        getGlobalConfig: state => {
            return state.globalConfig;
        },
        getProjectConfig: state => {
            return state.globalConfig.projectConfig;
        },
        getBackendConfig: state => {
            return state.globalConfig.backendConfig;
        },
        getFrontendConfig: state => {
            return state.globalConfig.frontendConfig;
        },
        getGenerateConfig: state => {
            return state.globalConfig.generateConfig;
        },
        getAnalyzeConfig: state => {
            return state.globalConfig.analyzeConfig;
        },
        getDefaultValueConfig: state => {
            return state.globalConfig.defaultValueConfig;
        },
        getRuleConfig: state => {
            return state.globalConfig.ruleConfig;
        },
        getControlConfig: state => {
            return state.globalConfig.controlConfig;
        },


        // table config
        getTables: state => {
            return state.tables;
        },
        getTableNames: state => {
            let names = [];
            state.tables.forEach(x => {
                names.push(x.baseInfo.name);
            });

            return names;
        },
        getTableByName: state => table => {
            return ARRAY.firstOrDefault(state.tables.filter(x => x.baseInfo.name == table));
        },
        getPkColumn: state => table => {
            let taregtTable = ARRAY.firstOrDefault(state.tables.filter(x => x.baseInfo.name == table));
            if (!taregtTable)
                return null;

            return ARRAY.firstOrDefault(taregtTable.columns.filter(x => x.isPrimaryKey));
        },
        getNameColumn: state => table => {
            let taregtTable = ARRAY.firstOrDefault(state.tables.filter(x => x.baseInfo.name == table));
            if (!tataregtTableble)
                return null;

            return ARRAY.firstOrDefault(taregtTable.columns.filter(x => x.isNameField));
        },
        getTableColumns: state => table => {
            if (!table)
                return [];

            let obj = utils.parseJson(table);
            let key = "";
            if (TypeUtils.isString(obj)) {
                key = obj;
            } else {
                key = obj.$$guid;
            }


            let targetTables = state.tables.filter(x => x.baseInfo.$$guid == key);
            if (targetTables.length == 0)
                return [];

            return targetTables[0].columns;
        },

        getColumnInfo: state => (table, guid) => {
            if (!table)
                return [];

            let obj = utils.parseJson(table);
            let key = "";
            if (TypeUtils.isString(obj)) {
                key = obj;
            } else {
                key = obj.$$guid;
            }

            let targetTables = state.tables.filter(x => x.baseInfo.$$guid == key);
            if (targetTables.length == 0)
                return [];

            let columns = targetTables[0].columns.filter(x => x.$$guid == guid);
            if (columns.length > 0)
                return columns[0];
        },

        // enums
        getEnums: state => {
            return state.enums;
        },
        getTableEnums: state => {
            return state.tableEnums;
        },
        getCheckboxEnums: state => {
            return state.checkboxEnums;
        },
        getCasscaders: state => {
            return state.casscaders;

        },


        getLabel: state => (key, guid) => {
            if (!key || !guid)
                return [];

            if (key == "table") {
                let items = state.tables.filter(x => x.baseInfo.$$guid == guid);
                if (items.length != 0) {
                    return items[0].baseInfo.name;
                }

                return "";
            } else if (key == "enum") {
                let items = state.enums.filter(x => x.$$guid == guid);
                if (items.length != 0) {
                    return items[0].name;
                }

                return "";
            } else if (key == "column") {
                for (let t of state.tables) {
                    let columns = t.columns.filter(x => x.$$guid == guid);
                    if (columns.length != 0) {
                        return columns[0].name;
                    }
                }

                return "";
            }
        },

        getTableEnum: state => guid => {
            let enums = state.tableEnums.filter(x => x.$$guid == guid);
            if (enums.length > 0)
                return enums[0];

            return null;
        },

        // notice
        showTableEnum: state => {
            return state.globalConfig.confirmConfig.showNotice
                && state.noticeConfig.tableEnum.show;
        },
        showJoin: state => {
            return state.globalConfig.confirmConfig.showNotice
                && state.noticeConfig.join.show;
        },
        showDdlSql: state => {
            return state.globalConfig.confirmConfig.showNotice
                && state.noticeConfig.ddlSql.show;
        },
        showJavaEntity: state => {
            return state.globalConfig.confirmConfig.showNotice
                && state.noticeConfig.javaEntity.show;
        },
        showCheckboxEnum: state => {
            return state.globalConfig.confirmConfig.showNotice
                && state.noticeConfig.checkBoxEnum.show;
        },
        showEnum: state => {
            return state.globalConfig.confirmConfig.showNotice
                && state.noticeConfig.enum.show;
        },
        showIndex: state => {
            return state.globalConfig.confirmConfig.showNotice
                && state.noticeConfig.index.show;
        },
        showTable: state => {
            return state.globalConfig.confirmConfig.showNotice
                && state.noticeConfig.table.show;
        },

    }
})

export default store