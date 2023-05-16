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
        type, label, placeholder, disabled, fullWidth ,handleChangeCustom
    } = props;
    const handleInputCustomChange = (InputCustom) => {
        if (InputCustom.target.value) {
            handleChangeCustom && handleChangeCustom(InputCustom.target.value);
            console.log(handleChangeCustom);
        }
        const changeEvent = {

            target: {
                name: name,
                value: InputCustom.target.value
            }
        };
        field.onChange(changeEvent);
    }
    const { name } = field;
    const { errors } = form;
    // const { errors, touched } = form;




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



            fullWidth={fullWidth}
            error={!!errors[name]}
            helperText={errors[name]}

        // fullWidth={fullWidth}
        // error={touched[name] && !!errors[name]}
        // helperText={touched[name] && errors[name]}


        // fullWidth={fullWidth}
        // error={touched[name] && !!errors[name]}
        // helperText={touched[name] && errors[name]}

        />
    );
}

export default InputCustom;