import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.todos.
const todos = (state =  [], action) => {
  const { type, error } = action
  if(type === 'LOADED_TODOS' || type === 'REMOVED_TODO' || type  === 'TOGGELED_TODO'){
    if (action.data && action.data.todos) {
      let newState = merge({}, state);
      newState.todos = action.data.todos;
      return newState.todos;
    }
  }
  return state
}
const activeTodo = (state =  [], action) => {
  const { type, error } = action
  if(type === 'LOADED_TODO'){
    if (action.data && action.data.todo) {
      let newState = merge({}, state);
      newState.activeTodo = action.data.todo;
      return newState.activeTodo;
    }
  }
  return state
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action
  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }
  return state
}

const rootReducer = combineReducers({
  activeTodo,
  todos,
  errorMessage,
  routing
})

export default rootReducer
