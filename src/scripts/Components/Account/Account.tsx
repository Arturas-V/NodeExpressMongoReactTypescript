import * as React from "react";
import { Redirect } from "react-router-dom";
import Events from "../../Events/Events";
import EventType from "../../Events/EventType";
import Delegate from "../../Utils/Delegate";
import LoginRegister from "./LoginRegister";


// style imports
import "./../../../styles/Account/Account.css"

interface IState {
	isLoggedIn: number,
	user: object
}

export default class Account extends React.Component<{}, IState> {

	public state = {
		isLoggedIn: 2, // 1 - go to user area when logged in; 2 - show login/register;
		user: {}
	}

	private showLogOutLinkDelegate = {};

	/*
	 *  constructor with fetch call to server to get user details
	 */
	constructor(props: any){
		super(props);
		const self = this;

		this.showLogOutLinkDelegate = new Delegate(self.loggedInStateUpdate, self);
		Events.addEventListener(EventType.LOG_IN, self.showLogOutLinkDelegate);

		this.requestUserData();
	}

		/*
	 *  Render jumbo bumbo
	 */
	public render() {

		let cont = <LoginRegister  />;

		// redirect after log in
		if(this.state.isLoggedIn === 1 ) {
			cont = <Redirect to="/account/profile"/>;
		}

		return (
			<React.Fragment>
				{cont}
			</ React.Fragment>
		)
	  	
	}

	/*
	 * clean up component
	 */ 
	public componentWillUnmount () {
		const self = this;

		Events.removeEventListener(EventType.LOG_IN, self.showLogOutLinkDelegate);
	}

	/*
	 * get user data
	 */ 
	private requestUserData = () => {

		fetch("/account/getUser", { method: 'GET' })
		.then(res => res.json())
		.then((obj) => {

			if( typeof obj.loggedIn !== "undefined" && obj.loggedIn ) {
				this.setState({
					isLoggedIn: 1,
					user: obj
				});
			} else {
				
				this.setState({
					isLoggedIn: 2
				});
			}
			
		})
		.catch(error => console.error(error));

	}

	/*
	 *  redirect after logged in
	 */
	private loggedInStateUpdate = (options: any) => {

		// this._requestUserData();
		
		if ( typeof(options) !== undefined && options.length > 0 &&  options[0].data.loggedIn ) {
			this.setState({
				isLoggedIn: 1
			});
		}
		
	}
}