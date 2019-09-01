import * as React from "react";
import Navigation from "./Components/Navigation";
import AdRenderer from "./Views/AdRenderer";

import { connect } from "react-redux";

import "../../../styles/Listing/List.css";

interface IState { 
    adsData: object
}

interface IProps {
    userData: {
        id: ""
    }
}

class MyAds extends React.Component<IProps, IState> {

	public state: IState = {
        adsData: {}
    }    

    public props: IProps = {
        userData: {
            id: ""
        }
    }
    
    private loadLatestAds = () => {
        console.log("BBB ", this.props.userData);

        if( this.props.userData.id === "" ) {
            return;
        }

		return fetch("/ads/load?owner=" + this.props.userData.id, { method: 'GET' })
		.then(res => res.json())
		.then((obj) => {
			this.setState({
				adsData: obj.ads
			});
		})
		.catch(error => console.error(error));
    }
    
    public componentDidMount = () => {
        this.loadLatestAds();
    }

    public componentDidUpdate = () => {
        console.log("UPDATE ", this.state.adsData);

        const ads: any = Object.values(this.state.adsData);
        
        if( ads.length > 0 ) {
            return;
        }
        this.loadLatestAds();
    }

    public render() {

        const ads: any = Object.values(this.state.adsData);
        const newAds = [];

        console.log("AAA ", this.state.adsData);

        if ( ads.length > 0 ) {
            return (
                <div className="accountPage">

                    <p>Nothing here</p>

                </div>
            )
        }
        
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

}

// map redux state to component properties 
// so that component can be updated upon redux state update
const mapStateToProps = (state: any) => ({
	userData: state.userState.userData
});

export default connect( mapStateToProps, { } )(MyAds);