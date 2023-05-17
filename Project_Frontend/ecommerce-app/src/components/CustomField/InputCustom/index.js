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
<<<<<<< HEAD
    const { name } = field;

  


    const { errors, touched } = form;

=======
    const handleInputCustomChange = (InputCustom) => {
        let value;
        console.log(handleChangeCustom);
        if (InputCustom.target.value && handleChangeCustom) {

            value = handleChangeCustom(InputCustom.target.value);
            console.log(value, 'input')
        }
        const changeEvent = {

            target: {
                name: name,
                value: value !== undefined ? value :  InputCustom.target.value
            }
        };
        field.onChange(changeEvent);
    }
    const { name } = field;
    const { errors, touched } = form;




    // const { errors, touched } = form;

>>>>>>> 0db3bc7a2e77f210262447fecdfa03b70037b36f
    return (
        <TextField
            id={name}
            label={label}
            {...field}
            onChange={handleInputCustomChange}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
<<<<<<< HEAD
            fullWidth={fullWidth}
            error={touched[name] && !!errors[name]}
            helperText={touched[name] && errors[name]}
=======



            // fullWidth={fullWidth}
            // error={!!errors[name]}
            // helperText={errors[name]}

        fullWidth={fullWidth}
        error={touched[name] && !!errors[name]}
        helperText={touched[name] && errors[name]}


        // fullWidth={fullWidth}
        // error={touched[name] && !!errors[name]}
        // helperText={touched[name] && errors[name]}
>>>>>>> 0db3bc7a2e77f210262447fecdfa03b70037b36f

        />
    );
}

export default InputCustom;