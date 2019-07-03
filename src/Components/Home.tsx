import * as React from "react";
// import * as ReactDOM from 'react-dom';
// import { Route, BrowserRouter as Router, Link } from 'react-router-dom';


export default class Home extends React.Component {

	constructor(props: Object){
		super(props);

		this._loadLatestAds();

	}

	_loadLatestAds = () => {
		fetch("/ads/load", { method: 'GET' })
		.then(res => res.json())
		.then((obj) => {
			console.log("ADs ", obj);
		})
		.catch(error => console.error(error));
	}

	render() {
	  	return (
			<div>
			<h4>Latest ads</h4>


			</div>
		);
	}
}