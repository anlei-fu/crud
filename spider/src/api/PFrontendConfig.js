import { HttpClient } from "./HttpClient"

class PFrontendConfig extends HttpClient {
    constructor() {
        super('PFrontendConfig', '/p-frontend-config')
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

const pFrontendConfig = new PFrontendConfig();
export {
    pFrontendConfig
}