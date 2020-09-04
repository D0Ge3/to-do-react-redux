import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import s from "./TaskDetails.module.css";
import EditTaskForm from './EditTaskForm';
import EditTitleForm from './EditTitleForm';

const TaskDetails = ({selectedItem, updateTask, resetForm, updateTaskTitle, todolistId}) => {

    const onSaveTask = (formData) => updateTask(formData);
    let [editTitleMode, setEditTitleMode] = useState(false);

    const toggleEditTitleMode = () => setEditTitleMode(!editTitleMode);

    const saveNewTitle = (newTitle) => {
        updateTaskTitle(todolistId, selectedItem, newTitle);
        toggleEditTitleMode();
    }

    if (selectedItem.id) {
    return (
        <>
            {editTitleMode 
            ? <EditTitleForm saveNewTitle={saveNewTitle} taskTitle={selectedItem.title} /> 
            : <div className={s.taskTitle}><span onClick={toggleEditTitleMode}>{selectedItem.title}</span></div>}
            <EditTaskForm resetForm={resetForm} initialValues={selectedItem} onSubmit={onSaveTask} />
        </>
    )
    }
    return <><Typography color="textSecondary" variant="h6">Select a task!</Typography></>
}

export default TaskDetails;