export default {
    props: {
        options: {
            type: Array,
            default: () => []
        },
        labelField: {
            type: String,
            default: "label"
        },
        valueField: {
            type: String,
            default: "value"
        }
    },
}