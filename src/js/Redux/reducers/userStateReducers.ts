import { LOGIN, LOGOUT, LOGGEDOUT, LOGGEDIN } from "../actions/types";

const initialState = {	
	loggedIn: false,
	userData: {
        email: "",
        id: "",
        username: ""
    }
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

		case LOGGEDOUT:
			return {
				...state,
				loggedIn: action.payload
			}

		case LOGGEDIN:
			return {
				...state,
				loggedIn: action.payload.loggedIn,
				userData: {
					email: action.payload.email,
					id: action.payload.id,
					username: action.payload.username
				}
			}

		default:
			return state;

	}
}