
import Api from "./../../api/index";
export default {
    data() {
        return {
            ready: {},
            updated: {},
            intervals: [],
            destroyHandlers: [],
        }
    },

    created() {
        window.onbeforeunload = () => this.saveDateImmediately();
    },

    beforeDestroy() {
        this.intervals.forEach(interval => {
            clearInterval(interval);
        });

        this.saveDateImmediately()
    },

    /**
     * Update value_ and emit change when pass through validation
     */
    methods: {
        async saveDateImmediately() {
            for (let hadnler of this.destroyHandlers) {
                await hadnler();
            }
        },

        async bind(apiClass, ref, getter, id,projectId, interval = 30 * 1000) {
            let resp = await Api[apiClass].getById({ id });
            if (resp.isSuccess) {
                if (!resp.data) {
                    resp.data = { content: "[]" }
                }

                let data = this.$utils.parseJson(resp.data.content);
               
                this.ready[apiClass] = true;
                if (!this.$refs[ref])
                    return;

                this.$refs[ref].init(data || []);
            }

            let inte = setInterval(async () => {
                if (this.ready[apiClass] && this.updated[apiClass]) {
                    let json = this.$utils.toJson(this[getter])
                    if (json == "{}")
                        return;
                    await Api[apiClass].update({
                        content: json,
                        id,
                        projectId,
                    });

                    // set destroy save immediately
                    this.destroyHandlers.push(() => Api[apiClass].update({
                        content: json,
                        id,
                        projectId,
                    }))

                    this.updated[apiClass] = false;
                }
            }, interval);

            this.intervals.push(inte);
        },

        // 
        async bindConfigForm(apiClass, ref,id,projectId, getter, interval = 30 * 1000) {
           
            let api = Api[apiClass];
            if(!api){
                throw new Error(`${apiClass} not exists`);
            }
            let resp = await Api[apiClass].getById({ id });
            if (resp.isSuccess) {
                if (!resp.data) {
                    resp.data = { content: "{}" }
                }

               
                let data = this.$utils.parseJson(resp.data.content);
                this.ready[apiClass] = true;
                if (!this.$refs[ref]) {
                    return;
                }
                this.$refs[ref].init(data);
            }
            let inte = setInterval(async () => {
                if(apiClass=="pRuleConfig"){
                    debugger
                }

                if (this.ready[apiClass] && this.updated[apiClass]) {
                    let json = this.$utils.toJson(this[getter])
                    if (json == "{}")
                        return;
                      
                    await Api[apiClass].update({
                        content: json,
                        id,
                       projectId,
                    });

                    // set destroy save immediately
                    this.destroyHandlers.push(() => Api[apiClass].update({
                        content: json,
                        id,
                        projectId,
                    }))

                    this.updated[apiClass] = false;
                }
            }, interval);

            this.intervals.push(inte);
        }
    },
}