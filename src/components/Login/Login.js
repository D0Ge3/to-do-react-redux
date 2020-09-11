import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login, getCaptcha } from '../../redux/actions/authActions'

import { Container } from '@material-ui/core'
import { LoginForm } from './LoginForm'

export const Login = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)
  const isFetchingLogin = useSelector((state) => state.auth.isFetchingLogin)
  const captchaUrl = useSelector((state) => state.auth.captchaUrl)
  const dispatch = useDispatch()
  const onSubmit = (formData) => {
    const { email, password, rememberMe, captcha } = formData
    dispatch(login(email, password, rememberMe, captcha))
  }

  return isAuth ? (
    <Redirect to="/todo" />
  ) : (
    <Container>
      <LoginForm
        getCaptcha={() => dispatch(getCaptcha())}
        captchaUrl={captchaUrl}
        isFetchingLogin={isFetchingLogin}
        onSubmit={onSubmit}
      />
    </Container>
  )
}
