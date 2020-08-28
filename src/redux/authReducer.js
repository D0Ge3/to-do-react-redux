import {authAPI} from "../api/api";

const SET_USER_DATA = "auth/SET_USER_DATA"

const initialState = {
    id: null,
    email: null,
    login: null,
    rememberMe: null,
    captcha: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data}
        default:
            return state
    }
}

export const setAuthUserData = (userId, email, login, isAuth) =>
    ({type: SET_USER_DATA, data: {userId, email, login, isAuth}});

export const getAuthUserData = () => async (dispatch) => {
    const data = await authAPI.me();
    if(data.resultCode === 0) {
        const {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

export const logout = () => async (dispatch) => {
    const data = await authAPI.logout();
    if(data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const login = (email, password, rememberMe, captcha = false) => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);
    if(data.resultCode === 0) {
        const {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export default authReducer;