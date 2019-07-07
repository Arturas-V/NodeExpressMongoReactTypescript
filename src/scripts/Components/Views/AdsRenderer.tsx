import * as React from "react";
import AdRenderer from "./AdRenderer";

import "./../../../styles/Listing/List.css";

type Props = { adsData: Object }

export default class AdsRenderer extends React.Component<Props> {

    props = {
        adsData: {}
    }

    constructor(props: any){
        super(props);
        
        this.props = props;
    }

	render() {

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