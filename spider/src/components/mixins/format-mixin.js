import { mapGetters } from "vuex";
import TypeUtils from "./../../lib/type-utils";
export default {
    computed: {
        ...mapGetters(["getLabel"]),
    },
    methods: {

        format(column, value) {
            if (TypeUtils.isUndefined(value)) return column.placeHolder || "";

            if (TypeUtils.isUndefined(column.format)) return value;

            if (column.format == "array") {
                return this.formatArray(value);
            }

            if (column.format == "table") {
                let item = this.$utils.parseJson(value);
                if (!item) return "";

                let key = TypeUtils.isString(item) ? item : item.$$guid;
                let label = this.getLabel("table", key);
                if (item.alias) {
                    return `${item.alias} (${label})`;
                } else {
                    return label;
                }
            } else if (column.format == "enum") {
                return this.getLabel("enum", value);
            } else if (column.format == "column") {
                return this.getLabel("column", value);
            }
        },
        formatOrderBy(orderBys) {
            let text = "";
            if (!orderBys) return "";

            orderBys.forEach((x) => {
                if (x.customer) {
                    text += x.customerSql + "\n";
                } else {
                    text += `${this.format({ format: "table" }, x.table)}.${this.format(
                        { format: "column" },
                        x.column
                    )} ${x.orderByType} \n`;
                }
            });

            return text.trimRight();
        },

        formatJoins(joins) {
            if (!joins)
                return;

            let text = "";
            joins.forEach(x => {
                text += this.formatJoin(x) + "\n";
            });

            return text.trimRight();
        },

        formatJoin(join) {
            if (join.$$new)
                return "";

            let text = "";
            if (!join) return "";
            text += join.joinType;
            if (join.customer) {
                text += " " + join.customerSql;
            } else {

                let obj1 = this.$utils.parseJson(join.table1);
                let table1Alias = obj1.alias;
                obj1.alias = "";

                let obj2 = this.$utils.parseJson(join.table2);
                let table2Alias = obj2.alias;
                obj2.alias = "";

                text += ` ${this.format({ format: "table" }, this.$utils.toJson(obj2))} ${table2Alias}`
                text += ` on ${table1Alias}.${this.format({ format: "column" }, join.table1Column)}`
                text += ` = ${table2Alias}.${this.format({ format: "column" }, join.table2Column)}`
            }

            return text;
        },

        formatContextColumns(columns) {
            let text = "";
            if (columns) {
                columns.forEach((x) => {
                    text += `${this.format({ format: "table" }, x.table)}.${this.format(
                        { format: "column" },
                        x.column
                    )}\r\n`;
                });
            }
            return text.trimRight();
        }
        ,
        formatColumns(columns) {
            if (!columns) return "";

            let text = "";
            columns.forEach((x) => {
                text += `${this.format({ format: "column" }, x)},`;
            });

            return text.substring(0, text.length - 1);
        },
        formatArray(array) {
            if (!array)
                return "";
            let text = "";
            array.forEach((x, i) => {
                if (i != array.length - 1) {
                    text += `${x},`;
                } else {
                    text += x;
                }
            });

            return text;
        }
    },
}