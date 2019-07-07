import * as React from "react";
import AdsRenderer from "./Views/AdsRenderer";

import "../../styles/Home/Home.css";

type State = { adsData: Object }
type Props = {}


export default class Home extends React.Component<Props, State> {

	state = {
		adsData: {}
	}

	constructor(props: Object){
		super(props);

		this._loadLatestAds();
	}

	_loadLatestAds = () => {
		fetch("/ads/load", { method: 'GET' })
		.then(res => res.json())
		.then((obj) => {
			this.setState({
				adsData: obj.ads
			});
		})
		.catch(error => console.error(error));
	}

	render() {
		
			return (
				<div className="homepageView">
					<h4 className="homepageViewTitle">Latest ads</h4>
					<AdsRenderer adsData={this.state.adsData} />
				</div>
			);

	}
}