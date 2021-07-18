import { mapGetters, mapMutations } from "vuex";
export default {
    computed: {
        ...mapGetters(
            [
                "showTableEnum",
                "showJoin",
                "showDdlSql",
                "showJavaEntity",
                "showCheckboxEnum",
                "showEnum",
                "showIndex",
                "showTable"
            ]
        ),
    },
    methods: {
        ...mapMutations({
            disableTableEnum: "disableTableEnum",
            disableJoin: "disableJoin",
            disableCheckboxEnum: "disableCheckboxEnum",
            disableDdlSql: "disableDdlSql",
            disableJavaEntity: "disableJavaEntity",
            disableEnum: "disableEnum",
            disableIndex: "disableIndex",
            disableTable: "disableTable",
        })

    },
}