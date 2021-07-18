import * as Enum from "../../../../lib/enums";
export default {
    props: {
        data: {
            type: Object,
            default: () => { }
        },
        // use name property to  generate unique voilation msg
        nameProperty: {
            type: String,
            default: "name"
        },
        // customer unique violation msg generator
        uniqueFailedMsgGenerator: Function,
        index: Number,

        // unique check func ,pass through this property
        checkUnique: Function
    },
    data() {
        return {
            Enum,
            data1: [],
            operations: [
                { label: "取消", event: "cancel", new: true, create: true },
                { label: "保存", event: "save", type: "primary", create: true },
                { label: "新建", event: "create", type: "success", new: true },
            ],
        }
    },
    computed: {
        // change operation buttons by 'create-new' or 'clone'
        targetOperations() {
            return this.data.$$new
                ? this.operations.filter((x) => x.new)
                : this.operations.filter((x) => x.create);
        },
    },

    // init data1 from data
    created() {
        this.data1 = this.$utils.clone(this.data);
    },

    methods: {
        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if(this.beforeSave&&!this.beforeSave()){
                        return;
                    }
                    
                    if (this.checkUnique(this.data1)) {
                        this.$Message.success(`保存成功`);
                        this.$emit("save", this.index, this.data1);
                    } else {
                        let msg = this.uniqueFailedMsgGenerator
                            ? this.uniqueFailedMsgGenerator(this.data1)
                            : `${this.data1[this.nameProperty]}已经存在！`
                        this.$Message.warning(msg);
                    }
                }
            });
        },

        cancel() {
            this.$emit("cancel", this.index);
        },
    },
}