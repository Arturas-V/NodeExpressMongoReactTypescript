import * as React from "react";
import AccountNavigation from "./Components/Navigation";

import { connect } from "react-redux";
// import { loggedOut, loggedIn } from "../../Redux/actions/userStateActions";

interface IProps {
    userData: {
        email: string,
        id: string,
        username: string,
        name: string,
        location: string
    }
}

class Profile extends React.Component<IProps> {
    
    public render() {

        return (
            <div className="accountPage">

                <h2>My Profile</h2>

                <AccountNavigation/>

                <div className="accountDetails">

                    <h4>Your account details</h4>

                    <h5>Username:</h5>
                    <p>{this.props.userData.username}</p>

                    <h5>Email:</h5>
                    <p>{this.props.userData.email}</p>

                    <h5>Name:</h5>
                    {this.props.userData.name ? 
                        <p>{this.props.userData.name}</p>
                        : <input type="text" placeholder="enter your name" />
                    }

                    <h5>Location:</h5>
                    {this.props.userData.location ? 
                        <p>{this.props.userData.location}</p>
                        : <input type="text" placeholder="enter your location" />
                    }

                </div>

            </div>
        )

    }

}

// map redux state to component properties 
// so that component can be updated upon redux state update
const mapStateToProps = (state: any) => ({
	userData: state.userState.userData
});

export default connect( mapStateToProps, {  } )( Profile );