import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {Container} from "@material-ui/core";
import {compose} from "redux";
import {connect} from "react-redux";
import {addTask, getTasks} from "../../../../redux/tasksReducer";
import Tasks from "./Tasks";

const ToDoListContainer = ({items, totalCount, currentPage, getTasks, match, addTask}) => {
    const todolistId = match.params.listId;
    useEffect(() => {
        getTasks(todolistId, 5, 1);
    }, [])

    return (
        <Tasks
            addTask={addTask}
            todolistId={todolistId}
            items={items}
            totalCount={totalCount}
            currentPage={currentPage}
        />)
}

const mapStateToProps = (state) => {
    return {
        items: state.tasks.items,
        totalCount: state.tasks.totalCount,
        currentPage: state.tasks.currentPage
    }
}

export default compose(
    connect(mapStateToProps,{getTasks, addTask}),
    withRouter
)(ToDoListContainer);