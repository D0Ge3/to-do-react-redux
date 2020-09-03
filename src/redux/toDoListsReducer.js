import {todoListsAPI} from "../api/api";

const SET_TODO_LISTS = "toDoLists/SET_TODO_LISTS";
const TOGGLE_IS_FETCHING = "toDoLists/TOGGLE_IS_FETCHING";

const initialState = {
    lists: [],
    isFetching: false
}

const toDoListsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODO_LISTS:
            return {...state, lists: action.lists};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: !state.isFetching};
        default:
            return state
    }
}

export const setToDoLists = (lists) => ({type: SET_TODO_LISTS, lists});
export const toggleIsFetchingLists = () => ({type: TOGGLE_IS_FETCHING});

export const getToDoLists = () => async (dispatch) => {
    dispatch(toggleIsFetchingLists());
    const data = await todoListsAPI.todoLists();
    if (data.status === 200) {
        dispatch(setToDoLists(data.data));
        dispatch(toggleIsFetchingLists());
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