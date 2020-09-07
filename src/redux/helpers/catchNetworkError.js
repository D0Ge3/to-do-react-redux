import {setError} from "../appReducer";

export const catchNetworkError = (error, dispatch, side = () => {}) => {
    if (error.response) {
        dispatch(setError("Server error"))
        side()
    } else if (error.request) {
        dispatch(setError("Connection error"))
        side()
    } else {
        dispatch(setError("Error"))
        side()
    }
}