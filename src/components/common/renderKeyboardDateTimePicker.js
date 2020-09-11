import React from 'react'

import { KeyboardDateTimePicker } from '@material-ui/pickers'

export const renderKeyboardDateTimePicker = ({
  input,
  dateFormat,
  meta: { touched, invalid, error },
  ...custom
}) => <KeyboardDateTimePicker format={dateFormat} {...input} {...custom} />
