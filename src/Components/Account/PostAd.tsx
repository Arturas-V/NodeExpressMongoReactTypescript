import * as React from "react";
import { Link } from "react-router-dom";

//style imports
import "../../styles/Account/PostAd.css"

type State = {
    loggedIn: Boolean
}

export default class PostAd extends React.Component<State> {

    state = {
        loggedIn: false
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
                    this.setState({
                        loggedIn: true
                    });
					// console.log("Logged out on front end ", obj);
                } else {

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

                if( (typeof obj.logggedIn !== "undefined" && obj.logggedIn) || (typeof obj.registered !== "undefined" && obj.registered) ) {

                    form.remove();
                    
                    // return this.props.updateStateAfterLoggedIn();
                    
                }
                
                // this._showNotification(obj.msg);
                
            })
			.catch(error => console.error(error));
    }


	/*
	 *  Render jumbo bumbo
	 */
	render() {

        if(this.state.loggedIn) {
            return (
                <div className="postAdPage">
    
                    <p>Post new ad here</p>
    
                    <form onSubmit={this._postAd}>
    
                        <label htmlFor="live">Live</label>
                        <input type="radio" defaultChecked name="live" id="live" value="true" />
    
                        <label htmlFor="no-live">Not live</label>
                        <input type="radio" name="live" id="no-live" value="false" />
    
                        <input type="text" required name="title" placeholder="Ad title" />
                        <input type="number" required name="price" placeholder="Price" />
                        <textarea required placeholder="Description" name="description"></textarea>
    
                        <input type="submit" value="Post ad" />
    
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