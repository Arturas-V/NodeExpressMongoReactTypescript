export default class Events {

    public static addEventListener = (type: string, handler: object) => {
        if(!Events.eRegister) {
            Events.eRegister = {};
            Events.touchList = {};
        }

        const list = Events.eRegister[type];
        if(list) {
            list[list.length] = handler;
        } else {
            Events.eRegister[type] = [handler];
        }

    }

    public static removeEventListener = (type: string, handler: object) => {
        if(!Events.eRegister) {
            return;
        }

        const list = Events.eRegister[type];
        let index;
        if(list && (index = list.indexOf(handler)) > -1) {
            list[index] = undefined;
            Events.touchList[type] = true;
        }
    }
    
    public static dispatch = (type: string, options: object = {}) => {

        if(!Events.eRegister) {
            return;
        }

        // const type = event.type;
        const list = Events.eRegister[type];
        let item;
        if(list) {

            // dispatch
            for (var i = 0; i < list.length; i++) {
                item = list[i];

                try {
                    if(item) {
                        item.call(item.scope, options);
                    }
                } catch (error) {
                    console.log("Events: ", error);
                }
            }
        }
    }

    private static eRegister: any = {};
    private static touchList: any = {};

}