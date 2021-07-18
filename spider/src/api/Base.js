import { HttpClient } from "./HttpClient"

class Base extends HttpClient {
    constructor() {
        super('Base', '')
    }

    
}

const base = new Base();
export {
    base
}