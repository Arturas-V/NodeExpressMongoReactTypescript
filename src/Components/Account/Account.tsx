import * as React from "react";

export default class Account extends React.Component {

	/*
	 * Handle login/register fetch requests to server 
	 */
	_fetchFormdata = (url: string = "", data: object = {}) => {

		fetch(url, {
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
	 * Login/Register form submit handler
	 */
	_formSubmitHandle = (event: React.FormEvent) => {
		event.preventDefault();

		const form: any = event.target;
		const data = new FormData(form);
		let userdata: any = {};

		for (let name of data.keys()) {
			userdata[name] = data.get(name);
		}

		this._fetchFormdata(form.action, userdata);
	}

	/*
	 * Toggle login or register form button handler
	 */
	_toggleLoginRegister = (event: React.MouseEvent) => {

	}

	/*
	 *  Render jumbo bumbo
	 */
	render() {
	  	return (
			<div className="loginRegisterBlock">

				<h2 className="loginRegisterBlockTitle">Account Login/Register</h2>

				<p className="loginRegisterBlockCaption">Login or register new account here</p>

				<div className="loginRegisterToggle">
					<span onClick={this._toggleLoginRegister} className="loginRegisterToggleButton loginRegisterToggleButtonActive">Login</span>
					<span onClick={this._toggleLoginRegister} className="loginRegisterToggleButton">Register</span>
				</div>
				
				<div className="loginRegisterForms">

					<form className="loginRegisterFormLogin loginRegisterFormActive" action="/account/loginUser" onSubmit={this._formSubmitHandle}>

						<input type="text" data-parse="username" placeholder="Username" name="username" />
						<input type="password" data-parse="password" placeholder="Password" name="password" />
						<input type="submit" value="Login" />

					</form>

					<form className="loginRegisterFormRegister loginRegisterFormHidden" action="/account/registerUser" onSubmit={this._formSubmitHandle}>

						<input type="text" placeholder="Username" name="username" />
						<input type="email" placeholder="Email" name="email" />
						<input type="password" placeholder="Password" name="password" />
						<input type="submit" value="Register" />

					</form>

				</div>

			</div>

	  	)
	}
}