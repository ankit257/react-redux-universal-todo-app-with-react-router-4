import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import routes from '../routes';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import TodoPage from './TodoPage';

// import DevTools from './DevTools' See react redux todo example for devtools

const Root = ({ store, history }) => (
	<Provider store={store}>
		<div>
			<BrowserRouter>
				<Switch>
					<Route path="/todo/:id" component={TodoPage} />
					<Route path="/" component={App}/>
		  		</Switch>
			</BrowserRouter>
		</div>
	</Provider>
);
Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root