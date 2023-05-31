import React from 'react';

import PropTypes from 'prop-types';
import { TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect } from 'react';
import { getErrorsMessageOfFormik, getKeysFromString, hasIndex } from '../../Utils/Utils';
import { useState } from 'react';

InputCustom.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
};

InputCustom.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
    fullWidth: false,
}

function InputCustom(props) {
    const {
        field, form,
        type, label, placeholder, disabled, fullWidth, handleChangeCustom, currFormat, handChangeValue
    } = props;

    const { name } = field;
    const { errors, touched } = form;
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputCustomChange = (InputCustom) => {
        let value;

        // console.log(handleChangeCustom);
        if (InputCustom.target.value && handleChangeCustom) {

            value = handleChangeCustom(InputCustom.target.value);
            // console.log(value, 'input')
        }
        if (InputCustom.target.value && handChangeValue) {
            handChangeValue()
        }
        const changeEvent = {

            target: {
                name: name,
                value: value !== undefined ? value : InputCustom.target.value
            }
        };
        field.onChange(changeEvent);
    }



    useEffect(() => {
        setErrorMessage(getErrorsMessageOfFormik(name, errors, touched))
    }, [form])
    // const { errors, touched } = form;
    return (
        <TextField
            id={name}
            label={label}
            {...field}
            onChange={handleInputCustomChange}
            type={type}
            disabled={disabled}
            placeholder={placeholder}

            // fullWidth={fullWidth}
            // error={!!errors[name]}
            // helperText={errors[name]}
            InputProps={{
                startAdornment: <InputAdornment position="start">{currFormat}</InputAdornment>,
            }}

            fullWidth={fullWidth}
            error={errorMessage !== ''}
            helperText={errorMessage}

        />
    );
}

export default InputCustom;