import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { addNewToDoList, getToDoLists } from '../../redux/actions/toDoListsActions'

import { Container, Typography, List } from '@material-ui/core'
import ListListItem from './ListListItem/ListListItem'
import { Preloader } from '../common'
import ListAddForm from './ListAddForm'

import s from './ListLists.module.css'

const Lists = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)
  const lists = useSelector((state) => state.toDoLists.lists)
  const isFetching = useSelector((state) => state.toDoLists.isFetching)
  const addToDoList = (title) => dispatch(addNewToDoList(title))

  useEffect(() => {
    if (isAuth) {
      dispatch(getToDoLists())
    }
  }, [])

  let listItems = lists.map((l) => <ListListItem key={l.id} list={l} />)

  return isAuth ? (
    <Container>
      <div className={s.todoListsWrapper}>
        <Typography variant="h4">ToDos</Typography>
        <ListAddForm addToDoList={addToDoList} />
        <div className={s.list}>
          {isFetching ? (
            <Preloader size="40px" isCenter={true} />
          ) : (
            <List component="nav" aria-label="main mailbox folders">
              {listItems}
            </List>
          )}
        </div>
      </div>
    </Container>
  ) : (
    <Redirect to="/login" />
  )
}

export default Lists
