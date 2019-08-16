import * as React from "react";
import LoginRegister from "./LoginRegister";
import Profile from "./Profile";
import Cookies from "../../Utils/Cookies";

import { connect } from "react-redux";
import { login, logout } from "../../Redux/actions/userStateActions";


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

		const isCookie = Cookies.getCookieValue("dollar");

		let cont = null;

		// redirect after log in
		if( this.props.userState.loggedIn || (isCookie && isCookie !== "0")  ) {
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

export default connect( mapStateToProps, { login, logout } )(Account);