import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import configureStore from './store/store.js'
import { restoreSession } from './utils/csrfUtils.js'
import { postUser, postSession, deleteSession } from './utils/sessionApiUtils.js'
import { createUser, loginUser, logoutUser } from './store/sessionReducer.js'

const initializeApp = () => {
  const store = configureStore();

  //for testing purposes only
  window.store = store;
  window.postUser = postUser;
  window.postSession = postSession;
  window.deleteSession = deleteSession;
  window.createUser = createUser;
  window.loginUser = loginUser;
  window.logoutUser = logoutUser;


  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store} >
        <App />
      </Provider>
    </React.StrictMode>,
  )
}

// alternatively: might conditionally fire off restoresession (check for presence of token in sessionstorage, and only fire off restoresession if there is no token)
restoreSession().then(initializeApp);

