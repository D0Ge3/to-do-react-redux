// Я топлю за то, чтобы импорты были структурированы и не превращались в кашу, покажу на примере этого компонента

// Сналача я ставлю импорты из внешних библиотек
import React, { useEffect } from 'react';
import { Switch, Redirect, Route, BrowserRouter } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// Потом какие-нибудь утилзы, например, стор и редьюсеры
import store from './redux/reduxStore';
import { initializeApp } from './redux/appReducer';

// Потом компоненты
import Login from './components/Login/Login';
import ListListsContainer from './components/ListLists/ListListsContainer';
import Preloader from './components/common/Preloader';
import Header from './components/Header/Header';
import TasksContainer from './components/Tasks/TasksContainer';
import Alert from './components/common/Alert';

// В конце локальные файлы внутри директории
import './App.css';

let App = () => {
  const dispatch = useDispatch();
  const isInitialized = useSelector((state) => state.app.isInitialized);
  const error = useSelector((state) => state.app.error);

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  return (
    <>
      {error && <Alert message={error} />}
      <Header />
      {!isInitialized && <Preloader size="200px" isCenter={true} />}
      {isInitialized && (
        <Switch>
          <Route path={'/login'}>
            <Login />
          </Route>
          <Route path={'/todo/:listId'}>
            <TasksContainer />
          </Route>
          <Route path={'/todo'}>
            <ListListsContainer />
          </Route>
          <Redirect from="/" to="/todo" />
        </Switch>
      )}
    </>
  );
};

// Обычно в App.js нет особо логики, можно тут оставить роутер, а 'MainApp' полностью перенести в index.js
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
export default MainApp;
