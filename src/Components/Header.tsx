import * as React from "react";
// import * as ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, NavLink } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import Shops from './Shops';
import Account from './Account/Account';
import Register from './Account/Register';
import Login from './Account/Login';

export default class Header extends React.Component<any, any> {

	/*
	 *  render DOM
	 */
	render() {		

		return (
			<div className="header">
				<h1>Beeza</h1>

				<Router>
					<div className="mainMenu">
						<NavLink exact className="mainMenuItem" to="/">Home</NavLink>
						<NavLink exact className="mainMenuItem" to="/shops">Shops</NavLink>
						<NavLink exact className="mainMenuItem" to="/account">Account</NavLink>
						<NavLink exact className="mainMenuItem" to="/account/register">Register</NavLink>
						<NavLink exact className="mainMenuItem" to="/account/login">Login</NavLink>
					</div>
					
					
					<Route exact path="/" />
					<Route exact path="/shops" component={Shops}/>
					<Route exact path="/account" component={Account} />
					<Route exact path="/account/register" component={Register} />
					<Route exact path="/account/login" component={Login} />
				</Router>

			</div>
		)
	}
}