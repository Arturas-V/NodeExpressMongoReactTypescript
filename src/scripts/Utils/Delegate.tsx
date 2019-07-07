export default class Delegate {

    constructor(listener: Function, scope: object){
        return function() { 
            listener.apply(null, [arguments, scope]);	
        }
    }
        
}