import { createSelector } from 'reselect';
import { csrfFetch } from '../utils/csrfUtils';
import { RECEIVE_BOARD } from './boardReducer';

// TYPES
export const RECEIVE_PIN = 'RECEIVE_PIN';
export const RECEIVE_PINS = 'RECEIVE_PINS';
export const REMOVE_PIN = 'REMOVE_PIN';


// ACTION CREATORS
export const receivePin = pin => ({
    type: RECEIVE_PIN,
    pin
})

export const receivePins = pins => ({
    type: RECEIVE_PINS,
    pins
})

export const removePin = pinId => ({
    type: REMOVE_PIN,
    pinId
})

// THUNK ACTION CREATORS
export const fetchPin = (pinId) => (dispatch, getState) => {
    return fetch(`/api/pins/${pinId}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then(data => dispatch(receivePin(data)))
}

export const fetchPins = () => dispatch => {
    return fetch(`/api/pins`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then(data => dispatch(receivePins(data)))
}

// we do not stringify formData
export const createPin = (postData) => dispatch => {
    return csrfFetch(`/api/pins`, {
        method: 'POST',
        // change to body: postData, headers: { 'Accept': 'application/json' } for formData 
        // body: JSON.stringify(postData),
        // headers: {
        //     'Content-Type': 'application/json'
        // }
        body: postData,
        headers: {
            'Accept': 'application/json'
        }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then(data => {
            dispatch(receivePin(data))
            return data
        })
}

export const updatePin = (postData) => dispatch => {
    return csrfFetch(`/api/pins/${postData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then(data => dispatch(receivePin(data)))
}

export const deletePin = (pinId) => dispatch => {
    return csrfFetch(`/api/pins/${pinId}`, { method: 'DELETE' })
        .then(() => dispatch(removePin(pinId)))
}

// SELECTORS
export const selectPins = createSelector(state => state.pins, pins => Object.values(pins));
export const selectPin = pinId => state => state.pins[pinId] ? state.pins[pinId] : null;

// REDUCER
const pinReducer = (state= {}, action) => {

    const nextState = { ...state}

    switch (action.type) {
        case RECEIVE_PIN:
            nextState[action.pin.id] = action.pin;
            return nextState;
        case RECEIVE_PINS:
            return action.pins;
        case REMOVE_PIN:
            delete nextState[action.pinId];
            return nextState;
        case RECEIVE_BOARD:
            return action.boardData.pins ||= nextState;
        default:
            return state;
    }
}

export default pinReducer;
