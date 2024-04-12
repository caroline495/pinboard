import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import sessionReducer from './sessionReducer';
import pinReducer from './pinReducer';
import boardReducer from './boardReducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    pins: pinReducer,
    boards: boardReducer
});


const configureStore = (initialState = {}) => {
    return legacy_createStore(rootReducer, initialState, applyMiddleware(thunk, logger));
};

export default configureStore;