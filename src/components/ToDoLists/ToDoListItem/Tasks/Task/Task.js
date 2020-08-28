import React from "react";
import ListItemText from "@material-ui/core/ListItemText";

import {Input} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {DeleteOutline, EditOutlined} from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";

const Task = ({task}) => {
    return (
        <ListItem button>
            <ListItemText >
                <span>{task.title}</span>
            </ListItemText>
            {/*<EditOutlined  onClick={() => setEditMode(true)}/>*/}
            {/*<DeleteOutline onClick={() => deleteToDoList(list.id)} className={s.deleteBtn}/>*/}
        </ListItem>
    )
}

export default Task;