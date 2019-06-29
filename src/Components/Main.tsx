import * as React from "react";
import { Route } from 'react-router-dom';

import Home from './Home';
import Shops from './Shops';
import Account from './Account/Account';
import Register from './Account/Register';
import Login from './Account/Login';


export default class Main extends React.Component {

	/*
	 *  render DOM
	 */
	render() {		

		return (
			<div className="mainBlock">
				<h1>Main component</h1>

				<Route exact path="/" component={Home}/>
				<Route exact path="/shops" component={Shops}/>
				<Route exact path="/account" component={Account} />
				<Route exact path="/account/register" component={Register} />
				<Route exact path="/account/login" component={Login} />

			</div>
			
		)
	}
}