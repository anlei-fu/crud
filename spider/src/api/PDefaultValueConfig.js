import { HttpClient } from "./HttpClient"

class PDefaultValueConfig extends HttpClient {
    constructor() {
        super('PDefaultValueConfig', '/p-default-value-config')
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

const pDefaultValueConfig = new PDefaultValueConfig();
export {
    pDefaultValueConfig
}