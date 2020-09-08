import React from 'react';

import { KeyboardDateTimePicker } from '@material-ui/pickers';

export const DateTimeField = (props) => {
  const {
    dateFormat,
    meta: { submitting, error, touched },
    input: { onBlur, value, ...inputProps },
    ...others
  } = props;

  const onChange = (date) => {
    date ? inputProps.onChange(date.format('YYYY-MM-DDTHH:mm:ss')) : inputProps.onChange(null);
  };

  return (
    <KeyboardDateTimePicker
      {...inputProps}
      {...others}
      format={dateFormat}
      value={value ? new Date(value) : null}
      disabled={submitting}
      onBlur={() => onBlur(value ? value : null)}
      error={error && touched}
      onChange={onChange}
    />
  );
};