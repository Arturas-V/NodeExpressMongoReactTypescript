import * as React from "react";
import { Route } from 'react-router-dom';

import Home from './Home';
import Shops from './Shops';
import Account from './Account/Account';
import PostAd from './Account/PostAd';


// style imports
import "../../styles/Main.css";

export default class Main extends React.Component {

	/*
	 *  render DOM
	 */
	render() {		

		return (
			<div className="mainBlock">

				<Route exact path="/" component={Home}/>
				<Route exact path="/shops" component={Shops}/>
				<Route exact path="/account" component={Account} />
				<Route exact path="/account/post-ad" component={PostAd} />

			</div>
			
		)
	}
}