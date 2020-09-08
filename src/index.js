import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './App';

ReactDOM.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
  document.getElementById('root')
);

/* В теории можно подключить линтер eslint, настроить его, чтобы он сам форматировал код. Юзается буквально везде, полезно знать) */
