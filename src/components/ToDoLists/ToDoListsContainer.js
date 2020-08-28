import React, {useEffect} from "react";
import {connect} from "react-redux";
import {logout} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import {getToDoLists} from "../../redux/toDoListsReducer";
import ToDoLists from "./ToDoLists";

const ToDoListsContainer = ({logout, isAuth, getToDoLists, lists}) => {
    useEffect(() => {
        if (isAuth) {
            //getToDoLists();
        }
    }, [])
    if (!isAuth) return <Redirect to="/login"/>;
    return (
        <>
            <ToDoLists lists={lists} />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        lists: state.toDoLists.lists
    }
}

export default connect(mapStateToProps, {logout, getToDoLists})(ToDoListsContainer);