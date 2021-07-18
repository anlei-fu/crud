import { HttpClient } from "./HttpClient"

class PGenerateConfig extends HttpClient {
    constructor() {
        super('PGenerateConfig', '/p-generate-config')
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

const pGenerateConfig = new PGenerateConfig();
export {
    pGenerateConfig
}