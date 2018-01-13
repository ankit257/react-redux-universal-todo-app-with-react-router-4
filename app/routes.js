import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import TodoPage from './containers/TodoPage';

const routes =  <Route path="/">
				  	<Route path="/todo/:id" component={TodoPage} />
				  	<Route path="/" component={App} />
				</Route>

export default routes;