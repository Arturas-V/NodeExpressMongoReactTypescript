import * as React from "react";
import AdsRenderer from "./Views/AdsRenderer";

import "../../styles/Home/Home.css";

interface IState { adsData: object }

export default class Home extends React.Component<{}, IState> {

	public state = {
		adsData: {}
	}

	constructor(props: object){
		super(props);

		this.loadLatestAds();
	}

	public render() {
		
		return (
			<div className="homepageView">
				<h4 className="homepageViewTitle">Latest ads</h4>
				<AdsRenderer adsData={this.state.adsData} />
			</div>
		);

	}

	private loadLatestAds = () => {
		fetch("/ads/load", { method: 'GET' })
		.then(res => res.json())
		.then((obj) => {
			this.setState({
				adsData: obj.ads
			});
		})
		.catch(error => console.error(error));
	}
}