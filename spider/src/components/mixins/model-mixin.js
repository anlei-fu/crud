export default {
    props: {
        value: String | Number | Array | Boolean | Object,
    },
    model: {
        prop: "value",
        event: "change"
    },
    data() {
        return {
            value_: null,
        };
    },
    created() {
        this.value_ = this.value;
    },
    watch: {
        value_(newVal) {
            this.$emit("change", newVal);
        },
        value(newVal) {
            this.value_ =newVal;
        },
    },
}