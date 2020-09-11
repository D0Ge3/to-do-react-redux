import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  updateTaskTitleThunk,
  updateTaskThunk,
} from '../../../../redux/actions/tasksActions'

import Typography from '@material-ui/core/Typography'
import { EditTaskForm } from './EditTaskForm'
import { EditTitleForm } from './EditTitleForm'

import s from './TaskDetails.module.css'

export const TaskDetails = ({ selectedItem, resetForm, listId }) => {
  const dispatch = useDispatch()
  let [editTitleMode, setEditTitleMode] = useState(false)

  const updateTask = (taskData) => dispatch(updateTaskThunk(taskData))
  const onSaveTask = (formData) => updateTask(formData)
  const toggleEditTitleMode = () => setEditTitleMode(!editTitleMode)
  const saveNewTitle = (newTitle) => {
    updateTaskTitle(listId, selectedItem, newTitle)
    toggleEditTitleMode()
  }
  const updateTaskTitle = (listId, task, newTitle) =>
    dispatch(updateTaskTitleThunk(listId, task, newTitle))

  return selectedItem.id ? (
    <>
      {editTitleMode ? (
        <EditTitleForm
          saveNewTitle={saveNewTitle}
          taskTitle={selectedItem.title}
        />
      ) : (
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
  ) : (
    <Typography color="textSecondary" variant="h6">
      Select a task!
    </Typography>
  )
}
