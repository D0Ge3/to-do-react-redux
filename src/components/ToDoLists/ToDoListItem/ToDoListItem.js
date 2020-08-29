import React, {useState} from "react";
import ListItemText from "@material-ui/core/ListItemText";
import {NavLink} from "react-router-dom";
import s from "./ToDoListItem.module.css";
import ListItem from "@material-ui/core/ListItem";
import {DeleteOutline, Edit, EditOutlined} from "@material-ui/icons";
import {Input} from "@material-ui/core";

const ToDoListItem = ({list, deleteToDoList, updateToDoListTitle}) => {

    let [editMode, setEditMode] = useState(false);
    let [newTitle, setNewTitle] = useState(list.title);
    const saveItemTitle = () => {
        updateToDoListTitle(list.id, newTitle);
        setEditMode(false);
    }

    const onChangeTitle = e => setNewTitle(e.target.value);

    return (
        <ListItem button>
            <ListItemText onClick={() => console.log("link")} className={s.list}>
                {editMode
                    ? <Input autoFocus value={newTitle} onChange={onChangeTitle} onBlur={saveItemTitle}/>
                    : <NavLink className={s.listLink} to={`/todo/${list.id}`} >{list.title}</NavLink>}
            </ListItemText>
            <EditOutlined  onClick={() => setEditMode(true)}/>
            <DeleteOutline onClick={() => deleteToDoList(list.id)} className={s.deleteBtn}/>
        </ListItem>
    )
}

export default ToDoListItem;