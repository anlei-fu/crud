export class Cache{
     constructor(){
         this._cache=new Map();
     }

    set(key,value,expire){
        this._cache.set(key,value);
        if(expire)
          setTimeout(()=>this._cache.delete(key),expire);
    }
    get(key){
       return this._cache.get(key);
    }
}