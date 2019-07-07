import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import Cookies from "../Utils/Cookies";
import Events from "../Utils/Events";
import Delegate from "../Utils/Delegate";


// style imports
import "../../styles/Header.css";
import logo from "../../images/beeza.png";

type IHeader = {
	showLogOutLinkDelegate: object
}

export default class Header extends React.Component implements IHeader {

	state = {
		isLoggedIn: false
	}

	showLogOutLinkDelegate = {};

	constructor(props: object){
		super(props);
		const _this = this;

		this.showLogOutLinkDelegate = new Delegate(_this._showLogOutLink, _this);
	}

	componentWillMount (){
		const isCookie = Cookies.getCookieValue("dollar") !== "0";
		const _this = this;
		

		Events.addEventListener("LOG_IN", _this.showLogOutLinkDelegate);

		// console.log(	);

		if(isCookie) {
			this._showLogOutLink(true);
		}
	}

	_showLogOutLink = (condition: boolean) => {
		this.setState({
			isLoggedIn: condition
		});
	}

	_logOut = () => {

        fetch("/account/logout", { 
            method: 'POST'
            })
            .then(res => res.json())
            .then((obj) => {

            	this._loggedOutHandler();

            })
			.catch(error => console.error(error));
	}
	
	_loggedOutHandler = () => {
		this.setState({
			isLoggedIn: false
		});
	}

	/*
	 *  render DOM
	 */
	render() {

		let logoutLink;

		if (this.state.isLoggedIn) {
			logoutLink = <Link className="mainMenuItem" to="/" onClick={this._logOut}>Logout</Link>;
		}
	
		return (
			<header className="mainHeader">
				
				<div className="mainHeaderLogoWrapper">
					<Link className="mainHeaderLogo" to="/">
						<img className="mainHeaderLogoImage" src={logo} alt="beeza" />
					</Link>
				</div>
			
				<div className="mainMenu">
					<NavLink exact activeClassName="mainMenuItemActive" className="mainMenuItem" to="/">Home</NavLink>
					<NavLink exact activeClassName="mainMenuItemActive" className="mainMenuItem" to="/shops">Shops</NavLink>
					<NavLink exact activeClassName="mainMenuItemActive" className="mainMenuItem" to="/account">Account</NavLink>
					{logoutLink}
				</div>

			</header>
		)
	}
}