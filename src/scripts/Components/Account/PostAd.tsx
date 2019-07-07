import * as React from "react";
import { Link } from "react-router-dom";

//style imports
import "./../../../styles/Account/PostAd.css"

type State = {
    loggedIn: boolean,
    showNotification: boolean,
    notificationMessage: string
}

export default class PostAd extends React.Component<State> {

    state = {
        loggedIn: false,
        showNotification: false,
        notificationMessage: ""
    };


	/*
	 *  constructor with fetch call to server to get user details
	 */
	constructor(props: any){
		super(props);

		fetch("/account/getUser", { method: 'GET' })
            .then(res => res.json())
            .then((obj) => {

                if( typeof obj.loggedIn !== "undefined" && obj.loggedIn ) {
                    return this.setState({
                        loggedIn: true
                    });
                } else {
                    return;
                }
                
            })
			.catch(error => console.error(error));

	}

    _postAd = (event: React.FormEvent) => {
        event.preventDefault();

        const form: any = event.target;
		const data = new FormData(form);
		let postdata: any = {};

		for (let name of data.keys()) {
			postdata[name] = data.get(name);
        }
        
        fetch("/ad/post", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postdata)
            })
            .then(res => res.json())
            .then((obj) => {
                console.log("eeeee", obj);
                if( (typeof obj.adPosted !== "undefined" && obj.adPosted) ) {
                    console.log("zooo");
                    form.reset();
                    console.log("mee");
                    this._showNotification(obj.msg);
                                        
                } else {
                    return;
                }
                
            })
			.catch(error => console.error(error));
    }

    _showNotification = (message: string) => {
        console.log("baaa");
        this.setState({
            notificationMessage: message,
            showNotification: true
        });
    }

    _hideNotification = () => {
        if(this.state.showNotification) {
            this.setState({
                showNotification: false,
                notificationMessage: ""
            });
        }
    }


	/*
	 *  Render jumbo bumbo
	 */
	render() {

        if(this.state.loggedIn) {
            return (
                <div className="postAdPage">
    
                    <p>Post new ad here</p>

                    <div className={this.state.showNotification ? "postAdPageNotification postAdPageNotificationActive" : "postAdPageNotification"}>
                        <p className="postAdPageNotificationText">{this.state.notificationMessage}</p>
                        <span className="postAdPageNotificationClose closeIC" onClick={this._hideNotification}></span>
                    </div>
    
                    <form className="postAdForm" onSubmit={this._postAd}>
    
                        <div className="postAdFormLine">
                            <div className="postAdFormSubLine">
                                <label className="postAdFormLineLabel" htmlFor="live">Live</label>
                                <input type="radio" defaultChecked name="live" id="live" value="true" onFocus={this._hideNotification}/>
                            </div>
                            
                            <div className="postAdFormSubLine">
                                <label className="postAdFormLineLabel" htmlFor="no-live">Not live</label>
                                <input type="radio" name="live" id="no-live" value="false" onFocus={this._hideNotification}/>
                            </div>
                            
                        </div>
    
                        <div className="postAdFormLine">
                            <input className="postAdFormLineField" type="text" required name="title" placeholder="Ad title" onFocus={this._hideNotification}/>
                        </div>

                        <div className="postAdFormLine">
                            <input className="postAdFormLineField" type="number" required name="price" placeholder="Price" onFocus={this._hideNotification}/>
                        </div>
                        
                        <div className="postAdFormLine">
                            <textarea className="postAdFormLineField" required placeholder="Description" rows={8} name="description" onFocus={this._hideNotification}></textarea>
                        </div>
                        
                        <div className="postAdFormLine">
                            <input className="postAdFormLineSubmit" type="submit" value="Post ad" />
                        </div>
    
                    </form>
    
                </div>
            )
        } else {
            return (
                <p>You have no permision to post ad. Please <Link to="/account">login or register</Link></p>
            )
            
        }

        
	  	
	}
}