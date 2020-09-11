import * as actionTypes from '../actions/tasksActions'

const initialState = {
  items: [],
  selectedItem: {},
  isFetching: false,
  totalCount: null,
  currentPage: 1,
  pageSize: 10,
}

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TASKS:
      return { ...state, items: action.tasks }
    case actionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.page }
    case actionTypes.SET_TOTAL_COUNT:
      return { ...state, totalCount: action.totalCount }
    case actionTypes.ADD_TASK:
      return { ...state, items: [action.task, ...state.items] }
    case actionTypes.SELECT_TASK:
      let selectedItem = action.taskId
        ? state.items.find((item) => item.id === action.taskId)
        : {}
      return { ...state, selectedItem }
    case actionTypes.DELETE_TASK:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.taskId),
        selectedItem: state.selectedItem.id === action.taskId ? {} : state.selectedItem,
      }
    case actionTypes.UPDATE_TASK:
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.task.id ? action.task : item)),
        selectedItem:
          action.task.id === state.selectedItem.id
            ? action.task
            : state.selectedItem,
      }
    case actionTypes.TOGGLE_IS_FETCHING:
      return { ...state, isFetching: !state.isFetching }
    case actionTypes.UNSELECT_TASK:
      return { ...state, selectedItem: {} }
    default:
      return state
  }
}
