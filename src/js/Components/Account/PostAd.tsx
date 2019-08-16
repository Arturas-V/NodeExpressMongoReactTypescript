import * as React from "react";
import Cookies from "../../Utils/Cookies";
import Navigation from "./Components/Navigation";

// style imports
import "./../../../styles/Account/PostAd.css"

interface IState {
    notificationMessage: string,
    showNotification: boolean
}

export default class PostAd extends React.Component<{}, IState> {

    public state = {
        notificationMessage: "",
        showNotification: false
    };

    private cookie = "";

    constructor(props: object) {
        super(props);

        this.cookie = Cookies.getCookieValue("dollar");
    }

    /*
	 *  Render jumbo bumbo
	 */
	public render() {

        if(this.cookie === "0" || this.cookie === "") {
            return (
                <div className="accountPage">

                    <p>Nothing here</p>

                </div>
            )
        }

        return (
            <div className="postAdPage">

                <h2>Post new ad here</h2>

                <Navigation/>

                <div className={this.state.showNotification ? "postAdPageNotification postAdPageNotificationActive" : "postAdPageNotification"}>
                    <p className="postAdPageNotificationText">{this.state.notificationMessage}</p>
                    <span className="postAdPageNotificationClose closeIC" onClick={this.hideNotification}>&nbsp;</span>
                </div>

                <form className="postAdForm" onSubmit={this.postAd}>

                    <div className="postAdFormLine">
                        <div className="postAdFormSubLine">
                            <label className="postAdFormLineLabel" htmlFor="live">Live</label>
                            <input type="radio" defaultChecked={true} name="live" id="live" value="true" onFocus={this.hideNotification}/>
                        </div>
                        
                        <div className="postAdFormSubLine">
                            <label className="postAdFormLineLabel" htmlFor="no-live">Not live</label>
                            <input type="radio" name="live" id="no-live" value="false" onFocus={this.hideNotification}/>
                        </div>
                        
                    </div>

                    <div className="postAdFormLine">
                        <input className="postAdFormLineField" type="text" required={true} name="title" placeholder="Ad title" onFocus={this.hideNotification}/>
                    </div>

                    <div className="postAdFormLine">
                        <input className="postAdFormLineField" type="number" required={true} name="price" placeholder="Price" onFocus={this.hideNotification}/>
                    </div>
                    
                    <div className="postAdFormLine">
                        <textarea className="postAdFormLineField" required={true} placeholder="Description" rows={8} name="description" onFocus={this.hideNotification}/>
                    </div>
                    
                    <div className="postAdFormLine">
                        <input className="postAdFormLineSubmit" type="stubmit" value="Post ad" />
                    </div>

                </form>

            </div>
        )

	}

    private postAd = (event: React.FormEvent) => {
        event.preventDefault();

        const form: any = event.target;
		const data = new FormData(form);
		const postdata: any = {};

		for (const name of data.keys()) {
			postdata[name] = data.get(name);
        }
        
        fetch("/ad/post", {
            body: JSON.stringify(postdata),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
            })
            .then(res => res.json())
            .then((obj) => {
                if( (typeof obj.adPosted !== "undefined" && obj.adPosted) ) {
                    form.reset();
                    this.showNotification(obj.msg);
                                        
                } else {
                    return;
                }
                
            })
			.catch(error => console.error(error));
    }

    private showNotification = (message: string) => {
        this.setState({
            notificationMessage: message,
            showNotification: true
        });
    }

    private hideNotification = () => {
        if(this.state.showNotification) {
            this.setState({
                notificationMessage: "",
                showNotification: false
            });
        }
    }
	
}