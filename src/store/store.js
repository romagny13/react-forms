import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// reducers
import users from '../reducers/userReducer';

export default createStore(
    combineReducers({ users }),
    {},
    applyMiddleware(thunk)
);