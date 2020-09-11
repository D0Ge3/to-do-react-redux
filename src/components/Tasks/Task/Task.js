import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
  deleteTaskThunk,
  updateTaskTitleThunk,
  selectTaskAC,
} from '../../../redux/actions/tasksActions'

import ListItemText from '@material-ui/core/ListItemText'
import { TextField } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import ListItem from '@material-ui/core/ListItem'

import s from './Task.module.css'

const Task = ({ task, selectedItemId, listId }) => {
  let [editMode, setEditMode] = useState(false)
  let [newTitle, setNewTitle] = useState(task.title)

  useEffect(() => {
    setNewTitle(task.title)
  }, [task])

  const onChangeTitle = (e) => setNewTitle(e.target.value)
  const saveNewTitle = () => {
    updateTaskTitle(listId, task, newTitle)
    setEditMode(false)
  }

  const dispatch = useDispatch()
  const updateTaskTitle = (listId, task, newTitle) =>
    dispatch(updateTaskTitleThunk(listId, task, newTitle))
  const deleteTask = (listId, taskId) =>
    dispatch(deleteTaskThunk(listId, taskId))
  const selectTask = (taskId) => dispatch(selectTaskAC(taskId))

  return (
    <ListItem
      selected={selectedItemId === task.id}
      button
      onClick={() => selectTask(task.id)}
    >
      <ListItemText>
        {editMode && (
          <TextField
            className={s.taskEditInput}
            size="small"
            onChange={onChangeTitle}
            value={newTitle}
            autoFocus
            onBlur={saveNewTitle}
          />
        )}
        {!editMode && (
          <span onClick={() => setEditMode(true)}>{task.title}</span>
        )}
      </ListItemText>
      <DeleteOutline
        onClick={() => deleteTask(listId, task.id)}
        className={s.deleteBtn}
      />
    </ListItem>
  )
}

export default Task
