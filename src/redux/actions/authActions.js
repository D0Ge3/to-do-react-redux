import { authAPI, securityAPI } from '../../api'
import { stopSubmit } from 'redux-form'
import { catchNetworkError } from '../helpers/catchNetworkError'

export const SET_USER_DATA = 'auth/SET_USER_DATA'
export const TOGGLE_IS_FETCHING_LOGIN = 'auth/TOGGLE_IS_FETCHING_LOGIN'
export const SET_CAPTCHA = 'auth/SET_CAPTCHA'

export const setAuthUserData = (userId, email, login, isAuth) => 
  ({ type: SET_USER_DATA, data: { userId, email, login, isAuth } })
export const toggleIsFetchingLogin = () => ({ type: TOGGLE_IS_FETCHING_LOGIN })
export const setCaptcha = (captchaUrl) => ({ type: SET_CAPTCHA, captchaUrl })

export const getAuthUserData = () => async (dispatch) => {
  try {
    const data = await authAPI.me()
    if (data.resultCode === 0) {
      const { id, email, login } = data.data
      dispatch(setAuthUserData(id, email, login, true))
    }
  } catch (error) {
    catchNetworkError(error, dispatch)
  }
}

export const logout = () => async (dispatch) => {
  try {
    const data = await authAPI.logout()
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
    }
  } catch (error) {
    catchNetworkError(error, dispatch)
  }
}

export const login = (email, password, rememberMe, captcha = false) => async (
  dispatch
) => {
  try {
    dispatch(toggleIsFetchingLogin())
    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === 0) {
      const { id, email, login } = data.data
      dispatch(toggleIsFetchingLogin())
      dispatch(setAuthUserData(id, email, login, true))
    } else {
      dispatch(toggleIsFetchingLogin())
      let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
      dispatch(stopSubmit('login', { _error: message }))
      if (message === 'Incorrect anti-bot symbols') {
        dispatch(getCaptcha())
      }
    }
  } catch (error) {
    catchNetworkError(error, dispatch, () => dispatch(toggleIsFetchingLogin()))
  }
}

export const getCaptcha = () => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl()
  dispatch(setCaptcha(data.url))
}
