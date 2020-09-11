import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import authReducer from './reducers/authReducer'
import appReducer from './reducers/appReducer'
import toDoListsReducer from './reducers/toDoListsReducer'
import tasksReducer from './reducers/tasksReducer'

let reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  toDoLists: toDoListsReducer,
  tasks: tasksReducer,
  form: formReducer,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

window.store = store

export default store