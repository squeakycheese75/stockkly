import React from 'react';
import { render } from 'react-snapshot';
// import {  render } from "react-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <Route component={App} />
<<<<<<< HEAD
=======
      {/* <App /> */}
>>>>>>> 81df4629a7fd292d4612654a223fdb843ed1b8d1
    </Router>
  </ReduxProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
