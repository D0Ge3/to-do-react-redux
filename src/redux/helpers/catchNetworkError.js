import {setError} from "../appReducer";

export const catchNetworkError = (error, dispatch, side = () => {}) => {
    if (error.response) {
        if (error.response.status === 401) {
            dispatch(setError("You are not authorized"))
            side()
        } else {
            dispatch(setError("Server error"))
            side()
        }
    } else if (error.request) {
        dispatch(setError("Connection error"))
        side()
    } else {
        dispatch(setError("Error"))
        side()
    }
}