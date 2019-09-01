import * as React from "react";
import LoginRegister from "./LoginRegister";
import Profile from "./Profile";

import { connect } from "react-redux";

// style imports
import "./../../../styles/Account/Account.css"

interface IProps {
	userState: {
		loggedIn: boolean
	}
}

class Account extends React.Component<IProps> {

	/*
	 *  Render jumbo bumbo
	 */
	public render() {

		console.log("ACCOUNT");

		let cont = null;

		// redirect after log in
		if( this.props.userState.loggedIn ) {
			cont = <Profile />;
		} else {
			cont = <LoginRegister  />;
		}

		return (
			<React.Fragment>
				{cont}
			</ React.Fragment>
		)
	  	
	}

}

// map redux state to component properties 
// so that component can be updated upon redux state update
const mapStateToProps = (state: any) => ({
	userState: state.userState
});

export default connect( mapStateToProps, { } )(Account);