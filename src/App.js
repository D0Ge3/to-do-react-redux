import React, { useEffect } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { initializeApp } from './redux/actions/appActions'

import Login from './components/Login/Login'
import Lists from './components/Lists/Lists'
import { Preloader } from './components/common'
import Header from './components/Header/Header'
import Tasks from './components/Tasks/Tasks'
import { Alert } from './components/common'

import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const isInitialized = useSelector((state) => state.app.isInitialized)
  const error = useSelector((state) => state.app.error)

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  return (
    <>
      {error && <Alert message={error} />}
      <Header />
      {!isInitialized && <Preloader size="200px" isCenter={true} />}
      {isInitialized && (
        <Switch>
          <Route path={'/login'}>
            <Login />
          </Route>
          <Route path={'/todo/:listId'}>
            <Tasks />
          </Route>
          <Route path={'/todo'}>
            <Lists />
          </Route>
          <Redirect from="/" to="/todo" />
        </Switch>
      )}
    </>
  )
}

export default App
