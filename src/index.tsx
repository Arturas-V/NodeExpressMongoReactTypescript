import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
// import * as serviceWorker from './serviceWorker';

import { Provider } from "react-redux"; 
import store from "./js/Redux/store";

ReactDOM.render(    
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.getElementById('site')
)