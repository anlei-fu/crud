import { HttpClient } from "./HttpClient"

class PCheckboxEnum extends HttpClient {
    constructor() {
        super('PCheckboxEnum', '/p-checkbox-enum')
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

const pCheckboxEnum = new PCheckboxEnum();
export {
    pCheckboxEnum
}