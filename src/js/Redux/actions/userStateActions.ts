import { LOGIN, LOGOUT, LOGGEDOUT, LOGGEDIN } from "./types";

export const login = (obj? : object) => (dispatch: any) => {
	dispatch({
		type: LOGIN,
		payload: true
	});
}	

export const logout = () => (dispatch: any) => {

	fetch("/account/logout", { 
		method: 'POST'
		})
		.then(res => res.json())
		.then((obj) => {
			dispatch({
				type: LOGOUT,
				payload: false
			});
		})
		.catch(error => console.error(error));

}

export const loggedIn = (obj: object) => (dispatch: any) => {
	dispatch({
		type: LOGGEDIN,
		payload: obj
	});
}

export const loggedOut = () => (dispatch: any) => {
	dispatch({
		type: LOGGEDOUT,
		payload: false
	});
}	