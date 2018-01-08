import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, appMiddleware} from  'redux';
import reducer from './reducers/reducers.js';
import App from './components/app.jsx';
import data from './data/data.js';
import  './styles.less';
import {persistedState, saveState} from './data/localStorage.js'

 const store = createStore(reducer, persistedState);
 store.subscribe(() => {
	 //console.log(store.getState());
	 saveState(store.getState());
	 
 })

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('app')
);
