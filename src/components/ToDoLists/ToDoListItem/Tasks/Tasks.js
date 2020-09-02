import React, {useState} from "react";
import {Container} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Task from "./Task/Task";
import List from "@material-ui/core/List";
import s from "./TaskList.module.css";
import TaskDetails from "./Task/TaskDetails/TaskDetails";
import Grid from "@material-ui/core/Grid";
import TaskList from "./TaskList";


const Tasks = ({items, totalCount, currentPage, todolistId, addTask, updateTask, resetForm,
                   selectTask, selectedItem, deleteTask, updateTaskTitle}) => {
    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <TaskList
                        updateTaskTitle={updateTaskTitle}
                        deleteTask={deleteTask}
                        selectedItemId={selectedItem.id}
                        selectTask={selectTask}
                        items={items}
                        totalCount={totalCount}
                        currentPage={currentPage}
                        todolistId={todolistId}
                        addTask={addTask}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TaskDetails
                        // resetForm={resetForm}
                        updateTask={updateTask}
                        selectedItem={selectedItem}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Tasks;