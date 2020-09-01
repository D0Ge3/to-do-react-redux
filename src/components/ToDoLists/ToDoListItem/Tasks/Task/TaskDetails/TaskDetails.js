import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import s from "./TaskDetails.module.css";
import TextField from "@material-ui/core/TextField";
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from '@date-io/moment';

const StartDate = ({selectedItem}) => {
    let [startDate, setStartDate] = useState(selectedItem.startDate);
    const handleDateChange = () => {}
    return (
        <div className={s.taskParam}><span className={s.paramLabel}>Start date </span>
            <KeyboardDateTimePicker
                variant="inline"
                ampm={false}
                inputVariant="outlined"
                size="small"
                className={s.datePicker}
                // label="With keyboard"
                value={startDate}
                placeholder="Add start date"
                onChange={handleDateChange}
                //onError={console.log}
                onClose={() => console.log("onClose")} //при ввыходе из календаря (после выбора)
                onBlur={() => console.log("onBlur")} //при ручном вводе onBlur как и в инпуте

                format="YYYY/MM/DD HH:MM"/>
        </div>
    )
}


const TaskDetails = ({selectedItem}) => {
    let [startDate, setStartDate] = useState(selectedItem.startDate);
    let [deadline, setDeadline] = useState(selectedItem.deadline);
    let [addedDate, setAddedDate] = useState(selectedItem.addedDate);
    let [description, setDescription] = useState(selectedItem.description ? selectedItem.description : "");
    const handleDateChange = () => {}


    if (selectedItem.id) {
    return (
        <>
            <div className={s.taskTitle}><Typography variant="h5">{selectedItem.title}</Typography></div>
            <div className={s.taskParam}><span className={s.paramLabel}>Start date </span>
                <KeyboardDateTimePicker
                    variant="inline"
                    ampm={false}
                    inputVariant="outlined"
                    size="small"
                    className={s.datePicker}
                    // label="With keyboard"
                    value={startDate}
                    placeholder="Add start date"
                    onChange={handleDateChange}
                    //onError={console.log}
                    onClose={() => console.log("onClose")} //при ввыходе из календаря (после выбора)
                    onBlur={() => console.log("onBlur")} //при ручном вводе onBlur как и в инпуте

                    format="YYYY/MM/DD HH:MM"/>
            </div>
            <div className={s.taskParam}><span className={s.paramLabel}>Deadline </span>
                <KeyboardDateTimePicker
                    variant="inline"
                    ampm={false}
                    inputVariant="outlined"
                    size="small"
                    className={s.datePicker}
                    // label="With keyboard"
                    value={deadline}
                    onBlur={() => console.log("on blur")}
                    placeholder="Add deadline"
                    onChange={handleDateChange}
                    //onError={console.log}
                    disablePast
                    format="YYYY/MM/DD HH:MM"/>
            </div>
            <div className={s.taskParam}><span className={s.paramLabel}>Added date </span>
                <KeyboardDateTimePicker
                    variant="inline"
                    inputVariant="outlined"
                    size="small"
                    ampm={false}
                    className={s.datePicker}
                    // label="With keyboard"
                    disableFuture
                    value={addedDate}
                    onChange={handleDateChange}
                    //onError={console.log}
                    format="YYYY/MM/DD HH:MM"/></div>
            <div className={s.taskDescription}><span className={s.descriptionLabel}>Description</span>
                <TextField size="small" className={s.description} value={description} placeholder="Add more detail to this task..." multiline  variant="outlined"/>
            </div>
        </>
    )
    }
    return <><Typography color="textSecondary" variant="h6">Select a task!</Typography></>
}

export default TaskDetails;