import * as React from "react";

//style imports
import "../../styles/Account/PostAd.css"


export default class PostAd extends React.Component {


	/*
	 *  constructor with fetch call to server to get user details
	 */
	constructor(props: any){
		super(props);

		fetch("/account/getUser", { method: 'GET' })
            .then(res => res.json())
            .then((obj) => {

                if( typeof obj.loggedIn !== "undefined" && obj.loggedIn ) {
					console.log("Logged out on front end");
                } else {

                }
                
            })
			.catch(error => console.error(error));

	}



	/*
	 *  Render jumbo bumbo
	 */
	render() {

        return (
            <p>Post ad here</p>
        )
	  	
	}
}