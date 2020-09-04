import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {addTaskThunk, deleteTaskThunk, getTasksThunk, 
    selectTaskAC, updateTaskThunk, updateTaskTitleThunk} from "../../../../redux/tasksReducer";
import Tasks from "./Tasks";
import {reset} from "redux-form";

const ToDoListContainer = ({ match }) => {
    const todolistId = match.params.listId;
    const dispatch = useDispatch();
    const items = useSelector(state => state.tasks.items);
    const totalCount = useSelector(state => state.tasks.totalCount);
    const currentPage = useSelector(state => state.tasks.currentPage);
    const selectedItem = useSelector(state => state.tasks.selectedItem);
    const isFetching = useSelector(state => state.tasks.isFetching);

    useEffect(() => {
        dispatch(getTasksThunk(todolistId, 20, 1));
    }, [todolistId])

    const updateTask = (taskData) => dispatch(updateTaskThunk(taskData));
    const resetForm = (form) => dispatch(reset(form));
    const updateTaskTitle = (todolistId, task, newTitle) => dispatch(updateTaskTitleThunk(todolistId, task, newTitle));
    const deleteTask = (todolistId, taskId) => dispatch(deleteTaskThunk(todolistId, taskId));
    const selectTask = (taskId) => dispatch(selectTaskAC(taskId));
    const addTask = (todolistId, title) => dispatch(addTaskThunk(todolistId, title));

    return (
        <Tasks
            resetForm={resetForm}
            isFetching={isFetching}
            updateTask={updateTask}
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


export default withRouter(ToDoListContainer)