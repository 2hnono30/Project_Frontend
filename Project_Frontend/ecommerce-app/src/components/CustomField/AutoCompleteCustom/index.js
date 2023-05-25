import React from 'react'
import PropTypes from 'prop-types';
import { TextField, Autocomplete } from '@mui/material';

AutoCompleteCustom.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
    handleChangeCustom: PropTypes.func
};

AutoCompleteCustom.defaultProps = {
    label: '',
    placeholder: '',
    disabled: false,
    options: [],
}

export default function AutoCompleteCustom(props) {
    const { field, form, options, label, placeholder, fullWidth, handleChangeCustom, disabled, type } = props;
    const { name, value } = field;

    const { errors, touched } = form;

    const handleSelectedOptionChange = (selectedOption) => {
        if (selectedOption.target.value) {
            handleChangeCustom && handleChangeCustom(selectedOption.target.value);
        }

        const changeEvent = {

            target: {
                name: name,
                value: selectedOption.target.value
            }
        };
        field.onChange(changeEvent);
    }
    console.log(props);
    const hasError = touched[name] && !!errors[name];
    const handleChange = (newValue) => {
        console.log('handlerChange')
        const idSelected = options.find(e => e.label === newValue).id;
        if (newValue) {
            handleChangeCustom && handleChangeCustom(newValue);
        }
        const changeEvent = {
            target: {
                name: name,
                value: idSelected
            }
        };
        field.onChange(changeEvent);
    }
    return (
        <Autocomplete
            onInputChange={(event, newInputValue) => {
                handleChange(newInputValue);
            }}
            disablePortal
            options={options}
            renderInput={(params) => <TextField
                {...params}
                {...field}
                id={name}
                label={label}
                onChange={handleChange}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                fullWidth={fullWidth}
                error={hasError}
                helperText={touched[name] && errors[name]}
            />}
        />

    )
}
