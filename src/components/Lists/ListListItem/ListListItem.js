import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
	deleteToDoList,
	updateToDoListTitle,
} from '../../../redux/toDoListsReducer'

import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import { DeleteOutline, EditOutlined } from '@material-ui/icons'
import { TextField } from '@material-ui/core'

import s from './ListListItem.module.css'

const ListListItem = ({ list, history }) => {
	const dispatch = useDispatch()
	let [editMode, setEditMode] = useState(false)
	let [newTitle, setNewTitle] = useState(list.title)

	const onChangeTitle = (e) => setNewTitle(e.target.value)
	const updateTitle = (listId, title) =>
		dispatch(updateToDoListTitle(listId, title))
	const deleteList = (listId) => dispatch(deleteToDoList(listId))
	const saveItemTitle = () => {
		updateTitle(list.id, newTitle)
		setEditMode(false)
	}

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
			<DeleteOutline
				onClick={() => deleteList(list.id)}
				className={s.deleteBtn}
			/>
		</ListItem>
	)
}

export default withRouter(ListListItem)
