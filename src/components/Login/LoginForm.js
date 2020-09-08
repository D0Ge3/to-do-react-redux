import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderCheckbox, renderTextField } from '../common/FormsControls';
import s from './Login.module.css';
import { required } from '../../utils/validators/validators';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';

let LoginForm = ({ handleSubmit, error, isFetchingLogin, captchaUrl, getCaptcha }) => {
  return (
    <form className={s.loginForm} onSubmit={handleSubmit}>
      <Typography variant="h4">Login</Typography>
      {/* Не совсем понятно, зачем оборачивать каждое поле в див */}
      <div>
        <Field
          disabled={isFetchingLogin}
          className={s.loginInput}
          name={'email'}
          placeholder="email"
          component={renderTextField}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          disabled={isFetchingLogin}
          className={s.loginInput}
          type={'password'}
          name={'password'}
          placeholder="password"
          component={renderTextField}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          color="primary"
          label={'remember me'}
          name={'rememberMe'}
          component={renderCheckbox}
        />
      </div>
      {error && <span className={s.error}>{error}</span>}
      {captchaUrl && (
        <div className={s.captchaForm}>
          <img src={captchaUrl} alt={'captcha'} />
          <UpdateIcon className={s.updateIcon} onClick={getCaptcha} />
          <Field
            name={'captcha'}
            placeholder={'Captcha'}
            component={renderTextField}
            validate={[required]}
          />
        </div>
      )}
      <div className={s.buttonWrapper}>
        <Button
          type="submit"
          size={'large'}
          disabled={isFetchingLogin}
          variant="contained"
          color="primary"
        >
          Login
        </Button>
        {isFetchingLogin && <CircularProgress size={24} className={s.buttonProgress} />}
      </div>
    </form>
  );
};

LoginForm = reduxForm({
  form: 'login',
})(LoginForm);

export default LoginForm;
