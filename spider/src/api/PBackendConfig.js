import { HttpClient } from "./HttpClient"

class PBackendConfig extends HttpClient {
    constructor() {
        super('PBackendConfig', '/p-backend-config')
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

const pBackendConfig = new PBackendConfig();
export {
    pBackendConfig
}