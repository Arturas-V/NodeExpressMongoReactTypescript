export default class Cookies  {

    public static setCookie = (cname: string, cvalue: string, exdays: number) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));

        const expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    public static getCookieValue = (cname: string) => { 
        const name = cname + "=";
        const ca = document.cookie.split(';');
        for(const caItem of ca) {
            let c = caItem;
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.split('=')[1];
            }
        }
        return "";
    }
    
}