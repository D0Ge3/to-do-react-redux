import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setError } from '../../redux/actions/appActions'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

export const Alert = (props) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(true)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    dispatch(setError(null))
  }
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MuiAlert severity="error" elevation={6} variant="filled" {...props}>
        {props.message}
      </MuiAlert>
    </Snackbar>
  )
}
