import React from 'react';

import PropTypes from 'prop-types';
import { TextField } from "@mui/material";

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
<<<<<<< HEAD
    const { errors } = form;


    // const { errors, touched } = form;

=======


    const { errors, touched } = form;
>>>>>>> 92fd71e28814bce888a99b281dd1630e9ed34b05
    return (
        <TextField
            id={name}
            label={label}
            {...field}

            type={type}
            disabled={disabled}
            placeholder={placeholder}
<<<<<<< HEAD


            fullWidth={fullWidth}
            error={!!errors[name]}
            helperText={errors[name]}

        // fullWidth={fullWidth}
        // error={touched[name] && !!errors[name]}
        // helperText={touched[name] && errors[name]}

=======
            fullWidth={fullWidth}
            error={touched[name] && !!errors[name]}
            helperText={touched[name] && errors[name]}
>>>>>>> 92fd71e28814bce888a99b281dd1630e9ed34b05
        />
    );
}

export default InputCustom;