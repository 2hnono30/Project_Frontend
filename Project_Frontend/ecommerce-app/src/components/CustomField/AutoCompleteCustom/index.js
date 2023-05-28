import React from 'react'
import PropTypes from 'prop-types';
import { TextField, Autocomplete } from '@mui/material';
import { useEffect } from 'react';

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
    const { field, form, options, label, placeholder , fullWidth, handleChangeCustom, disabled, type } = props;
    const { name, value } = field;
    
    const { errors, touched } = form;

    const defaultValue = options.find(e => value == e.id);
    useEffect(() => {
        console.log(defaultValue);
        if (defaultValue) {
            handleChangeCustom && handleChangeCustom(defaultValue.id);
        }
    }, [])
    

    const hasError = touched[name] && !!errors[name];
    const handleChange = (newValue) => {
        console.log(newValue);
        const idSelected = newValue?.id;
        if (newValue) {
            handleChangeCustom && handleChangeCustom(idSelected);
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
            onChange={(event, newInputValue) => {
                handleChange(newInputValue);
            }}
            defaultValue={defaultValue}
            getOptionLabel={(option) => option.label}
            options={options}
            renderInput={(params) => {
            return <TextField
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
            />}}
        />

    )
}
