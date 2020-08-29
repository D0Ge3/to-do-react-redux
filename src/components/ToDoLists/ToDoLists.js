import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import s from "./ToDoLists.module.css";
import {Container, Input, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ToDoListItem from "./ToDoListItem/ToDoListItem";

const ToDoListAddForm = ({addToDoList}) => {

    let [addMode, setAddMode] = useState(false);
    let [toDoListTitle, setToDoListTitle] = useState("");

    const activateAddMode = () => {
        setAddMode(true);
    }

    const deactivateAddMode = () => {
        setAddMode(false);
    }

    const onChangeNewList = e => setToDoListTitle(e.target.value);
    const addNewList = () => {
        addToDoList(toDoListTitle);
        setToDoListTitle("");
    }
    if (addMode) {
    return (
        <div>
            <Input value={toDoListTitle} onChange={onChangeNewList} />
            <Button variant="contained" color="primary" onClick={addNewList}>Add</Button>
            <Button variant="contained" color="primary" onClick={deactivateAddMode}>Cancel</Button>
        </div>
    )
    } else {
        return (
            <Button variant="contained" color="primary" onClick={activateAddMode}>+ New ToDo</Button>
        )
    }
}



const ToDoLists = ({lists, addToDoList, deleteToDoList, updateToDoListTitle}) => {
    let toDos = lists.map(l => <ToDoListItem
        key={l.id}
        list={l}
        deleteToDoList={deleteToDoList}
        updateToDoListTitle={updateToDoListTitle}/>);

    return (
        <Container>
            <Typography variant="h4">
                ToDos
            </Typography>
            <ToDoListAddForm addToDoList={addToDoList} />
            <List className={s.list} component="nav" aria-label="main mailbox folders">
                {toDos}
            </List>
        </Container>
    )
}

export default ToDoLists;