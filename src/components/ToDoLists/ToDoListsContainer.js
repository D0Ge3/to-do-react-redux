import React, {useEffect} from "react";
import {connect} from "react-redux";
import {logout} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import {addNewToDoList, deleteToDoList, getToDoLists, updateToDoListTitle} from "../../redux/toDoListsReducer";
import ToDoLists from "./ToDoLists";

const ToDoListsContainer = ({logout, isAuth, getToDoLists, lists, addNewToDoList, isFetching,
                                deleteToDoList, updateToDoListTitle}) => {
    useEffect(() => {
        if (isAuth) {
            getToDoLists();
        }
    }, [])

    const addToDoList = (title) => {
        addNewToDoList(title);
    }

    if (!isAuth) return <Redirect to="/login"/>;
    return (
        <>
            <ToDoLists
                isFetching={isFetching}
                updateToDoListTitle={updateToDoListTitle}
                deleteToDoList={deleteToDoList}
                addToDoList={addToDoList}
                lists={lists} />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        lists: state.toDoLists.lists,
        isFetching: state.toDoLists.isFetching
    }
}

export default connect(mapStateToProps, {logout, getToDoLists, addNewToDoList, deleteToDoList, updateToDoListTitle})(ToDoListsContainer);