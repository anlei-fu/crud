export class EnumManager {
    constructor() {
        this.enums = new Map();
    }

    getEnum(key) {
        return this.enums.get(key);
    }

    addEnum(key, values) {
        this.enums.set(key, values);
    }

    addEnumValue(key, value) {
        let enums = this.getEnum(key);
        if (!enums){
           enums =[];
           this.enums.set(key,enums);
        }

        let numberValue =parseInt(value.value);
        if(numberValue||numberValue==0)
           value.value=numberValue;
        enums.push(value);
    }
    removeEnumValue(key,value){
        let enums = this.getEnum(key);
        if (enums)
            enums=enums.filter(x=>x.value!=value);
    }
}