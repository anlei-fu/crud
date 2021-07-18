import ModelMixin from "./model-mixin"
import * as Enum from "./../../lib/enums";

export default {
    mixins: [ModelMixin],
    data() {
        return {
            Enum,
            // default operation butons config
            operations: [{ label: "保存", type: "primary", event: "save" }],
        }
    },

    /**
     * Update value_ and emit change when pass through validation
     */
    methods: {

        init(value) {
            this.model = this.$utils.clone(value);
            this.value_ = this.$utils.clone(this.model);
        },

        submit() {
             if(this.noValidate){
                 this.submitWithNoValidate();
                 return;
             } 

            this.$refs.form.validate((valid) => {
                // validation passed and if have before save intercepter and pass interceptor
                // beforeSave : model => boolean
                if (valid) {
                    if (this.beforeSave) {
                        if (this.beforeSave(this.model))
                            this.value_ = this.$utils.clone(this.model);
                    } else {
                        this.value_ = this.$utils.clone(this.model);
                        this.$Message.success("保存成功！");
                    }
                }

                // call afterSave if configed
                // afterSave : model => void
                this.afterSave && this.afterSave(this.model);
            });
        },

        submitWithNoValidate(){
            if (this.beforeSave) {
                if (this.beforeSave(this.model))
                    this.value_ = this.$utils.clone(this.model);
            } else {
                this.value_ = this.$utils.clone(this.model);
                this.$Message.success("保存成功！");
            }
        }
    },
}