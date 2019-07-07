import * as React from "react";
import { NavLink } from "react-router-dom";

type Props = {
    userData: {
        email: string,
        id: string,
        username: string,
        name: string,
        location: string
    }
}

export default class UserArea extends React.Component<Props> {

    render() {

        return (

            <div className="accountPage">

                <h2>Welcome to your account</h2>

                <NavLink exact className="accountPostAdButton" to="/account/my-ads">My ads</NavLink>
                <NavLink exact className="accountPostAdButton" to="/account/post-ad">Post ad</NavLink>

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

                <div className="accountAds">

                    <h4>All your ads</h4>

                </div>

            </div>
            
        )

    }
}