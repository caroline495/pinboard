import { createSelector } from 'reselect';

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

export const createPin = (postData) => dispatch => {
    return fetch(`/api/pins`, {
        method: 'POST',
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

export const updatePin = (postData) => dispatch => {
    return fetch(`/api/pins/${postData.id}`, {
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
    return fetch(`/api/pins/${pinId}`, { method: 'DELETE' })
        .then(() => dispatch(removePin(pinId)))
}

// SELECTORS
export const selectPins = createSelector(state => state.pins, pins => Object.values(teas));


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
        default:
            return state;
    }
}

export default pinReducer;
