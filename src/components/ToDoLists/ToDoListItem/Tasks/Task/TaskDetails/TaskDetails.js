import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import s from "./TaskDetails.module.css";
import Button from "@material-ui/core/Button";
import {Field, reduxForm} from "redux-form";
import {DateTimeField, renderTextField} from "../../../../../common/FormsControls";

let EditTaskForm = ({initialValues, handleSubmit}) => {


    return (
        <form onSubmit={handleSubmit}>

            <div className={s.taskParam}><span className={s.paramLabel}>Deadline </span>
                <Field

                    name="deadline"
                    component={DateTimeField}
                    variant="inline"
                    placeholder="Add deadline"
                    inputVariant="outlined"
                    size="small"
                    ampm={false}
                    className={s.datePicker}
                    dateFormat="YYYY/MM/DD HH:mm"/></div>
            <div className={s.taskParam}><span className={s.paramLabel}>Start date </span>
                <Field
                    name="startDate"
                    component={DateTimeField}
                    variant="inline"
                    ampm={false}
                    inputVariant="outlined"
                    size="small"
                    className={s.datePicker}
                    placeholder="Add start date"
                    dateFormat="YYYY/MM/DD HH:mm"/>
            </div>
            <div className={s.taskDescription}><span className={s.descriptionLabel}>Description</span>
                <Field
                    name="description"
                    component={renderTextField}
                    size="small"
                    className={s.description}
                    placeholder="Add more detail to this task..."
                    multiline
                    variant="outlined"/>
            </div>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
            >
                Save
            </Button>
        </form>
    )
}

EditTaskForm = reduxForm({
    form: "task",
    enableReinitialize: true
})(EditTaskForm)


const TaskDetails = ({selectedItem, updateTask, resetForm}) => {

    const onSaveTask = (formData) => updateTask(formData);


    if (selectedItem.id) {
    return (
        <>
            <div className={s.taskTitle}><Typography variant="h5">{selectedItem.title}</Typography></div>
            <EditTaskForm resetForm={resetForm} initialValues={selectedItem} onSubmit={onSaveTask} />
        </>
    )
    }
    return <><Typography color="textSecondary" variant="h6">Select a task!</Typography></>
}

export default TaskDetails;