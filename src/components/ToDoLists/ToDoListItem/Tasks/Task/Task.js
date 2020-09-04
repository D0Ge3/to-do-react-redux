import React, {useState} from "react";
import ListItemText from "@material-ui/core/ListItemText";
import s from "./Task.module.css";
import {TextField} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";


const Task = ({task, selectTask, selectedItemId, deleteTask, todolistId, updateTaskTitle}) => {
    let [editMode, setEditMode] = useState(false);
    let [newTitle, setNewTitle] = useState(task.title);
    const onChangeTitle = e => setNewTitle(e.target.value);
    const saveNewTitle = () => {
        updateTaskTitle(todolistId, task, newTitle);
        setEditMode(false);
    }
    return (
        <ListItem selected={selectedItemId === task.id}  button onClick={() => selectTask(task.id)}>
            <ListItemText >
                {editMode && <TextField className={s.taskEditInput} size="small" onChange={onChangeTitle} value={newTitle} autoFocus onBlur={saveNewTitle}/>}
                {!editMode && <span onClick={() => setEditMode(true)}>{task.title}</span>}
            </ListItemText>
            <DeleteOutline onClick={() => deleteTask(todolistId, task.id)} className={s.deleteBtn}/>
        </ListItem>
    )
}

export default Task;