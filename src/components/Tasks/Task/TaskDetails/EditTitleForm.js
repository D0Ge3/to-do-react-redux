import React, {useState} from "react";
import s from "./TaskDetails.module.css";
import { TextField } from "@material-ui/core";

const EditTitleForm = ({taskTitle, saveNewTitle}) => {
    let [title, setTitle] = useState(taskTitle);
    const onChangeTitle = (e) => setTitle(e.target.value);
    const onSaveTitle = () => {
        saveNewTitle(title);
    }
    return (
        <div className={s.taskTitle}>
            <TextField 
                onChange={onChangeTitle}
                inputProps={{style: {fontSize: "25px", fontWeight: "bolder"}}}
                // className={styles.textField}
                value={title} 
                onBlur={onSaveTitle} 
                autoFocus size="medium" />
        </div>
    )
}

export default EditTitleForm;