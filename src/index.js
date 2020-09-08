import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MomentUtils from '@date-io/moment';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import store from './redux/reduxStore';

import App from './App';

import './index.css';

const MainApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </Provider>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
  document.getElementById('root')
);
