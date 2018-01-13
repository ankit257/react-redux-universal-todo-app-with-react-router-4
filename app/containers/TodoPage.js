import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Explore from '../components/Explore'
import { withRouter } from 'react-router-dom'
import { resetErrorMessage } from '../actions'
import { loadTodo, removeTodo, toggleDone } from '../actions/loadtodos';
import { push } from 'react-router-redux'

class TodoPage extends Component{
	static propTypes = {
	    errorMessage: PropTypes.string,
	    inputValue: PropTypes.string.isRequired,
	    dispatch: PropTypes.func.isRequired,
	    children: PropTypes.node
	}
	componentWillMount(){
		const { dispatch } = this.props
		dispatch(loadTodo(this.props.match.params.id));
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.todos){
			this.props.history.push('/');		
		}
	}
	removeTodo(id){
		const { dispatch } = this.props
		dispatch(removeTodo(this.props.match.params.id));
	}
	toggleDone(id){
		const { dispatch } = this.props;
		dispatch(toggleDone(id));
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
	render() {
		const { children, inputValue, activeTodo } = this.props;
		let todoClass = activeTodo.done ? 'done' : '';
		return (
		  <div>
		  	<main id="todolist">
				  <h1>
				    Todo List
				    <span>Get things done, one item at a time.</span>
				  </h1>
				  <ul>
				   <li key={activeTodo.id} className={todoClass}>
						<span className="label">
							{this.props.activeTodo.text}
						</span>
						<div className="actions">
							<button className="btn-picto" type="button" onClick={this.toggleDone.bind(this, activeTodo.id)}>
							<i aria-hidden="true" className="material-icons">{ activeTodo.done ? 'check_box' : 'check_box_outline_blank' }</i>
							</button>
							<button className="btn-picto" type="button" onClick={this.removeTodo.bind(this, activeTodo.id)}>
							<i aria-hidden="true" className="material-icons">delete</i>
							</button>
				        </div>
				    </li>
		    		</ul>
				</main>
		  </div>
		)
	}

}
const mapStateToProps = (state, ownProps) => {
	const activeTodo = state.activeTodo;
	const todos = state.todos;
  	const errorMessage = state.errorMessage;
  	const inputValue = ownProps.location.pathname.substring(1);
	return {
		todos,
		activeTodo,
		errorMessage,
		inputValue	
	}
}
export default withRouter(connect(mapStateToProps)(TodoPage))