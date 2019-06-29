import * as React from "react";
import { NavLink } from 'react-router-dom';

export default class Header extends React.Component<any, any> {

	/*
	 *  render DOM
	 */
	render() {		

		return (
			<div className="header">	
				<h1>Beeza</h1>

					<div className="mainMenu">
						<NavLink exact className="mainMenuItem" to="">Home</NavLink>
						<NavLink exact className="mainMenuItem" to="/shops">Shops</NavLink>
						<NavLink exact className="mainMenuItem" to="/account">Account</NavLink>
						<NavLink exact className="mainMenuItem" to="/account/register">Register</NavLink>
						<NavLink exact className="mainMenuItem" to="/account/login">Login</NavLink>
					</div>

			</div>
		)
	}
}