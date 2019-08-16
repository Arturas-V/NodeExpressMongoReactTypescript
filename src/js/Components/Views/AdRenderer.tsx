import * as React from "react";

interface IProps { adData: object }

export default class AdRenderer extends React.Component<IProps> {

	public props = {
        adData: {
            description: "",
            price: "",
            title: ""
        }
    }

    constructor(props: any) {
        super(props);

        this.props = props;
    }

	public render() {
	  	return (
            <div className="listItem">
                <h4 className="listItemTitle">{this.props.adData.title}</h4>
                <p className="listItemPrice">{this.props.adData.price}</p>
                <p className="listItemDescrition">{this.props.adData.description}</p>
            </div>      
		);
	}
}