import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { CircularProgress, Button } from '@material-ui/core'
import { DateTimeField, renderTextField } from '../../../common'

import s from './TaskDetails.module.css'

export let EditTaskForm = ({ initialValues, handleSubmit, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={s.taskParam}>
        <span className={s.paramLabel}>Deadline </span>
        <Field
          name="deadline"
          component={DateTimeField}
          variant="inline"
          placeholder="Add deadline"
          inputVariant="outlined"
          size="small"
          ampm={false}
          className={s.datePicker}
          dateFormat="YYYY/MM/DD HH:mm"
        />
      </div>
      <div className={s.taskParam}>
        <span className={s.paramLabel}>Start date </span>
        <Field
          name="startDate"
          component={DateTimeField}
          variant="inline"
          ampm={false}
          inputVariant="outlined"
          size="small"
          className={s.datePicker}
          placeholder="Add start date"
          dateFormat="YYYY/MM/DD HH:mm"
        />
      </div>
      <div className={s.taskDescription}>
        <span className={s.descriptionLabel}>Description</span>
        <Field
          name="description"
          component={renderTextField}
          size="small"
          className={s.description}
          placeholder="Add more detail to this task..."
          multiline
          variant="outlined"
        />
      </div>
      <div className={s.buttonWrapper}>
        <Button
          disabled={submitting}
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
        >
          Save
        </Button>
        {submitting && (
          <CircularProgress size={24} className={s.buttonProgress} />
        )}
      </div>
    </form>
  )
}

EditTaskForm = reduxForm({
  form: 'task',
  enableReinitialize: true,
})(EditTaskForm)
