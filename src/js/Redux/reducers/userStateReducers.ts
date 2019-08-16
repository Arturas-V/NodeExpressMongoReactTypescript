import { LOGIN, LOGOUT } from "../actions/types";

const initialState = {
	loggedIn: false,
	authenticated: false
}

export default function(state = initialState, action: any) {

	switch (action.type) {

		case LOGIN:
			return {
				...state,
				loggedIn: action.payload
			}

		case LOGOUT:
			return {
				...state,
				loggedIn: action.payload
			}

		default:
			return state;

	}
}