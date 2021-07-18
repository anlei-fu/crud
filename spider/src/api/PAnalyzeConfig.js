import { HttpClient } from "./HttpClient"

class PAnalyzeConfig extends HttpClient {
    constructor() {
        super('PAnalyzeConfig', '/p-analyze-config')
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

const pAnalyzeConfig = new PAnalyzeConfig();
export {
    pAnalyzeConfig
}