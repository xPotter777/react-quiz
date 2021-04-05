import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './store/Redusers/rootReduser'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)

  )
);

const application = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)


ReactDOM.render(application, document.getElementById('root'));
