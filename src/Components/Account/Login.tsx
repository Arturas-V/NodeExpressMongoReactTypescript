import * as React from "react";

interface UserLoginProps {
    username: string;
    password: string;
}

export default class Login extends React.Component implements UserLoginProps {

	username: string = "larry11ww"; 
    password: string = "testpassword";

	constructor(props: any) {
		super(props);

		this.loginUser = this.loginUser.bind(this);
		this.verifyUser = this.verifyUser.bind(this);
		this.logoutUser = this.logoutUser.bind(this);
	}

	logoutUser(){
		fetch('/account/logout?token=5d12d448a341357ce4d42f14', {
            method: 'GET'})
            .then(res => res.json())
            .catch(error => console.error(error));
	}

	verifyUser() {
		fetch('/account/verify?token=5d12d448a341357ce4d42f14', {
            method: 'GET'})
            .then(res => res.json())
            .catch(error => console.error(error));
	}

	loginUser(){

		const data: object = {username: this.username, password: this.password};

		fetch('/account/loginUser', {
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
				<h1>Member login</h1>
				<span onClick={this.loginUser}>Login me</span>
				<span onClick={this.verifyUser}>Verify me</span>
				<span onClick={this.logoutUser}>Log out</span>
			</div>
		)
	}
}