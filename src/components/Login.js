import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {renderCheckbox, renderTextField} from "./common/FormsControls";
import {login} from "../redux/authReducer";
import s from "./Login.module.css";
import {Redirect} from "react-router-dom";
import {required} from "../utils/validators/validators";
import {Container, Button, Typography} from "@material-ui/core";

let LoginForm = ({handleSubmit}) => {

    return (
        <form className={s.loginForm} onSubmit={handleSubmit} >
            <Typography variant="h4">
                Login
            </Typography>
            <div>
                <Field className={s.loginInput} name={"email"} placeholder="email" component={renderTextField} validate={[required]} />
            </div>
            <div>
                <Field className={s.loginInput} type={"password"} name={"password"} placeholder="password" component={renderTextField} validate={[required]} />
            </div>
            <div>
                <Field color="primary" label={"remember me"} name={"rememberMe"} component={renderCheckbox} />
            </div>
            <Button type={"submit"} size={"large"} variant="contained" color="primary">Login</Button>
        </form>
    )
}

LoginForm = reduxForm({
    form: "login"
})(LoginForm)

const Login = ({login, isAuth}) => {

    const onSubmit = (formData) => {
        const {email, password, rememberMe} = formData;
        login(email, password, rememberMe);
    }
    if(isAuth) return <Redirect to="/todo"/>
    return (
        <Container>

            <LoginForm onSubmit={onSubmit}/>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}



export default connect(mapStateToProps, {login})(Login);