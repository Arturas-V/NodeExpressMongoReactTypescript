import React from "react";
import { Link, NavLink } from "react-router-dom";
import Events from "../Events/Events";
import EventType from "../Events/EventType";
import Cookies from "../Utils/Cookies";
import Delegate from "../Utils/Delegate";

// style statics
import logo from "../../images/beeza.png";
import "../../styles/Header.css";

interface IState {
	isLoggedIn: boolean
}

export default class Header extends React.Component<{}, IState> {

	public state = {
		isLoggedIn: false
	}

	private showLogOutLinkDelegate = {};

	constructor(props: object){
		super(props);
		const self = this;

		this.showLogOutLinkDelegate = new Delegate(self.showLogOutLink, self);		
		Events.addEventListener(EventType.LOG_IN, self.showLogOutLinkDelegate);

	}

	/*
	 *  render DOM
	 */
	public render() {

		let logoutLink;
		let profileUrl = "/account";
		const isCookie = Cookies.getCookieValue("dollar");

		if (this.state.isLoggedIn || isCookie !== "") {
			logoutLink = <Link className="mainMenuItem" to="/" onClick={this.logOut}>Logout</Link>;
			profileUrl = "/account/profile";
		}
	
		return (
			<header className="mainHeader">
				
				<div className="mainHeaderLogoWrapper">
					<Link className="mainHeaderLogo" to="/">
						<img className="mainHeaderLogoImage" src={logo} alt="beeza" />
					</Link>
				</div>
			
				<div className="mainMenu">
					<NavLink exact={true} activeClassName="mainMenuItemActive" className="mainMenuItem" to="/">Home</NavLink>
					<NavLink exact={true} activeClassName="mainMenuItemActive" className="mainMenuItem" to="/shops">Shops</NavLink>
					<NavLink exact={true} activeClassName="mainMenuItemActive" className="mainMenuItem" to={profileUrl}>Account</NavLink>
					{logoutLink}
				</div>

			</header>
		)
	}

	private showLogOutLink = (condition: boolean) => {
		this.setState({
			isLoggedIn: condition
		});
	}

	private logOut = () => {

        fetch("/account/logout", { 
            method: 'POST'
            })
            .then(res => res.json())
            .then((obj) => {

            	this.showLogOutLink(false);

            })
			.catch(error => console.error(error));
	}

	
}