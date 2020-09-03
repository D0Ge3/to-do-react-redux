import React, {useState} from "react";
import s from "./ToDoLists.module.css";
import {Container, Input, Typography, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ToDoListItem from "./ToDoListItem/ToDoListItem";
import Preloader from "../common/Preloader";

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
        <div className={s.addListForm}>
            <TextField size="small" placeholder="New list" variant="outlined" value={toDoListTitle} onChange={onChangeNewList} />
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



const ToDoLists = ({lists, addToDoList, deleteToDoList, updateToDoListTitle, isFetching}) => {
    let toDos = lists.map(l => <ToDoListItem
        key={l.id}
        list={l}
        deleteToDoList={deleteToDoList}
        updateToDoListTitle={updateToDoListTitle}/>);

    return (
        <Container>
            <div className={s.todoListsWrapper}>
                <Typography variant="h4">
                    ToDos
                </Typography>
                <ToDoListAddForm addToDoList={addToDoList} />
                <div className={s.list}>
                {isFetching
                    ? <Preloader size="40px" isCenter={true}/>
                    : <List  component="nav" aria-label="main mailbox folders">
                        {toDos}
                    </List>
                }
                </div>
            </div>
        </Container>
    )
}

export default ToDoLists;