import * as React from "react";
import LoginRegister from "./LoginRegister";

//style imports
import "../../styles/Account.css"

type State = {
	isLoggedIn: number
}

export default class Account extends React.Component<State> {

	state = {
		isLoggedIn: 0
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
						isLoggedIn: 1
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
	 *  Render jumbo bumbo
	 */
	render() {

		if(this.state.isLoggedIn === 1 ) {
			return (
				<h1>Welcome to your account</h1>	
			)
		} else if (this.state.isLoggedIn === 2) {
			return (
				<LoginRegister accountLoggedInState={this._showLoginRegisterOption} />
			)
		} else if (this.state.isLoggedIn === 0) {
			return (
				<p>Wait</p>
			)
		}
	  	
	}
}