import * as React from "react";
import AdRenderer from "./AdRenderer";

import "./../../../styles/Listing/List.css";

interface IProps { adsData: object }

export default class AdsRenderer extends React.Component<IProps> {

    public props = {
        adsData: {}
    }

    constructor(props: any){
        super(props);
        
        this.props = props;
    }

	public render() {

        const ads: any = Object.values(this.props.adsData);
        const newAds = []; 
        
        for (let i=0; i<ads.length; i++){
            newAds.push(<AdRenderer key={i} adData={ads[i]} />);
        }
        
        return (    
            <div className="listItems">
                {newAds}
            </div>
        );

	  	
	}
}