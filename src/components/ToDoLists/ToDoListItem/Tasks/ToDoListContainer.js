import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {Container} from "@material-ui/core";
import {compose} from "redux";
import {connect} from "react-redux";
import {addTask, deleteTask, getTasks, selectTask, updateTaskTitle} from "../../../../redux/tasksReducer";
import Tasks from "./Tasks";

const ToDoListContainer = ({items, totalCount, currentPage, getTasks,
                               match, addTask, selectTask, selectedItem, deleteTask, updateTaskTitle}) => {
    const todolistId = match.params.listId;
    useEffect(() => {
        getTasks(todolistId, 20, 1);
    }, [])

    return (
        <Tasks
            updateTaskTitle={updateTaskTitle}
            deleteTask={deleteTask}
            selectedItem={selectedItem}
            selectTask={selectTask}
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
        currentPage: state.tasks.currentPage,
        selectedItem: state.tasks.selectedItem
    }
}

export default compose(
    connect(mapStateToProps,{getTasks, addTask, selectTask, deleteTask, updateTaskTitle}),
    withRouter
)(ToDoListContainer);