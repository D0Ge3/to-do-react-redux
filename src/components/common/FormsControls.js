import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import s from "../ToDoLists/ToDoListItem/Tasks/Task/TaskDetails/TaskDetails.module.css";


export const renderTextField = ({
                             label,
                             input,

                             meta: {touched, invalid, error},
                             ...custom
                         }) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
)

export const DateTimeField = props => {
    const {
        dateFormat,
        meta: { submitting, error, touched },
        input: { onBlur, value, ...inputProps },
        ...others
    } = props;

    const onChange = date => {
        date ? inputProps.onChange(date.format("YYYY-MM-DDTHH:mm:ss")) : inputProps.onChange(null);
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


export const renderKeyboardDateTimePicker = ({input, dateFormat, meta: {touched, invalid, error}, ...custom}) => (
    <KeyboardDateTimePicker
        format={dateFormat}
        {...input}
        {...custom}
    />
)

export const renderCheckbox = ({input, label}) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                />
            }
            label={label}
        />
    </div>
)

export const radioButton = ({input, ...rest}) => (
    <FormControl>
        <RadioGroup {...input} {...rest}>
            <FormControlLabel value="female" control={<Radio/>} label="Female"/>
            <FormControlLabel value="male" control={<Radio/>} label="Male"/>
            <FormControlLabel value="other" control={<Radio/>} label="Other"/>
        </RadioGroup>
    </FormControl>
)

export const renderFromHelper = ({touched, error}) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}

export const renderSelectField = ({
                               input,
                               label,
                               meta: {touched, error},
                               children,
                               ...custom
                           }) => (
    <FormControl error={touched && error}>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: 'age',
                id: 'age-native-simple'
            }}
        >
            {children}
        </Select>
        {renderFromHelper({touched, error})}
    </FormControl>
)
