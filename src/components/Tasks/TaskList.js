import React, {useState} from 'react'

import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import TextField from '@material-ui/core/TextField'
import Task from './Task/Task'
import { Preloader } from '../common'

import s from './TaskList.module.css'

const AddTaskForm = ({todolistId, addTask}) => {
	let [task, setTask] = useState('')
	const onChangeTask = e => setTask(e.target.value)
	const onAddTask = () => {
		addTask(todolistId, task)
		setTask('')
	}
	
	return (
		<div className={s.addTaskForm}>
			<TextField 
				placeholder="New task" 
				variant="outlined" 
				size="small" 
				value={task} 
				onChange={onChangeTask}/>
			<Button variant="contained" color="primary" onClick={onAddTask}>add</Button>
		</div>
	)
}

const TaskList = ({items, todolistId, addTask, isFetching,
                      selectTask, selectedItemId, deleteTask, updateTaskTitle}) => {
                          
	const tasks = items.map(t => <Task key={t.id} task={t}
		updateTaskTitle={updateTaskTitle}
		todolistId={todolistId}
		deleteTask={deleteTask}
		selectedItemId={selectedItemId}
		selectTask={selectTask} />)

	return (
		<>
			<AddTaskForm todolistId={todolistId} addTask={addTask}/>
			<div className={s.list}>
			{isFetching ? (<Preloader size="40px" isCenter={true} />
				)	: (items.length > 0 ?	(
						<List component="nav" aria-label="main mailbox folders">
							{tasks}
						</List>
					)	:	(
						<span className={s.noTasksTitle}>No tasks!</span>)
				)}
			</div>
		</>
	)
}

export default TaskList