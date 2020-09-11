import React from 'react'

import TextField from '@material-ui/core/TextField'

export const renderTextField = ({
  label,
  input,

  meta: { submitting, touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    disabled={submitting}
    {...input}
    {...custom}
  />
)
