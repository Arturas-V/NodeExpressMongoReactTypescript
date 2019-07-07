import * as React from "react";

// Components
import Header from "./scripts/Components/Header";
import Main from "./scripts/Components/Main";
import Footer from "./scripts/Components/Footer";
import { BrowserRouter } from "react-router-dom";


//style imports
import "./styles/Fonts.css";
import "./styles/Config.css";
import "./styles/Icons.css";
import "./styles/App.css";

export default class App extends React.Component {

	render() {
		return(
            <React.Fragment>
                <BrowserRouter>
                    <Header />
                    <Main />
                    <Footer />
                </BrowserRouter>
            </React.Fragment>
		)		
	}
}