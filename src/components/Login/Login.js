import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, getCaptcha} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import {Container} from "@material-ui/core";
import LoginForm from "./LoginForm";

const Login = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const isFetchingLogin = useSelector(state => state.auth.isFetchingLogin);
    const captchaUrl = useSelector(state => state.auth.captchaUrl);
    const dispatch = useDispatch();
    const onSubmit = (formData) => {
        const {email, password, rememberMe, captcha} = formData;
        dispatch(login(email, password, rememberMe, captcha));
    }

    if(isAuth) return <Redirect to="/todo"/>
    return (
        <Container>
            <LoginForm getCaptcha={() => dispatch(getCaptcha())} captchaUrl={captchaUrl} isFetchingLogin={isFetchingLogin} onSubmit={onSubmit}/>
        </Container>
    )
}

export default Login;