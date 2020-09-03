import React, {useState} from "react";
import ListItemText from "@material-ui/core/ListItemText";
import {NavLink} from "react-router-dom";
import s from "./ToDoListItem.module.css";
import ListItem from "@material-ui/core/ListItem";
import {DeleteOutline, Edit, EditOutlined} from "@material-ui/icons";
import {TextField} from "@material-ui/core";
import {withRouter} from "react-router-dom";

const ToDoListItem = ({list, deleteToDoList, updateToDoListTitle, history}) => {

    let [editMode, setEditMode] = useState(false);
    let [newTitle, setNewTitle] = useState(list.title);
    const saveItemTitle = () => {
        updateToDoListTitle(list.id, newTitle);
        setEditMode(false);
    }

    const onChangeTitle = e => setNewTitle(e.target.value);

    return (
        <ListItem button onClick={() => history.push(`/todo/${list.id}`)}>
            <ListItemText >
                {editMode
                    ? <TextField className={s.listItemField} size="small" autoFocus value={newTitle} onChange={onChangeTitle} onBlur={saveItemTitle}/>
                    : <span className={s.listLink} >{list.title}</span>}
            </ListItemText>
            <EditOutlined  onClick={() => setEditMode(true)}/>
            <DeleteOutline onClick={() => deleteToDoList(list.id)} className={s.deleteBtn}/>
        </ListItem>
    )
}

export default withRouter(ToDoListItem);