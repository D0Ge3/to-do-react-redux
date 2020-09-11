import { todoListsAPI } from '../../api'
import { catchNetworkError } from '../helpers/catchNetworkError'

export const SET_TODO_LISTS = 'toDoLists/SET_TODO_LISTS'
export const TOGGLE_IS_FETCHING = 'toDoLists/TOGGLE_IS_FETCHING'

export const setToDoLists = (lists) => ({ type: SET_TODO_LISTS, lists })
export const toggleIsFetchingLists = () => ({ type: TOGGLE_IS_FETCHING })

export const getToDoLists = () => async (dispatch) => {
  try {
    dispatch(toggleIsFetchingLists())
    const res = await todoListsAPI.todoLists()
    if (res.status === 200) {
      dispatch(setToDoLists(res.data))
      dispatch(toggleIsFetchingLists())
    }
  } catch (error) {
    catchNetworkError(error, dispatch, () => dispatch(toggleIsFetchingLists()))
  }
}

export const addNewToDoList = (title) => async (dispatch) => {
  try {
    const res = await todoListsAPI.addNewList(title)
    if (res.data.resultCode === 0) {
      dispatch(getToDoLists())
    }
  } catch (error) {
    catchNetworkError(error, dispatch)
  }
}

export const deleteToDoList = (todolistId) => async (dispatch) => {
  try {
    const res = await todoListsAPI.deleteList(todolistId)
    if (res.data.resultCode === 0) {
      dispatch(getToDoLists())
    }
  } catch (error) {
    catchNetworkError(error, dispatch)
  }
}

export const updateToDoListTitle = (todolistId, title) => async (dispatch) => {
  try {
    const res = await todoListsAPI.updateListTitle(todolistId, title)
    if (res.data.resultCode === 0) {
      dispatch(getToDoLists())
    }
  } catch (error) {
    catchNetworkError(error, dispatch)
  }
}
