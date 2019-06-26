import * as React from "react";
// import { string } from "prop-types";

interface UserDataProps {
    username: string;
    password: string;
    email: string;
}

export default class Register extends React.Component implements UserDataProps {

    username: string = "larry11ww"; 
    password: string = "testpassword";
    email: string = "emailss11@mail.com";

    constructor(props: any){
        super(props);
        
        this.registerAccount = this.registerAccount.bind(this);
    }

    registerAccount(){
        const data: object = {username: this.username, password: this.password, email: this.email};


        fetch('/account/registerUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(res => res.json())
            .catch(error => console.error(error));
    }

	/*
	 *  render DOM
	 */
	render() {
		return (
            <div>
                <h1>Register account</h1>
                <span onClick={this.registerAccount}>Register account</span>
            </div>
		)
	}
}