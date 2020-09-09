import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import { DeleteOutline, EditOutlined } from '@material-ui/icons'
import { TextField } from '@material-ui/core'

import s from './ListListItem.module.css'

const ListListItem = ({ list, deleteToDoList, updateToDoListTitle, history }) => {
  // Подключи здесь стор и обновляй его) Избавишься от двух уровней пробрасывания пропсов
  let [editMode, setEditMode] = useState(false)
  let [newTitle, setNewTitle] = useState(list.title)
  const saveItemTitle = () => {
    updateToDoListTitle(list.id, newTitle)
    setEditMode(false)
  }

  const onChangeTitle = (e) => setNewTitle(e.target.value)

  return (
    <ListItem button>
      <ListItemText onClick={() => history.push(`/todo/${list.id}`)}>
        {editMode ? (
          <TextField
            className={s.listItemField}
            size="small"
            autoFocus
            value={newTitle}
            onChange={onChangeTitle}
            onBlur={saveItemTitle}
          />
        ) : (
          <span className={s.listLink}>{list.title}</span>
        )}
      </ListItemText>
      <EditOutlined onClick={() => setEditMode(true)} />
      <DeleteOutline onClick={() => deleteToDoList(list.id)} className={s.deleteBtn} />
    </ListItem>
  )
}

export default withRouter(ListListItem)
