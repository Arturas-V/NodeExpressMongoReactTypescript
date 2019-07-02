import * as React from "react";
import { Link } from "react-router-dom";

type Props = {
    userData: {
        email: String,
        id: String,
        username: String,
        name: String,
        location: String
    },
    logOutHandler: Function
}

export default class Account extends React.Component<Props> {

    _logOut = () => {

        fetch("/account/logout", { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({msg: "logout"})
            })
            .then(res => res.json())
            .then((obj) => {

                return this.props.logOutHandler();
                
            })
			.catch(error => console.error(error));
    }

    render() {

        return (

            <div className="accountPage">

                <h2>Welcome to your account</h2>

                <span onClick={this._logOut} >Logout</span>

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

                    <Link className="accountPostAdButton" to="/account/post-ad">Post ad</Link>

                </div>

            </div>
            
            
        )

    }
}