import React, {useEffect} from 'react';
import './App.css';
import {Switch, Redirect, Route, BrowserRouter} from "react-router-dom";
import Login from "./components/Login";
import store from "./redux/reduxStore";
import {connect, Provider} from "react-redux";
import ToDoLists from "./components/ToDoLists/ToDoListsContainer";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader";
import Header from "./components/Header/Header";
import ToDoListContainer from "./components/ToDoLists/ToDoListItem/Tasks/ToDoListContainer";
import MomentUtils from "@date-io/moment";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";


let App = ({isInitialized, initializeApp}) => {
    useEffect(() => {
        initializeApp();
    }, []);

    if (!isInitialized) return <Preloader/>
    return (
        <>
            <Header />
            <Switch>
                <Route path={"/login"}>
                    <Login/>
                </Route>
                <Route path={"/todo/:listId"}>
                    <ToDoListContainer />
                </Route>
                <Route path={"/todo"}>
                    <ToDoLists/>
                </Route>
                <Redirect from="/" to="/todo"/>
            </Switch>
        </>
    );
}

const mapDispatchToProps = (state) => {
    return {
        isInitialized: state.app.isInitialized
    }
}

App = connect(mapDispatchToProps, {initializeApp})(App)

const MainApp = (props) => {
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
