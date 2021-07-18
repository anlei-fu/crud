
import Api from "../../api/index";
import FormatMixin from "./format-mixin"
import JavaUtils from "./../../lib/enum/java"
import SqlUtils from "./../../lib/enum/sql"
import { mapGetters } from "vuex";
export default {
    mixins: [FormatMixin],
    data() {
        return {
            ready: {},
            updated: {}
        }
    },

    computed: {
        ...mapGetters(["getGlobalConfig", "getLabel"]),
    },
    /**
     * Update value_ and emit change when pass through validation
     */
    methods: {

        renderTableDdlBatch(datas) {
            let models = [];
            datas.forEach(item => {
                models.push(this.getTableDdlConfig(item));
            });

            return Api.render.render({ models, batch: true, templateId: 5 });
        },

        renderTableDdl(data) {
            if (data.columns.length == 0) {
                this.$Message.warning(`${data.baseInfo.name}尚未创建任何列！`);
                return;
            }

            let table = this.getTableDdlConfig(data);
            return Api.render.render({ model: table, templateId: 5 });
        },

        getTableDdlConfig(data) {
            let table = {};
            this.$utils.copyFieldsFrom(table, data.baseInfo, ["name", "description"]);
            table.columns = [];
            table.indexes = [];

            data.columns.forEach(column => {
                let model = {};
                this.$utils.copyFieldsFrom(
                    model,
                    column,
                    [
                        "name",
                        "description",
                        "nullable",
                        "defaultValue",
                        "isAutoIncrement",
                        "sqlType",
                        "length"
                    ]
                );

                // handle length
                if (!SqlUtils.withLength(column.sqlType)) {
                    model.length = null
                }

                if (column.javaType == "String" && model.defaultValue) {
                    model.defaultValue = `'${model.defaultValue}'`
                } else if (!isNaN(model.defaultValue)) {
                    // number with "'" 
                    model.defaultValue = `'${model.defaultValue}'`
                }

                // empty string set "''"
                if (column.javaType == "String" && !column.nullable && !model.defaultValue) {
                    model.defaultValue = "''";
                }

                // default value check
                if (!SqlUtils.canHaveDefaultValue(column.sqlType)) {
                    model.defaultValue = null;
                }

                // pk or auto increment can not set a default value
                if (column.isPrimaryKey || column.isAutoIncrement) {
                    model.defaultValue = null
                }

                // handle null
                if (column.defaultValue == 'null') {
                    column.defaultValue = null
                }

                table.columns.push(model);

                if (column.isPrimaryKey) {
                    table.indexes.push({ type: "primary", columns: [column.name] });
                }
            });

            // handle indexes 
            data.indexes.forEach(index => {
                let columns = [];
                index.columns.forEach(column => {
                    let label = this.format({ format: "column" }, column)
                    columns.push(label);
                });
                table.indexes.push({ name: index.name, columns });
            })

            return table;

        },
        renderJavaEntity(data) {
            let table = {};
            let globalConfig = this.getGlobalConfig;
            this.$utils.copyFieldsFrom(table, data.baseInfo, ["name", "description", "entityName"]);
            table.date = new Date().toLocaleString();
            table.fields = [];

            this.$utils.copyFieldsFrom(
                table,
                globalConfig.projectConfig,
                [
                    "companyId",
                    "companyName",
                    "version",
                    "author",
                    "projectId",
                    "projectName"
                ]
            );

           

            data.columns.forEach(x => {
                let column = {};
                this.$utils.copyFieldsFrom(
                    column,
                    x,
                    [
                        "name",
                        "description",
                        "isPrimaryKey",
                        "entityFieldName",
                        "javaType"
                    ]
                );

                table.fields.push(column);
            });

            return Api.render.render({ model: table, templateId: 6 });
        },
        renderJavaEnum(data) {
            let model = this.getEnumConfig(data);
            return Api.render.render({ model, templateId: 7 });
        },
        renderJavaConst(data) {
            let model = this.getEnumConfig(data);
            return Api.render.render({ model, templateId: 8 });
        },
        renderJsEntity(data) {
            let table = {};
            let globalConfig = this.getGlobalConfig;
            this.$utils.copyFieldsFrom(table, data.baseInfo, ["name", "description", "entityName"]);
            table.fields = [];

            this.$utils.copyFieldsFrom(
                table,
                globalConfig.projectConfig,
                [
                    "companyId",
                    "companyName",
                    "version",
                    "author",
                    "projectId",
                    "projectName"
                ]
            );

            table.date = new Date().toLocaleString();
            data.columns.forEach(x => {
                let column = {};
                this.$utils.copyFieldsFrom(
                    column,
                    x,
                    [
                        "name",
                        "description",
                        "entityFieldName"
                    ]
                );

                if (JavaUtils.isJavaDate(x.javaType)) {
                    column.jsType = "Date"
                } else if (JavaUtils.isJavaNumber(x.javaType)) {
                    column.jsType = "Number"
                } else {
                    column.jsType = "String"
                }

                table.fields.push(column);
            });
            return Api.render.render({ model: table, templateId: 11 });
        },
        renderJsEnum(data) {
            let model = this.getEnumConfig(data);
            return Api.render.render({ model, templateId: 10 });
        },
        renderJsConst(data) {
            let model = this.getEnumConfig(data);
            return Api.render.render({ model, templateId: 9 });
        },

        getEnumConfig(data) {
            let model = {};
            let globalConfig = this.getGlobalConfig;
            this.$utils.copyFieldsFrom(model, data.baseInfo, ["name", "description", "label", "type"]);
            model.date = new Date().toLocaleString();
            model.enums = [];

            this.$utils.copyFieldsFrom(
                model,
                globalConfig.projectConfig,
                [
                    "companyId",
                    "companyName",
                    "version",
                    "author",
                    "projectId",
                    "projectName"
                ]
            );


            data.enums.forEach(x => {
                let item = {};

                this.$utils.copyFieldsFrom(
                    item,
                    x,
                    [
                        "name",
                        "description",
                        "value",
                        "label",
                        "color",
                        "icon"
                    ]
                );

                if (model.type == "String") {
                    item.value = `"${item.value}"`;
                }
                model.enums.push(item);
            });

            return model;
        }
    },

}