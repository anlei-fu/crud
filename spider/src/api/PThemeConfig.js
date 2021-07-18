import { HttpClient } from "./HttpClient"

class PThemeConfig extends HttpClient {
    constructor() {
        super('PThemeConfig', '/p-theme-config')
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

const pThemeConfig = new PThemeConfig();
export {
    pThemeConfig
}