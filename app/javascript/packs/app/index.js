import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import Routes from './routes';
import configureStore from './store';


// const store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    // <Provider store={store}>
      // <BrowserRouter>
        <Routes/>,
      // </BrowserRouter>
    // </Provider>,
    document.getElementById('app'),
  )
});
