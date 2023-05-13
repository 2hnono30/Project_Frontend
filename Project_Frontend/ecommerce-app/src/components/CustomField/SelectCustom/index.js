import PropTypes from 'prop-types';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

SelectCustom.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
    handleChangeCustom: PropTypes.func
};

SelectCustom.defaultProps = {
    label: '',
    placeholder: '',
    disabled: false,
    options: [],
}

function SelectCustom(props) {
    const { field, form, options, label, placeholder, fullWidth, handleChangeCustom } = props;
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
    const hasError = touched[name] && !!errors[name];
    console.log(touched[name], errors[name], name);

    return (
        <FormControl fullWidth={fullWidth} error={hasError}>
            <InputLabel id={name}>{label}</InputLabel>
            <Select
                label={label}
                id={name}
                {...field}
                defaultValue=""
                value={value}
                onChange={handleSelectedOptionChange}
                placeholder={placeholder}
            >
                {options.map(option => <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>)}
            </Select>
            {hasError && <FormHelperText>{errors[name]}</FormHelperText>}
        </FormControl>
    );
}

export default SelectCustom;