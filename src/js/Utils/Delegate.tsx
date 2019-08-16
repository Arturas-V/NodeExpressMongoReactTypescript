export default class Delegate {

    constructor(listener: any, scope: object){
        return () => { 
            listener.apply(null, [arguments, scope]);	
        }
    }
        
}