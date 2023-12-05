import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {ToastContainers} from "./components/toast/toastContainers";


ReactDOM.render(
	<Router>
		<App/>
		<ToastContainers/>
	</Router>,
	document.getElementById('root')
);
