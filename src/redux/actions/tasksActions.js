import { tasksAPI } from '../../api'
import { catchNetworkError } from '../helpers/catchNetworkError'

export const SET_TASKS = 'tasks/SET_TASKS'
export const SET_TOTAL_COUNT = 'tasks/SET_TOTAL_COUNT'
export const SET_CURRENT_PAGE = 'tasks/SET_CURRENT_PAGE'
export const ADD_TASK = 'tasks/ADD_TASK'
export const SELECT_TASK = 'tasks/SELECT_TASK'
export const UNSELECT_TASK = 'tasks/UNSELECT_TASK'
export const DELETE_TASK = 'tasks/DELETE_TASK'
export const UPDATE_TASK = 'tasks/UPDATE_TASK'
export const TOGGLE_IS_FETCHING = 'tasks/TOGGLE_IS_FETCHING'

export const setTasks = (tasks) => ({ type: SET_TASKS, tasks })
export const setTotalCount = (totalCount) => ({ type: SET_TOTAL_COUNT, totalCount })
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page })
export const addTaskAC = (task) => ({ type: ADD_TASK, task })
export const deleteTaskAC = (taskId) => ({ type: DELETE_TASK, taskId })
export const selectTaskAC = (taskId) => ({ type: SELECT_TASK, taskId })
export const updateTaskAC = (task) => ({ type: UPDATE_TASK, task })
export const toggleIsFetchingTasks = () => ({ type: TOGGLE_IS_FETCHING })
export const unselectTaskAC = (taskId) => ({ type: UNSELECT_TASK, taskId })

export const getTasksThunk = (todolistId, count, page) => async (dispatch) => {
  dispatch(toggleIsFetchingTasks())
  try {
    const data = await tasksAPI.getTasks(todolistId, count, page)
    if (data.status === 200) {
      dispatch(setTotalCount(data.data.totalCount))
      dispatch(setCurrentPage(page))
      dispatch(setTasks(data.data.items))
      dispatch(toggleIsFetchingTasks())
    }
  } catch (error) {
    catchNetworkError(error, dispatch, () => dispatch(toggleIsFetchingTasks()))
  }
}

export const addTaskThunk = (todolistId, title) => async (dispatch, getState) => {
  try {
    const res = await tasksAPI.addTask(todolistId, title)
    if (res.data.resultCode === 0) {
      //dispatch(addTaskAC(data.data.item));
      const { pageSize, currentPage } = getState().tasks
      dispatch(getTasksThunk(todolistId, pageSize, currentPage))
    }
  } catch (error) {
    catchNetworkError(error, dispatch)
  }
}

export const deleteTaskThunk = (todolistId, taskId) => async (dispatch, getState) => {
  try {
    const res = await tasksAPI.deleteTask(todolistId, taskId)
    if (res.data.resultCode === 0) {
      dispatch(unselectTaskAC(taskId))
      let { pageSize, currentPage, totalCount } = getState().tasks
      if (
        currentPage > 1 &&
        Number.isInteger((totalCount - 1) / pageSize) &&
        totalCount > pageSize
      ) {
        currentPage = currentPage - 1
      }
      dispatch(getTasksThunk(todolistId, pageSize, currentPage))
    }
  } catch (error) {
    catchNetworkError(error, dispatch)
  }
}

export const updateTaskTitleThunk = (todolistId, task, newTitle) => async (dispatch) => {
  try {
    const res = await tasksAPI.updateTask(todolistId, task.id, { ...task, title: newTitle })
    if (res.data.resultCode === 0) {
      dispatch(updateTaskAC({ ...task, title: newTitle }))
    }
  } catch (error) {
    catchNetworkError(error, dispatch)
  }
}

export const updateTaskThunk = (taskData) => async (dispatch) => {
  try {
    const res = await tasksAPI.updateTask(taskData.todoListId, taskData.id, taskData)
    if (res.data.resultCode === 0) {
      dispatch(updateTaskAC(res.data.data.item))
    }
  } catch (error) {
    catchNetworkError(error, dispatch)
  }
}