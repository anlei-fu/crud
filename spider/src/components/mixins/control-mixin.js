import ModelMixin from "./model-mixin"
export default {
    mixins: [ModelMixin],
    props: {
        placeHolder: String,
        disabled: Boolean,
        title: String,
        clearable: {
            type: Boolean,
            default: true
        },
        // default is ui-framework default size
        size: String,
        width: {
            type: String|Number,
            default: "100%"
        }
    },
    computed: {
        style() {
            if (this.width == "100%") {
                return {
                    display: "inline-block",
                    width: this.width,
                };
            } else {
                return {
                    display: "inline-block",
                    width: this.width+"px",
                };
            }
        },
    },

}