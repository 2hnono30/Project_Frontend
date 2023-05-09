import React from 'react';

import PropTypes from 'prop-types';
import {TextField} from "@mui/material";

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
        type, label, placeholder, disabled, fullWidth
    } = props;
    const { name } = field;
    const {errors} = form;

    return (
            <TextField
                id={name}
                label={label}
                {...field}

                type={type}
                disabled={disabled}
                placeholder={placeholder}
                fullWidth={fullWidth}
                error={!!errors[name]}
                helperText={errors[name]}
            />
    );
}

export default InputCustom;