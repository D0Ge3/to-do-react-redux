import React from 'react'
import { useDispatch } from 'react-redux'

import { addTaskThunk } from '../../redux/actions/tasksActions'

import { List } from '@material-ui/core'
import { Task } from './Task/Task'
import { Preloader } from '../common'
import { AddTaskForm } from './AddTaskForm'

import s from './TaskList.module.css'

export const TaskList = ({ items, listId, isFetching, selectedItemId }) => {
  const dispatch = useDispatch()
  const addTask = (listId, title) => dispatch(addTaskThunk(listId, title))

  const tasks = items.map((t) => (
    <Task key={t.id} task={t} listId={listId} selectedItemId={selectedItemId} />
  ))

  return (
    <>
      <AddTaskForm listId={listId} addTask={addTask} />
      <div className={s.list}>
        {isFetching ? (
          <Preloader size="40px" isCenter={true} />
        ) : items.length > 0 ? (
          <List component="nav" aria-label="main mailbox folders">
            {tasks}
          </List>
        ) : (
          <span className={s.noTasksTitle}>No tasks!</span>
        )}
      </div>
    </>
  )
}
