import { HttpClient } from "./HttpClient"

class PRuleConfig extends HttpClient {
    constructor() {
        super('PRuleConfig', '/p-rule-config')
    }

            /**
         * @description
         * method:put 
         * 
         * @param {Object} params
         * @return {Promise<Object>}
         */
        update(params) {
                return this.put('', params);
        }

        /**
         * @description
         * method:get 
         * 
         * @param {Object} params
         * @return {Promise<Object>}
         */
        getById(params) {
                return this.get('{id}', params);
        }


}

const pRuleConfig = new PRuleConfig();
export {
    pRuleConfig
}