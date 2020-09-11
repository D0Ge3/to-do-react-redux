import * as actionTypes from '../actions/toDoListsActions'

const initialState = {
  lists: [],
  isFetching: false,
}

const toDoListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TODO_LISTS:
      return { ...state, lists: action.lists }
    case actionTypes.TOGGLE_IS_FETCHING:
      return { ...state, isFetching: !state.isFetching }
    default:
      return state
  }
}

export default toDoListsReducer
