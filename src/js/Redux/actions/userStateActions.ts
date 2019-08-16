import { LOGIN, LOGOUT } from "./types";

export const login = () => (dispatch: any) => {
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