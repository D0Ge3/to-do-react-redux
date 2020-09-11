import * as actionTypes from '../actions/authActions'

const initialState = {
  id: null,
  email: null,
  login: null,
  rememberMe: null,
  captcha: null,
  isAuth: false,
  isFetchingLogin: false,
  captchaUrl: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA:
      return { ...state, ...action.data }
    case actionTypes.TOGGLE_IS_FETCHING_LOGIN:
      return { ...state, isFetchingLogin: !state.isFetchingLogin }
    case actionTypes.SET_CAPTCHA:
      return { ...state, captchaUrl: action.captchaUrl }
    default:
      return state
  }
}

export default authReducer
