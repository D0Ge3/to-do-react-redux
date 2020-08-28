import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import s from "./ToDoLists.module.css";
import {Container, Input, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";


const ToDoLists = ({lists}) => {

    let [addMode, setAddMode] = useState(false);

    let toDos = lists.map((l) => <ListItem button key={l.id}>
        <ListItemText><NavLink className={s.lists} to={`/todo/${l.id}`} >{l.title}</NavLink></ListItemText>
    </ListItem>);
    return (
        <Container>
            <Typography variant="h4">
                ToDos
            </Typography>{!addMode &&
            <Button onClick={() => setAddMode(true)} size={"large"} variant="contained" color="primary">
                New ToDo
            </Button>}
            {/*в отдельную. компоненту*/}
            {addMode && <div><Input /><Button variant="contained" color="primary">Add</Button></div>}
            <List className={s.list} component="nav" aria-label="main mailbox folders">
                {toDos}
            </List>
        </Container>
    )
}

export default ToDoLists;