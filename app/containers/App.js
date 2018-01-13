import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Explore from '../components/Explore'
import { withRouter } from 'react-router-dom'
import { loadTodos, addTodo, removeTodo, toggleDone } from '../actions/loadtodos';

let inputValue;

class App extends Component{
	static propTypes = {
	    errorMessage: PropTypes.string,
	    todos: PropTypes.array,
	    dispatch: PropTypes.func.isRequired
	}
	async componentWillMount(props){
		const { dispatch } = this.props
		dispatch(loadTodos());
	}
	handleDismissClick = e => {
		this.props.resetErrorMessage();
		e.preventDefault();
	}
	handleChange = nextValue => {
		inputValue = nextValue;
	}
	renderErrorMessage() {
		const { errorMessage } = this.props
		if (!errorMessage) {
		  return null
		}
		return (
		  <p style={{ backgroundColor: '#e99', padding: 10 }}>
		    <b>{errorMessage}</b>
		    {' '}
		    <button onClick={this.handleDismissClick}>
		      Dismiss
		    </button>
		  </p>
		)
	}
	addTodo(){
		if(inputValue && inputValue.length > 0){
			const { dispatch } = this.props
			dispatch(addTodo(inputValue));
		}

	}
	toggleDone(id){
		const { dispatch } = this.props;
		dispatch(toggleDone(id));
	}
	removeTodo(id){
		const { dispatch } = this.props;
		dispatch(removeTodo(id));
	}
	renderTodos(todos){
		let c = []
		for (let key in todos){
			if(key !== 'todos'){
				let todoClass = '';
				if(todos[key].done){
					todoClass = 'done';
				}
				c.push(
						<li key={todos[key].id} className={todoClass}>
							<span className="label">
								<a href={`/todo/${todos[key].id}`}>{todos[key].text}</a>
							</span>
							<div className="actions">
						          <button className="btn-picto" type="button" 
						          onClick={this.toggleDone.bind(this, todos[key].id)}>
						            <i aria-hidden="true" className="material-icons">{ todos[key].done ? 'check_box' : 'check_box_outline_blank' }</i>
						          </button>
						          <button className="btn-picto" type="button" 
						          onClick={this.removeTodo.bind(this, todos[key].id)}>
						            <i aria-hidden="true" className="material-icons">delete</i>
						          </button>
					        </div>
					    </li>
					)
			}
		}
		return(
			<ul>{c}</ul>
		)
	}
	render() {
		var that = this;
		const { todos, inputValue } = that.props;
		if(todos && todos.length > 0){
			return (
				<div>
				    <main id="todolist">
					  <h1>
					    Todo List
					    <span>Get things done, one item at a time.</span>
					  </h1>
					  
					   {that.renderErrorMessage()}
			    		{that.renderTodos(todos)}

					  <form name="newform">
					    <label htmlFor="newitem">Add to the todo list</label>
					    <Explore value={inputValue} onChange={that.handleChange} />
					    <button type="button">
					    	<span onClick={this.addTodo.bind(this)}>Add Item</span>
					    </button>
					  </form>
					</main>
				  </div>
			)	
		}else{
			return null;
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	const todos = state.todos;
  	const errorMessage = state.errorMessage;
  	const inputValue = ownProps.location.pathname.substring(1);
	return {
		todos,
		errorMessage,
		inputValue	
	}
}
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})
export default withRouter(connect(mapStateToProps)(App))