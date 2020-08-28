import {todoListsAPI} from "../api/api";

const SET_TODO_LISTS = "toDoLists/SET_TODO_LISTS";

const initialState = {
    lists: []
}

const toDoListsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODO_LISTS:
            return {...state, lists: action.lists}
        default:
            return state
    }
}

export const setToDoLists = (lists) => ({type: SET_TODO_LISTS, lists});

export const getToDoLists = () => async (dispatch) => {
    const data = await todoListsAPI.todoLists();
    if (data.status === 200) {
        dispatch(setToDoLists(data.data));
    }
}

export const addNewToDoList = (title) => async (dispatch) => {
    const data = await todoListsAPI.addNewList(title);
    if (data.resultCode === 0) {
        dispatch(getToDoLists());
    }
}

export const deleteToDoList = (todolistId) => async (dispatch) => {
    const data = await todoListsAPI.deleteList(todolistId);
    if (data.resultCode === 0) {
        dispatch(getToDoLists());
    }
}

export const updateToDoListTitle = (todolistId, title) => async (dispatch) => {
    const data = await todoListsAPI.updateListTitle(todolistId, title);
    if (data.resultCode === 0) {
        dispatch(getToDoLists());
    }
}

export default toDoListsReducer;