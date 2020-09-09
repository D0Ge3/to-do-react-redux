import {applyMiddleware, createStore, combineReducers, compose} from 'redux'
import authReducer from './authReducer'
import {reducer as formReducer} from 'redux-form'
import thunkMiddleware from 'redux-thunk'
import appReducer from './appReducer'
import toDoListsReducer from './toDoListsReducer'
import tasksReducer from './tasksReducer'

let reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    toDoLists: toDoListsReducer,
    tasks: tasksReducer,
    form: formReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

window.store = store

export default store