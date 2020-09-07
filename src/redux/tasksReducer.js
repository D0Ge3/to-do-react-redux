import {tasksAPI} from "../api/api";
import { setError } from "./appReducer";
import { catchNetworkError } from './helpers/catchNetworkError';

const SET_TASKS = "tasks/SET_TASKS";
const SET_TOTAL_COUNT = "tasks/SET_TOTAL_COUNT";
const SET_CURRENT_PAGE = "tasks/SET_CURRENT_PAGE";
const ADD_TASK = "tasks/ADD_TASK";
const SELECT_TASK = "tasks/SELECT_TASK";
const UNSELECT_TASK = "tasks/UNSELECT_TASK";
const DELETE_TASK = "tasks/DELETE_TASK";
const UPDATE_TASK = "tasks/UPDATE_TASK";
const TOGGLE_IS_FETCHING = "tasks/TOGGLE_IS_FETCHING";

const initialState = {
    items: [],
    selectedItem: {},
    isFetching: false,
    totalCount: null,
    currentPage: 1,
    pageSize: 10,
}

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return {...state, items: action.tasks};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.page};
        case SET_TOTAL_COUNT:
            return {...state, totalCount: action.totalCount};
        case ADD_TASK:
            return {...state, items: [action.task, ...state.items]};
        case SELECT_TASK:
            let selectedItem = action.taskId ? state.items.find((item) => item.id === action.taskId) : {};
            return {...state, selectedItem };
        case DELETE_TASK:
            return {...state,
                items: state.items.filter(item => item.id !== action.taskId),
                selectedItem: state.selectedItem.id === action.taskId ? {} : state.selectedItem
            };
        case UPDATE_TASK:
            return {...state,
                items: state.items.map((item) =>
                    item.id === action.task.id ? action.task : item),
                selectedItem: action.task.id === state.selectedItem.id
                    ? action.task
                    : state.selectedItem
                };
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: !state.isFetching};
        case UNSELECT_TASK:
            return {...state, selectedItem: {}};
        default:
            return state
    }
}

export const setTasks = (tasks) => ({type: SET_TASKS, tasks});
export const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount});
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page});
export const addTaskAC = (task) => ({type: ADD_TASK, task});
export const deleteTaskAC = (taskId) => ({type: DELETE_TASK, taskId});
export const selectTaskAC = (taskId) => ({type: SELECT_TASK, taskId});
export const updateTaskAC = (task) => ({type: UPDATE_TASK, task});
export const toggleIsFetchingTasks = () => ({type: TOGGLE_IS_FETCHING});
export const unselectTaskAC = (taskId) => ({type: UNSELECT_TASK, taskId});

export const getTasksThunk = (todolistId, count, page) => async (dispatch) => {
    dispatch(toggleIsFetchingTasks());
    try {
        const data = await tasksAPI.getTasks(todolistId, count, page);
        if (data.status === 200) {
            dispatch(setTotalCount(data.data.totalCount));
            dispatch(setCurrentPage(page));
            dispatch(setTasks(data.data.items));
            dispatch(toggleIsFetchingTasks());
        }
    } catch (error) {
        catchNetworkError(error, dispatch, () => dispatch(toggleIsFetchingTasks()))
    }
    
}

export const addTaskThunk = (todolistId, title) => async (dispatch, getState) => {
    try {
        const res = await tasksAPI.addTask(todolistId, title);
        if (res.data.resultCode === 0) {
            //dispatch(addTaskAC(data.data.item));
            const {pageSize, currentPage} = getState().tasks;
            dispatch(getTasksThunk(todolistId, pageSize, currentPage));
        }
    } catch (error) {
        catchNetworkError(error, dispatch)
    }
    
}

export const deleteTaskThunk = (todolistId, taskId) => async (dispatch, getState) => {
    try {
        const res = await tasksAPI.deleteTask(todolistId, taskId);
        if (res.data.resultCode === 0) {
            dispatch(unselectTaskAC(taskId));
            let {pageSize, currentPage, totalCount} = getState().tasks;
            if (Number.isInteger((totalCount-1)/pageSize) && totalCount>pageSize) currentPage = currentPage-1;
            dispatch(getTasksThunk(todolistId, pageSize, currentPage));
        }
    } catch (error) {
        catchNetworkError(error, dispatch)
    }
    
}

export const updateTaskTitleThunk = (todolistId, task, newTitle) => async (dispatch) => {
    try {
        const res = await tasksAPI.updateTask(todolistId, task.id, {...task, title: newTitle});
        if (res.data.resultCode === 0) {
            dispatch(updateTaskAC({...task, title: newTitle}));
        }
    } catch (error) {
        catchNetworkError(error, dispatch)
    }
    
}

export const updateTaskThunk = (taskData) => async (dispatch) => {
    try {
        const res = await tasksAPI.updateTask(taskData.todoListId, taskData.id, taskData);
        if (res.data.resultCode === 0) {
            dispatch(updateTaskAC(res.data.data.item));
        }
    } catch (error) {
        catchNetworkError(error, dispatch)
    }

}

export default tasksReducer;