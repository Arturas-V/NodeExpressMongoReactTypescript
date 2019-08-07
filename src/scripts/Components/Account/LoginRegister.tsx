import * as React from "react";
import Events from "../../Events/Events";
import EventType from "../../Events/EventType";

// style imports
import "./../../../styles/Account/LoginRegister.css"

interface IState { 
    activeLoginOption: boolean, 
    showNotification: boolean, 
    hideForms: boolean, 
    notificationMessage: string 
}

export default class LoginRegister extends React.Component<{}, IState> {

    public state = {
        accountState: false,
        activeLoginOption: true,
        hideForms: false,
        notificationMessage: "",
        showNotification: false
    }

    /*
	 *  render DOM
	 */
	public render() {
		return (
            <div className={this.state.activeLoginOption? "loginRegisterBlock loginActive" : "loginRegisterBlock registerActive"}>

				<h2 className="loginRegisterBlockTitle">Account Login/Register</h2>

				<p className="loginRegisterBlockCaption">Login or register new account here</p>

				<div className="loginRegisterToggle">
					<span onClick={this.toggleLoginRegister} data-active-option="true" className="loginRegisterToggleButton loginToggleButton">Login</span>
					<span onClick={this.toggleLoginRegister} data-active-option="false" className="loginRegisterToggleButton registerToggleButton">Register</span>
				</div>
				
				<div className="loginRegisterForms">

                    <div className={this.state.showNotification ? "loginRegisterFormsNotification" : "loginRegisterFormsNotification loginRegisterFormsNotificationHide"}>
                        <div className="loginRegisterFormsNotificationtextWrapper">
                            <p className="loginRegisterFormsNotificationText">{this.state.notificationMessage}</p>
                            <span className="loginRegisterFormsNotificationClose closeIC" onClick={this.hideNotification}>&nbsp;</span>
                        </div>
                    </div>

					<form id="loginForm" className="loginRegisterForm loginForm" action="/account/loginUser" onSubmit={this.formSubmitHandle}>

                        <span className="loginRegisterFormInputWrapper userIC">
                            <input className="loginRegisterFormInput" type="text" placeholder="Username" name="username" onFocus={this.hideNotification} onBlur={this.validateUsername} required={true} />
                        </span>
						
                        <span className="loginRegisterFormInputWrapper passwordIC">
                            <input className="loginRegisterFormInput" type="password" placeholder="Password" name="password" onFocus={this.hideNotification} onBlur={this.validatePassword}  required={true} />
                        </span>
						
                        <span className="loginRegisterFormInputWrapper">
                            <input className="loginRegisterFormInput loginRegisterFormSubmit" type="submit" value="Login" />
                        </span>
						
					</form>

					<form id="registerForm" className="loginRegisterForm registerForm" action="/account/registerUser" onSubmit={this.formSubmitHandle}>

                        <span className="loginRegisterFormInputWrapper userIC">
                            <input className="loginRegisterFormInput" type="text" placeholder="Username" name="username" onFocus={this.hideNotification} onBlur={this.validateUsername} required={true}/>
                        </span>

                        <span className="loginRegisterFormInputWrapper emailIC">
                            <input className="loginRegisterFormInput" type="email" placeholder="Email" name="email" onFocus={this.hideNotification} onBlur={this.validateEmail} required={true}/>
                        </span>

                        <span className="loginRegisterFormInputWrapper passwordIC">
                            <input className="loginRegisterFormInput passwordIC" type="password" placeholder="Password" name="password" onFocus={this.hideNotification} onBlur={this.validatePassword} required={true}/>
                        </span>					

                        <span className="loginRegisterFormInputWrapper">
                            <input className="loginRegisterFormInput loginRegisterFormSubmit" type="submit" value="Register" />
                        </span>

					</form>

				</div>

			</div>
		)
	}

	/*
	 * Handle login/register fetch requests to server 
	 */
	private fetchFormdata = (url: string = "", data: object = {}) => {

		fetch(url, {
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
            })
            .then(res => res.json())
            .then((obj) => {

                if( (typeof obj.loggedIn !== "undefined" && obj.loggedIn) || (typeof obj.registered !== "undefined" && obj.registered) ) {
                    // user logged in or registered!!!
                    const loginFormElem: any = document.getElementById("loginForm");
                    const registerFormElem: any = document.getElementById("registerForm");

                    loginFormElem.remove();
                    registerFormElem.remove();

                    // notify we are logged in now
                    return Events.dispatch(EventType.LOG_IN, {data: obj});
                                        
                }
                
                this.showNotificationPopup(obj.msg);
                
            })
			.catch(error => console.error(error));
			
    }

    /*
     * Show notification with dedicated message with in it
     */
    private showNotificationPopup = (message: string) => {
        this.setState({
            notificationMessage: message,
            showNotification: true
        });
    }

    /*
     * Hide notification element by changing state of it, only if it is shown
     */
    private hideNotification = () => {
        if(this.state.showNotification) {
            this.setState({
                showNotification: false
            });
        }
    }

	/*
	 * Login/Register form submit handler
	 */
	private formSubmitHandle = (event: React.FormEvent) => {
		event.preventDefault();

		const form: any = event.target;
		const data = new FormData(form);
		const userdata: any = {};

		for (const name of data.keys()) {
			userdata[name] = data.get(name);
		}

		this.fetchFormdata(form.action, userdata);
	}

	/*
	 * Validate username by checking if field is not empty
	 */
	private validateUsername = (event: any) => {
		if(event.target.value.length === 0) {
            this.showNotificationPopup('Please enter username');
        }
	}

	/*
	 * Validate email format
	 */
	private validateEmail = (event: any) => {
		const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/;

		if(!event.target.value.match(mailformat)) {
            this.showNotificationPopup('You have entered an invalid email address');
        }
	}

	/*
	 * Validate password format not to be shorther than 8 characters
	 */
	private validatePassword = (event: any) => {
		if(event.target.value.length < 8) {
            this.showNotificationPopup('Password must be at least 8 characters');
        }
	}

	/*
	 * Toggle login or register form button handler
	 * update state to set correct style class
	 */
	private toggleLoginRegister = (event: any) => {
        const activeLogin = (event.target.dataset.activeOption === "true");

        this.setState({
            activeLoginOption: activeLogin,
            showNotification: false
        });
        
	}
}