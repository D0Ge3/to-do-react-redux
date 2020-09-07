import React, {useEffect} from 'react';
import './App.css';
import {Switch, Redirect, Route, BrowserRouter} from "react-router-dom";
import Login from "./components/Login/Login";
import store from "./redux/reduxStore";
import {Provider, useSelector, useDispatch} from "react-redux";
import ListListsContainer from "./components/ListLists/ListListsContainer";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader";
import Header from "./components/Header/Header";
import TasksContainer from "./components/Tasks/TasksContainer";
import MomentUtils from "@date-io/moment";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import Alert from "./components/common/Alert";


let App = () => {
    const dispatch = useDispatch();
    const isInitialized = useSelector(state => state.app.isInitialized);
    const error = useSelector(state => state.app.error);

    useEffect(() => {
        dispatch(initializeApp());
    }, []);

    return (
        <>
            {error && <Alert message={error} />}
            <Header />
            {!isInitialized && <Preloader size="200px" isCenter={true} /> }
            {isInitialized && <Switch>
                <Route path={"/login"}>
                    <Login />
                </Route>
                <Route path={"/todo/:listId"}>
                    <TasksContainer />
                </Route>
                <Route path={"/todo"}>
                    <ListListsContainer />
                </Route>
                <Redirect from="/" to="/todo"/>
            </Switch>}
        </>
    );
}


const MainApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <App/>
                </MuiPickersUtilsProvider>
            </Provider>
        </BrowserRouter>
    )
}
export default MainApp;
