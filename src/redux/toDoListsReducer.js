import {todoListsAPI} from "../api/api";

const SET_TODO_LISTS = "toDoLists/SET_TODO_LISTS";

const initialState = {
    lists: [
        {
            "id": "1",
            "title": "what todo",
            "addedDate": "2019-07-30T12:24:15.063",
            "order": 0
        },
        {
            "id": "2",
            "title": "what todo1",
            "addedDate": "2019-07-30T12:24:15.063",
            "order": 0
        },
        {
            "id": "3",
            "title": "what todo2",
            "addedDate": "2019-07-30T12:24:15.063",
            "order": 0
        }]
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
    let data = await todoListsAPI.todoLists();
    if (data.status === 200) {
        dispatch(setToDoLists(data.data));
    }
}


export default toDoListsReducer;