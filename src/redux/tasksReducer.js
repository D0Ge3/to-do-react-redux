import {tasksAPI} from "../api/api";

const SET_TASKS = "tasks/SET_TASKS";
const SET_TOTAL_COUNT = "tasks/SET_TOTAL_COUNT";
const SET_CURRENT_PAGE = "tasks/SET_CURRENT_PAGE";
const ADD_TASK = "tasks/ADD_TASK";

const initialState = {
    items: [],
    totalCount: null,
    currentPage: 1
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
            return {...state, items: [...state.items, action.task]};
        default:
            return state
    }
}

export const setTasks = (tasks) => ({type: SET_TASKS, tasks});
export const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount});
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page});
export const addTaskAC = (task) => ({type: ADD_TASK, task});

export const getTasks = (todolistId, count, page) => async (dispatch) => {
    let data = await tasksAPI.getTasks(todolistId, count, page);
    if (data.status === 200) {
        dispatch(setTotalCount(data.data.totalCount));
        dispatch(setCurrentPage(page));
        dispatch(setTasks(data.data.items));
    }
}

export const addTask = (todolistId, title) => async (dispatch) => {
    let data = await tasksAPI.addTask(todolistId, title);
    if (data.resultCode === 0) {
        dispatch(addTaskAC(data.data.item));
    }
}

export default tasksReducer;