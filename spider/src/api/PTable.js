import { HttpClient } from "./HttpClient"

class PTable extends HttpClient {
    constructor() {
        super('PTable', '/p-table')
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

const pTable = new PTable();
export {
    pTable
}