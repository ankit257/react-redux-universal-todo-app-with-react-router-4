import fetch from 'isomorphic-fetch'

export const LOADED_TODOS = 'LOADED_TODOS';
export const LOADED_TODO = 'LOADED_TODO';
export const REMOVED_TODO = 'REMOVED_TODO';
export const TOGGELED_TODO = 'TOGGELED_TODO';

export function loadTodos() {
   return function(dispatch, getState) {
      fetch('http://localhost:3000/api/todos')
      .then(response => response.json(),
      		error => console.log(error))
      .then(json => dispatch({ type: LOADED_TODOS, data: json }));
  }
}

export function loadTodo(id) {
   return function(dispatch, getState) {
      fetch(`http://localhost:3000/api/todos/${id}`)
      .then(response => response.json(),
      		error => console.log(error))
      .then(json => dispatch({ type: LOADED_TODO, data: json }));
  }
}

export function addTodo(text) {
   return function(dispatch, getState) {
   	let form = new FormData();
	form.append('text', text);
      fetch(`http://localhost:3000/api/addtodo`,
      	{
		  method: "POST",
		  headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({text: text})
		})
      .then(response => response.json(),
      		error => console.log(error))
      .then(json => dispatch({ type: LOADED_TODOS, data: json }));
  }
}


export function removeTodo(id) {
   return function(dispatch, getState) {
      fetch(`http://localhost:3000/api/removetodo/${id}`)
      .then(response => response.json(),
      		error => console.log(error))
      .then(json => dispatch({ type: REMOVED_TODO, data: json }));
  }
}

export function toggleDone(id) {
	return function(dispatch, getState) {
      fetch(`http://localhost:3000/api/toggletodo/${id}`)
      .then(response => response.json(),
      		error => console.log(error))
      .then(json => dispatch({ type: TOGGELED_TODO, data: json }));
  }
}
