import React, { useState } from 'react'

import { Button, TextField } from '@material-ui/core'

import s from './TaskList.module.css'

export const AddTaskForm = ({ listId, addTask }) => {
  let [task, setTask] = useState('')
  const onChangeTask = (e) => setTask(e.target.value)
  const onAddTask = () => {
    addTask(listId, task)
    setTask('')
  }

  return (
    <div className={s.addTaskForm}>
      <TextField
        placeholder="New task"
        variant="outlined"
        size="small"
        value={task}
        onChange={onChangeTask}
      />
      <Button variant="contained" color="primary" onClick={onAddTask}>
        add
      </Button>
    </div>
  )
}