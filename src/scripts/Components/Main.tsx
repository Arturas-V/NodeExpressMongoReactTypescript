import * as React from "react";
import { Route } from 'react-router-dom';

import Account from './Account/Account';
import MyAds from "./Account/MyAds";
import PostAd from "./Account/PostAd";
import Profile from "./Account/Profile";
import Home from './Home';
import Shops from './Shops';


// style imports
import "../../styles/Main.css";

export default class Main extends React.Component {

	/*
	 *  render DOM
	 */
	public render() {		

		return (
			<div className="mainBlock">

				<Route exact={true} path="/" component={Home}/>
				<Route exact={true} path="/shops" component={Shops}/>
				<Route exact={true} path="/account" component={Account} />
				<Route exact={true} path="/account/post-ad" component={PostAd} />
                <Route exact={true} path="/account/my-ads" component={MyAds} />
                <Route exact={true} path="/account/profile" component={Profile} />

			</div>
			
		)
	}
}