import { csrfFetch } from "../utils/csrfUtils";
// TYPES
// what types of action do you want to do?
export const CREATE_SESSION = 'session/CREATE_SESSION';
export const DESTROY_SESSION = 'session/DESTROY_SESSION';


// ACTION CREATORS
export const createSession = sessionInfo => ({
    type: CREATE_SESSION,
    sessionInfo
})

export const destroySession = () => ({
    type: DESTROY_SESSION
})

// THUNK ACTION CREATORS
// thinking about what interactions am I going to have with database, session information 
export const createUser = userInfo => (dispatch, getState) => {
    return csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(userInfo)
      })
      .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw res;
        }
      })
      .then(data => {
        // we know to use data.user bc of what we are hitting at the backend (the show.json.jbuilder page,
        // which has the data nested in an outer key of user)
        // if you've just created a user, we should add to sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(data.user));
        dispatch(createSession(data.user));
      })
}

export const loginUser = sessionInfo => (dispatch, getState) => {
    return csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(sessionInfo)
      })
      .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw res;
        }
      })
      .then(data => {
        sessionStorage.setItem('currentUser', JSON.stringify(data.user));
        dispatch(createSession(data.user));
      })
}

export const logoutUser = () => (dispatch, getState) => {
    return csrfFetch('/api/session', {
        method: 'DELETE'
      })
      .then(res => {
        if (res.ok) {
            sessionStorage.removeItem('currentUser');
            dispatch(destroySession());
        } else {
            throw res;
        }
      })
}

// SELECTORS
export const selectCurrentUser = state => state.session; // either null or has a session


// REDUCER
const initialState = JSON.parse(sessionStorage.getItem('currentUser'));

// initial value of state will always match what you have in sessionStorage
const sessionReducer = (state = initialState, action) => {
    // when initialState is {} --> if you are logged in + refresh the page and do store.getState(), 
    // the session shows null even though still logged in in the backend.
    // still able to log that person out successfully
    const nextState = { ...state }

    switch (action.type) {
        case CREATE_SESSION:
            return action.sessionInfo;
        case DESTROY_SESSION:
            return null; //remove all session info from page so return null
        default:
            return state;

    }
}

export default sessionReducer;