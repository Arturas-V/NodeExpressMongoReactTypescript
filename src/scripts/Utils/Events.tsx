export default class Events {

    static _eRegister: any = {};
    static _touchList: any = {};

    static addEventListener = (type: string, handler: object) => {
        if(!Events._eRegister) {
            Events._eRegister = {};
            Events._touchList = {};
        }

        const list = Events._eRegister[type];
        if(list) {
            list[list.length] = handler;
        } else {
            Events._eRegister[type] = [handler];
        }

    }

    static removeEventListener = (type: string, handler: void) => {
        if(!Events._eRegister) {
            return;
        }

        const list = Events._eRegister[type];
        let index;
        if(list && (index = list.indexOf(handler)) > -1) {
            list[index] = undefined;
            Events._touchList[type] = true;
        }
    }
    
    static dispatch = (type: string) => {

        if(!Events._eRegister) {
            return;
        }

        // const type = event.type;
        const list = Events._eRegister[type];
        let item;
        if(list) {

            // dispatch
            for (var i = 0; i < list.length; i++) {
                item = list[i];

                try {
                    if(item) {
                        item.call(item.scope);
                    }
                } catch (error) {
                    console.log("Events: ", error);
                }
            }
        }
    }

}