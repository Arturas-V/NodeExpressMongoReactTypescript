import * as React from "react";
import LoginRegister from "./LoginRegister";
import UserArea from "./UserArea";
import { Link } from "react-router-dom";


//style imports
import "./../../../styles/Account/Account.css"

type State = {
	isLoggedIn: number,
	user: object
}


export default class Account extends React.Component<State> {

	state = {
		isLoggedIn: 0, // 1 - go to user area when logged in; 2 - show login/register;
		user: {
			email: "",
			id: "",
			username: "",
			name: "",
        	location: ""
		}
	}

	

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
						isLoggedIn: 1,
						user: obj
					});
                } else if (typeof obj.loggedIn !== "undefined" && !obj.loggedIn ){
					
					this.setState({
						isLoggedIn: 2
					});
				} else {
					this._showLoginRegisterOption();
				}
                
            })
			.catch(error => console.error(error));

	}

	/*
	 *  show login register option by updating state
	 */
	_showLoginRegisterOption = () => {
		this.setState({
			isLoggedIn: 2
		});
	}

	/*
	 *  redirect after logged in
	 */
	_loggedInStateUpdate = () => {
		this.setState({
			isLoggedIn: 1
		});
	}

	_loggedOutHandler = () => {
		this.setState({
			isLoggedIn: 2
		});
	}


	/*
	 *  Render jumbo bumbo
	 */
	render() {

		if(this.state.isLoggedIn === 1 ) {
			return (
				<UserArea userData={this.state.user} />	
			)
		} else if (this.state.isLoggedIn === 2) {
			return (
				<LoginRegister updateStateAfterLoggedIn={this._loggedInStateUpdate} />
			)
		} else {
			return (
				<Link to="/">Back to homepage</Link>
			)
		}
	  	
	}
}