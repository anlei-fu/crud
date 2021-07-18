import { HttpClient } from "./HttpClient"

class System extends HttpClient {
    constructor() {
        super('System', '/sys')
    }

            /**
         * @description
         * method:post 
         * 
         * @param {Object} params
         * @return {Promise<Object>}
         */
        init(params) {
                return this.post('init', params);
        }

        /**
         * @description
         * method:get 
         * 
         * @param {Object} params
         * @return {Promise<Object>}
         */
        getIds(params) {
                return this.get('ids/{projectId}', params);
        }


}

const system = new System();
export {
    system
}