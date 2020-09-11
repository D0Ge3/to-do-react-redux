import React, { useState } from 'react'

import { TextField } from '@material-ui/core'

import s from './TaskDetails.module.css'

export const EditTitleForm = ({ taskTitle, saveNewTitle }) => {
  let [title, setTitle] = useState(taskTitle)
  const onChangeTitle = (e) => setTitle(e.target.value)
  const onSaveTitle = () => {
    saveNewTitle(title)
  }

  return (
    <div className={s.taskTitle}>
      <TextField
        onChange={onChangeTitle}
        inputProps={{ style: { fontSize: '25px', fontWeight: 'bolder' } }}
        value={title}
        onBlur={onSaveTitle}
        autoFocus
        size="medium"
      />
    </div>
  )
}
