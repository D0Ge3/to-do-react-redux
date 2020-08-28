import React, {useEffect} from 'react';
import './App.css';
import {Switch, Redirect, Route, BrowserRouter} from "react-router-dom";
import Login from "./components/Login";
import store from "./redux/reduxStore";
import {connect, Provider} from "react-redux";
import ToDoLists from "./components/ToDoLists/ToDoListsContainer";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Header from "./components/Header/Header";


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
                <App/>
            </Provider>
        </BrowserRouter>
    )
}
export default MainApp;
