import * as React from "react";

// style imports
import "../../styles/LoginRegister.css"

type State = { activeLoginOption: boolean, showNotification: boolean, hideForms: boolean, notificationMessage: string }
type Props = { accountLoggedInState: Function }

export default class LoginRegister extends React.Component<Props, State> {

    state = {
        activeLoginOption: true,
        showNotification: false,
        hideForms: false,
        notificationMessage: "",
        accountState: false
    }

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
            .then((obj) => {

                if( (typeof obj.logggedIn !== "undefined" && obj.logggedIn) || (typeof obj.registered !== "undefined" && obj.registered) ) {
                    // user logged in or registered!!!
                    const loginFormElem: any = document.getElementById("loginForm");
                    const registerFormElem: any = document.getElementById("registerForm");

                    loginFormElem.remove();
                    registerFormElem.remove();

                    this.props.accountLoggedInState();
                }
                

                this._showNotification(obj.msg);
                
            })
			.catch(error => console.error(error));
			
    }

    /*
     * Show notification with dedicated message with in it
     */
    _showNotification = (message: string) => {
        this.setState({
            notificationMessage: message,
            showNotification: true
        });
    }

    /*
     * Hide notification element by changing state of it, only if it is shown
     */
    _hideNotification = () => {
        if(this.state.showNotification) {
            this.setState({
                showNotification: false
            });
        }
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
	 * Validate username by checking if field is not empty
	 */
	_validateUsername = (event: any) => {
		if(event.target.value.length === 0) {
            this._showNotification('Please enter username');
        }
	}

	/*
	 * Validate email format
	 */
	_validateEmail = (event: any) => {
		const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/;

		if(!event.target.value.match(mailformat)) {
            this._showNotification('You have entered an invalid email address');
        }
	}

	/*
	 * Validate password format not to be shorther than 8 characters
	 */
	_validatePassword = (event: any) => {
		if(event.target.value.length < 8) {
            this._showNotification('Password must be at least 8 characters');
        }
	}

	/*
	 * Toggle login or register form button handler
	 * update state to set correct style class
	 */
	_toggleLoginRegister = (event: any) => {
        const activeLogin = (event.target.dataset.activeOption  == "true");

        this.setState({
            activeLoginOption: activeLogin,
            showNotification: false
        });
        
	}

	/*
	 *  render DOM
	 */
	render() {
		return (
            <div className={this.state.activeLoginOption? "loginRegisterBlock loginActive" : "loginRegisterBlock registerActive"}>

				<h2 className="loginRegisterBlockTitle">Account Login/Register</h2>

				<p className="loginRegisterBlockCaption">Login or register new account here</p>

				<div className="loginRegisterToggle">
					<span onClick={this._toggleLoginRegister} data-active-option="true" className="loginRegisterToggleButton loginToggleButton">Login</span>
					<span onClick={this._toggleLoginRegister} data-active-option="false" className="loginRegisterToggleButton registerToggleButton">Register</span>
				</div>
				
				<div className="loginRegisterForms">

                    <div className={this.state.showNotification ? "loginRegisterFormsNotification" : "loginRegisterFormsNotification loginRegisterFormsNotificationHide"}>
                        <div className="loginRegisterFormsNotificationtextWrapper">
                            <p className="loginRegisterFormsNotificationText">{this.state.notificationMessage}</p>
                            <span className="loginRegisterFormsNotificationClose closeIC" onClick={this._hideNotification}></span>
                        </div>
                    </div>

					<form id="loginForm" className="loginRegisterForm loginForm" action="/account/loginUser" onSubmit={this._formSubmitHandle}>

                        <span className="loginRegisterFormInputWrapper userIC">
                            <input className="loginRegisterFormInput" type="text" placeholder="Username" name="username" onFocus={this._hideNotification} onBlur={this._validateUsername} required />
                        </span>
						
                        <span className="loginRegisterFormInputWrapper passwordIC">
                            <input className="loginRegisterFormInput" type="password" placeholder="Password" name="password" onFocus={this._hideNotification} onBlur={this._validatePassword}  required />
                        </span>
						
                        <span className="loginRegisterFormInputWrapper">
                            <input className="loginRegisterFormInput loginRegisterFormSubmit" type="submit" value="Login" />
                        </span>
						
					</form>

					<form id="registerForm" className="loginRegisterForm registerForm" action="/account/registerUser" onSubmit={this._formSubmitHandle}>

                        <span className="loginRegisterFormInputWrapper userIC">
                            <input className="loginRegisterFormInput" type="text" placeholder="Username" name="username" onFocus={this._hideNotification} onBlur={this._validateUsername} required/>
                        </span>

                        <span className="loginRegisterFormInputWrapper emailIC">
                            <input className="loginRegisterFormInput" type="email" placeholder="Email" name="email" onFocus={this._hideNotification} onBlur={this._validateEmail} required/>
                        </span>

                        <span className="loginRegisterFormInputWrapper passwordIC">
                            <input className="loginRegisterFormInput passwordIC" type="password" placeholder="Password" name="password" onFocus={this._hideNotification} onBlur={this._validatePassword} required/>
                        </span>					

                        <span className="loginRegisterFormInputWrapper">
                            <input className="loginRegisterFormInput loginRegisterFormSubmit" type="submit" value="Register" />
                        </span>

					</form>

				</div>

			</div>
		)
	}
}