import * as React from "react";
import { NavLink } from "react-router-dom";


// style imports
import "./../../../../styles/Account/Navigation.css"

export default class Navigation extends React.Component {

    public render() {

        return (
            <div className="accountNavigation">
                <NavLink exact={true} className="accountNavigation-Link" activeClassName="accountNavigation-Link_Active" to="/account">My profile</NavLink>
                <NavLink exact={true} className="accountNavigation-Link" activeClassName="accountNavigation-Link_Active" to="/account/my-ads">My ads</NavLink>
                <NavLink exact={true} className="accountNavigation-Link" activeClassName="accountNavigation-Link_Active" to="/account/post-ad">Post ad</NavLink>
            </div>
            
        )

    }
    
}