import * as React from "react";

// Components
import { BrowserRouter } from "react-router-dom";
import Footer from "./scripts/Components/Footer";
import Header from "./scripts/Components/Header";
import Main from "./scripts/Components/Main";



// style imports
import "./styles/App.css";
import "./styles/Config.css";
import "./styles/Fonts.css";
import "./styles/Icons.css";


export default class App extends React.Component {

	public render() {
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