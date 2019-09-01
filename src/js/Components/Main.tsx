import * as React from "react";
import { Route } from 'react-router-dom';

import Account from './Account/Account';
import MyAds from "./Account/MyAds";
import PostAd from "./Account/PostAd";
import Home from './Home';
import Shops from './Shops';

import { connect } from "react-redux";
import { loggedOut, loggedIn } from "../Redux/actions/userStateActions";


// style imports
import "../../styles/Main.css";

interface IProps {
	loggedOut: () => void,
    loggedIn: (obj: object) => void
}

class Main extends React.Component<IProps> {

	/*
	 *  constructor with fetch call to server to get user details
	 */
	constructor(props: any){
		super(props);

		this.requestUserData();
        
	}
	
	private requestUserData = () => {

		console.log("get user");

		return fetch("/account/getUser", { method: 'GET' })
		.then(res => res.json())
		.then((obj) => {

			if( typeof obj.loggedIn !== "undefined" && obj.loggedIn ) {
                return this.props.loggedIn(obj);
			} else {
                return this.props.loggedOut();
			}
			
		})
		.catch(error => console.error(error));

	}

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

			</div>
			
		)
	}
}

export default connect( null, { loggedOut, loggedIn } )( Main );