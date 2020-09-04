import React, {useEffect} from "react";
import {Container} from "@material-ui/core";
import s from "./TaskList.module.css";
import TaskDetails from "./Task/TaskDetails/TaskDetails";
import Grid from "@material-ui/core/Grid";
import TaskList from "./TaskList";


const Tasks = ({items, totalCount, currentPage, todolistId, addTask, updateTask, isFetching,
                   selectTask, selectedItem, deleteTask, updateTaskTitle}) => {

    useEffect(() => () => selectTask(null), []);               
    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <TaskList
                        isFetching={isFetching}
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
                        todolistId={todolistId}
                        updateTaskTitle={updateTaskTitle}
                        updateTask={updateTask}
                        selectedItem={selectedItem}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Tasks;