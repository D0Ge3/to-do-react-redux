import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { required } from '../../utils/validators/validators'

import { renderCheckbox, renderTextField } from '../common'
import { Button, Typography, CircularProgress } from '@material-ui/core'
import UpdateIcon from '@material-ui/icons/Update'

import s from './Login.module.css'

export let LoginForm = ({
  handleSubmit,
  error,
  isFetchingLogin,
  captchaUrl,
  getCaptcha,
}) => {
  return (
    <form className={s.loginForm} onSubmit={handleSubmit}>
      <Typography variant="h4">Login</Typography>
      <Field
        disabled={isFetchingLogin}
        className={s.loginInput}
        name={'email'}
        placeholder="email"
        component={renderTextField}
        validate={[required]}
      />
      <Field
        disabled={isFetchingLogin}
        className={s.loginInput}
        type={'password'}
        name={'password'}
        placeholder="password"
        component={renderTextField}
        validate={[required]}
      />
      <Field
        color="primary"
        label={'remember me'}
        name={'rememberMe'}
        component={renderCheckbox}
      />
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
        {isFetchingLogin && (
          <CircularProgress size={24} className={s.buttonProgress} />
        )}
      </div>
    </form>
  )
}

LoginForm = reduxForm({
  form: 'login',
})(LoginForm)
