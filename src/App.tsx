import * as React from "react";
// import { Provider } from "react-redux";

// Components
import Header from './Components/Header'
import Main from './Components/Main'
import Footer from './Components/Footer'
import { BrowserRouter } from 'react-router-dom';
// import store from './store'

// style imports
// import './App.css';

export default class App extends React.Component {

    // state = {users: []}

    // componentDidMount() {
    //     fetch('/account/getuser')
    //       .then(res => res.json())
    //       .then(users => this.setState({ users }));
    //   }

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