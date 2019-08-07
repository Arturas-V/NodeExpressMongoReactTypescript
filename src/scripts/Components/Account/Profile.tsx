import * as React from "react";
import Cookies from "../../Utils/Cookies";
import Navigation from "./Components/Navigation";

interface IState {
    isLoggedIn: number,
    userData: {
        email: string,
        id: string,
        location: string,
        name: string,
        username: string
    }
}

export default class Profile extends React.Component<{}, IState> {

    public state = {
        isLoggedIn: 0,
        userData: {
            email: "",
            id: "",
            location: "",
            name: "",
            username: ""
        }
    }

    private cookie = "";

    /*
	 *  constructor with fetch call to server to get user details
	 */
	constructor(props: any){
		super(props);
        
        this.cookie = Cookies.getCookieValue("dollar");
		this.requestUserData();
    }
    
    public render() {

        if(this.cookie === "0" || this.cookie === "") {
            return (
                <div className="accountPage">

                    <p>Nothing here</p>

                </div>
            )
        }

        return (
            <div className="accountPage">

                <h2>My Profile</h2>

                <Navigation/>

                <div className="accountDetails">

                    <h4>Your account details</h4>

                    <h5>Username:</h5>
                    <p>{this.state.userData.username}</p>

                    <h5>Email:</h5>
                    <p>{this.state.userData.email}</p>

                    <h5>Name:</h5>
                    {this.state.userData.name ? 
                        <p>{this.state.userData.name}</p>
                        : <input type="text" placeholder="enter your name" />
                    }

                    <h5>Location:</h5>
                    {this.state.userData.location ? 
                        <p>{this.state.userData.location}</p>
                        : <input type="text" placeholder="enter your location" />
                    }

                </div>

            </div>
        )

    }

    private requestUserData = () => {

		fetch("/account/getUser", { method: 'GET' })
		.then(res => res.json())
		.then((obj) => {

			if( typeof obj.loggedIn !== "undefined" && obj.loggedIn ) {
				this.setState({
					isLoggedIn: 1,
					userData: obj
				});
			} else {
				
				this.setState({
					isLoggedIn: 2
				});
			}
			
		})
		.catch(error => console.error(error));

	}
}