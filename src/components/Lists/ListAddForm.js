import React, { useState } from 'react'
import s from './ListLists.module.css'
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'

const ListAddForm = ({ addToDoList }) => {
  let [addMode, setAddMode] = useState(false)
  let [toDoListTitle, setToDoListTitle] = useState('')

  const activateAddMode = () => setAddMode(true)
  const deactivateAddMode = () => setAddMode(false)

  const onChangeNewList = (e) => setToDoListTitle(e.target.value)
  const addNewList = () => {
    addToDoList(toDoListTitle)
    setToDoListTitle('')
  }

  return addMode ? (
    <div className={s.addListForm}>
      <TextField
        size="small"
        placeholder="New list"
        variant="outlined"
        value={toDoListTitle}
        onChange={onChangeNewList}
      />
      <Button variant="contained" color="primary" onClick={addNewList}>
        Add
      </Button>
      <Button variant="contained" color="primary" onClick={deactivateAddMode}>
        Cancel
      </Button>
    </div>
  ) : (
    <Button variant="contained" color="primary" onClick={activateAddMode}>
      + New ToDo
    </Button>
  )
}

export default ListAddForm
