import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { addNewToDoList, getToDoLists } from '../../redux/toDoListsReducer'

import Lists from './Lists'

const ListsContainer = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)
  const lists = useSelector((state) => state.toDoLists.lists)
  const isFetching = useSelector((state) => state.toDoLists.isFetching)

  useEffect(() => {
    if (isAuth) {
      dispatch(getToDoLists())
    }
  }, [])

  const addToDoList = (title) => dispatch(addNewToDoList(title))

  return isAuth ? (
    <Lists isFetching={isFetching} addToDoList={addToDoList} lists={lists} />
  ) : (
    <Redirect to="/login" />
  )
}

export default ListsContainer
