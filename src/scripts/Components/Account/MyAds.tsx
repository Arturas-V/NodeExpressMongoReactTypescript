import * as React from "react";
import Cookies from "../../Utils/Cookies";
import Navigation from "./Components/Navigation";
import AdRenderer from "./Views/AdRenderer";

import "../../../styles/Listing/List.css";

interface IState { adsData: object }

export default class MyAds extends React.Component<{}, IState> {

	public state = {
		adsData: {}
    }
    
    private cookie = "";

	constructor(props: object){
		super(props);

        this.cookie = Cookies.getCookieValue("dollar");
        this.loadLatestAds();
        
	}

    public render() {

        if(this.cookie === "0" || this.cookie === "") {
            return (
                <div className="accountPage">

                    <p>Nothing here</p>

                </div>
            )
        }

        const ads: any = Object.values(this.state.adsData);
        const newAds = [];
        
        for (let i=0; i<ads.length; i++){
            newAds.push(<AdRenderer key={i} adData={ads[i]} />);
        }

        return (
            <div className="accountPage">

                <h2>My Ads</h2>
                
                <Navigation/>

                <div className="listItems">
                    {newAds}    
                </div>
            
            </div>
        )
    }

    private loadLatestAds = () => {

		fetch("/ads/load?owner=" + this.cookie, { method: 'GET' })
		.then(res => res.json())
		.then((obj) => {
			this.setState({
				adsData: obj.ads
			});
		})
		.catch(error => console.error(error));
	}

}