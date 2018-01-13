import path from 'path'
import Express from 'express'
import bodyParser from 'body-parser'

import qs from 'qs'
import React from 'react'
import  { match, RoutingContext } from 'react-router'
import webpack from 'webpack'
import config from './webpack.config'
import configureStore from './app/store/configureStore'
import createMemoryHistory from 'history/createMemoryHistory'
import { StaticRouter, Switch, Route, matchPath } from 'react-router'
import render from './render'
import fetch from 'node-fetch'
import App from './app/containers/App'
import TodoPage from './app/containers/TodoPage'
import { Provider } from 'react-redux'

const port = process.env.PORT || 3000;

let todos = [{id: 1, text: 'Go out', done: false},
			 {id: 2, text: 'Have Fun', done: false},
			 {id: 3, text: 'Buy Fruits', done: false}]

let app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	hot: false, 
	noInfo: true,
	publicPath: config.output.publicPath,
	stats: {
		colors: true
	}
}));

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

app.use('/assets', Express.static(__dirname+'assets'));

app.get('/api/todos', (req, res)=>{
	res.json({todos: todos});
});

app.get('/api/toggletodo/:todoid', (req, res)=>{
	let todoId = req.params.todoid;
	let todo;
	todos.map(function(e, index){
		if(e.id === parseInt(todoId)){
			todos[index].done = !todos[index].done;
		}
	});
	res.json({todos: todos});
});
app.get('/api/removetodo/:todoid', (req, res)=>{
	let todoId = req.params.todoid;
	let todo;
	todos.map(function(e, index){
		if(e.id === parseInt(todoId)){
			todos.splice(index, 1);
		}
		e.id = index;
	});
	res.json({todos: todos});
});
app.get('/api/todos/:todoid', (req, res)=>{
	let todoId = req.params.todoid;
	let todo;
	todos.map(function(e){
		if(e.id === parseInt(todoId)){
			todo = e;
		}
	});
	res.json({activeTodo: todo});
});

app.post('/api/addtodo', (req, res)=>{
	todos.push({id: todos.length+1, text: req.body.text, done: false});
	res.json({todos: todos});
});

function getAllTodos(params) {
	return fetch('http://localhost:3000/api/todos')
	.then(r=>r.json())
	.then(data => {
		return data;
	})
}
function getTodo(params) {
	let todoId = params.params.todoid;
	return fetch(`http://localhost:3000/api/todos/${todoId}`)
	.then(r=>r.json())
	.then(data => {
		return data;
	})
}

const routes = [
	{ path: '/',
	    component: App,
	    loadData: (params) => getAllTodos(params),
	},
	{ path: '/todo/:todoid',
	    component: TodoPage,
	    loadData: (params) => getTodo(params),
	},
];

app.get('/favicon.ico', (req, res, next) => {

})

app.get('*', (req, res, next) => {
	let history = createMemoryHistory();
	
	const match = routes.reduce((acc, route) => matchPath(req.url, route, { exact: true }) || acc, null);
    if (!match) {
        res.status(404).send(render(<div>No match found</div>));
        return;
    }
    const promises = [];

	routes.some(route => {
	  const match = matchPath(req.url, route)
	  if (match && match.isExact)
	  { 
		promises.push(route.loadData(match))
	  }
	});
	Promise.all(promises).then((data)=>{
		const store = configureStore(data[0]);
		const finalState = store.getState()
        res.status(200).send(render(
            (
            	<Provider store={store}>
				  <div>
					<StaticRouter context={{}} location={req.url}>
						<Switch>
							<Route path="/todo/:id" component={TodoPage} />
							<Route path="/" component={App}/>
				  		</Switch>
					</StaticRouter>
				</div>
                </Provider>
            ),  finalState
        ));
	});
});

app.listen(port , (err) => {
	if(err)
		console.log(err)
	console.log(`Express serever 🌏 started listening on ${port}`);
});