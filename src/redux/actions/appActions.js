import { getAuthUserData } from '../actions/authActions'

export const SET_INITIALIZED = 'app/SET_INITIALIZED'
export const SET_ERROR = 'app/SET_ERROR'

export const setInitialized = () => ({ type: SET_INITIALIZED })
export const setError = (error) => ({ type: SET_ERROR, error })

export const initializeApp = () => async (dispatch) => {
  dispatch(getAuthUserData())
    .then(() => {
        dispatch(setInitialized())
    })
}