import * as React from "react";
import { NavLink, Link } from "react-router-dom";


// style imports
import "../styles/Header.css";
import logo from "../images/beeza.png";

export default class Header extends React.Component {

	/*
	 *  render DOM
	 */
	render() {		

		return (
			<header className="mainHeader">
				
				<div className="mainHeaderLogoWrapper">
					<Link className="mainHeaderLogo" to="/">
						<img className="mainHeaderLogoImage" src={logo} alt="beeza" />
					</Link>
				</div>
			
				<div className="mainMenu">
					<NavLink exact activeClassName="mainMenuItemActive" className="mainMenuItem" to="">Home</NavLink>
					<NavLink exact activeClassName="mainMenuItemActive" className="mainMenuItem" to="/shops">Shops</NavLink>
					<NavLink exact activeClassName="mainMenuItemActive" className="mainMenuItem" to="/account">Account</NavLink>
				</div>

			</header>
		)
	}
}