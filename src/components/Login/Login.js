import React from "react";
import {Field, reduxForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {renderCheckbox, renderTextField} from "../common/FormsControls";
import {login, getCaptcha} from "../../redux/authReducer";
import s from "./Login.module.css";
import {Redirect} from "react-router-dom";
import {required} from "../../utils/validators/validators";
import {Container, Button, Typography, CircularProgress} from "@material-ui/core";
import UpdateIcon from '@material-ui/icons/Update';

let LoginForm = ({handleSubmit, error, isFetchingLogin, captchaUrl, getCaptcha}) => {
    return (
        <form className={s.loginForm} onSubmit={handleSubmit} >
            <Typography variant="h4">
                Login
            </Typography>
            <div>
                <Field disabled={isFetchingLogin} className={s.loginInput} name={"email"} placeholder="email" component={renderTextField} validate={[required]} />
            </div>
            <div>
                <Field disabled={isFetchingLogin} className={s.loginInput} type={"password"} name={"password"} placeholder="password" component={renderTextField} validate={[required]} />
            </div>
            <div>
                <Field color="primary" label={"remember me"} name={"rememberMe"} component={renderCheckbox} />
            </div>
            {error && <span className={s.error}>{error}</span>}
            {captchaUrl && <div className={s.captchaForm}>
                <img src={captchaUrl} alt={"captcha"}/>
                <UpdateIcon className={s.updateIcon} onClick={getCaptcha} />
                <Field name={"captcha"} placeholder={"Captcha"} component={renderTextField} validate={[required]}/>
            </div>}
            <div className={s.buttonWrapper}>
                <Button type="submit" size={"large"} disabled={isFetchingLogin} variant="contained" color="primary">Login</Button>
                {isFetchingLogin && <CircularProgress size={24} className={s.buttonProgress} />}
            </div>
        </form>
    )
}

LoginForm = reduxForm({
    form: "login"
})(LoginForm)

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