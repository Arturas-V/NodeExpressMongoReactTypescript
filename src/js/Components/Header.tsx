import React from "react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "../Utils/Cookies";

import { connect } from "react-redux";
import { login, logout } from "../Redux/actions/userStateActions";

// style statics
import logo from "../../images/beeza.png";
import "../../styles/Header.css";

interface IProps {
	logout: () => void,
	login: () => void,
	userState: {
		loggedIn: boolean
	}
}

class Header extends React.Component<IProps> {

	/*
	 *  render DOM
	 */
	public render() {

		const isCookie = Cookies.getCookieValue("dollar");

		let logoutLink = null;
		
		if ( this.props.userState.loggedIn || (isCookie && isCookie !== "0") ) {
			logoutLink = <Link className="mainMenuItem" to="/" onClick={this.props.logout}>Logout</Link>;
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
					<NavLink exact={false} activeClassName="mainMenuItemActive" className="mainMenuItem" to="/account">Account</NavLink>
					{logoutLink}
				</div>

			</header>
		)
	}

}

// map redux state to component properties 
// so that component can be updated upon redux state update
const mapStateToProps = (state: any) => ({
	userState: state.userState
});

export default connect( mapStateToProps, { login, logout } )(Header);