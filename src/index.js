import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import streamApp from './Reducers';
import {Filters} from './StreamActions';
import {Provider} from 'react-redux';

const initialState = {
	filter: Filters.ALL,
	streamBeingAdded: false,
	streams: [
		{
			id: 1,
			name: "ESL_SC2",
			// eslint-disable-next-line
			details: "Playing a gamePlaying a gamePlaying a gamePlaying a gamePlaying \
			a gamePlaying a gamePlaying a gamePlaying a gamePlaying a gamePlaying a game",
			verified: true,
			exists: true,
			online: true
		},
		{
			id: 2,
			name: "day9tv",
			details: "Something something dark side",
			verified: true,
			exists: true,
			online: false
		},
		{
			id: 3,
			name: "freecodecamp",
			details: "",
			verified: false,
			exists: false,
			online: false
		}
	]
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	streamApp, 
	initialState,
	composeEnhancers(applyMiddleware(thunkMiddleware))
);


ReactDOM.render(
	<Provider store={store}>
  		<App />
  	</Provider>,
  document.getElementById('root')
);
