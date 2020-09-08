import React, {useState} from "react";

import Typography from "@material-ui/core/Typography";
import EditTaskForm from './EditTaskForm';
import EditTitleForm from './EditTitleForm';

import s from "./TaskDetails.module.css";

const TaskDetails = ({selectedItem, updateTask, resetForm, updateTaskTitle, todolistId}) => {
	let [editTitleMode, setEditTitleMode] = useState(false);

	const onSaveTask = (formData) => updateTask(formData);
	const toggleEditTitleMode = () => setEditTitleMode(!editTitleMode);
	const saveNewTitle = (newTitle) => {
		updateTaskTitle(todolistId, selectedItem, newTitle);
		toggleEditTitleMode();
	}

	return selectedItem.id ? (
		<>
			{editTitleMode ? (
					<EditTitleForm saveNewTitle={saveNewTitle} taskTitle={selectedItem.title} />
				)	: (
					<div className={s.taskTitle}>
						<span onClick={toggleEditTitleMode}>{selectedItem.title}</span>
					</div>
			)}
			<EditTaskForm 
				resetForm={resetForm} 
				initialValues={selectedItem} 
				onSubmit={onSaveTask} 
			/>
		</>
	)	:	(
		<Typography color="textSecondary" variant="h6">Select a task!</Typography>
	)
}

export default TaskDetails;