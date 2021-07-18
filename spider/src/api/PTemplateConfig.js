import { HttpClient } from "./HttpClient"

class PTemplateConfig extends HttpClient {
    constructor() {
        super('PTemplateConfig', '/p-template-config')
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

const pTemplateConfig = new PTemplateConfig();
export {
    pTemplateConfig
}