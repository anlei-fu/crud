class EventEmitter{
    constructor(){
        this.events={};
    }

    subscribe(event,target,callback){
           if(!this.events[event])
              this.events[event]=[];

            this.events[event].push({target,callback});
    }

    publish(event){
           if(!this.events[event])
           return;

           this.events[event].forEach(callSite=>{
               callSite.callback.call(callSite.target);
           })
    }
}

export default  EventEmitter;
 
