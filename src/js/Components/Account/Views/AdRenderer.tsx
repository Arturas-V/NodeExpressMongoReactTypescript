import * as React from "react";

interface IProps { adData: {
        _id: string,
        description: string,
        price: string,
        title: string
    }
}

export default class AdRenderer extends React.Component<IProps> {

	public props = {
        adData: {
            _id: "",
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
              <span onClick={this.editAd}>Edit ad</span>
              <span onClick={this.deleteAd}>Delete ad</span>
          </div>      
      );
  }

    private deleteAd = () => {
        fetch("/ad/delete?id=" + this.props.adData._id, { method: 'POST' })
        .then(res => res.json())
		.then((obj) => {
			this.setState({
				adsData: obj.ads
			});
		})
		.catch(error => console.error(error));
    }

    private editAd = () => {
        // this is test
    }

	
}