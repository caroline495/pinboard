import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import sessionReducer from './sessionReducer';
import pinReducer from './pinReducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    pins: pinReducer
});


const configureStore = (initialState = {}) => {
    return legacy_createStore(rootReducer, initialState, applyMiddleware(thunk, logger));
};

export default configureStore;