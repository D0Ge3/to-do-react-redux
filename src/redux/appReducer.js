import { getAuthUserData } from './authReducer'

const SET_INITIALIZED = 'app/SET_INITIALIZED'
const SET_ERROR = 'app/SET_ERROR'

const initialState = {
  isInitialized: false,
  error: null,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return { ...state, isInitialized: true }
    case SET_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}

export const setInitialized = () => ({ type: SET_INITIALIZED })
export const setError = (error) => ({ type: SET_ERROR, error })

export const initializeApp = () => async (dispatch) => {
  dispatch(getAuthUserData())
    .then(() => {
        dispatch(setInitialized())
    })
}
export default appReducer
