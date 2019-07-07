import * as React from "react";

type Props = { adData: Object }

export default class AdRenderer extends React.Component<Props> {

	props = {
        adData: {
            title: "",
            price: "",
            description: ""
        }
    }

    constructor(props: any) {
        super(props);

        this.props = props;
    }

	render() {
	  	return (
            <div className="listItem">
                <h4 className="listItemTitle">{this.props.adData.title}</h4>
                <p className="listItemPrice">{this.props.adData.price}</p>
                <p className="listItemDescrition">{this.props.adData.description}</p>
            </div>      
		);
	}
}