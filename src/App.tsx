import * as React from "react";
// import { Provider } from "react-redux";

// Components
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import { BrowserRouter } from "react-router-dom";
// import store from './store'


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