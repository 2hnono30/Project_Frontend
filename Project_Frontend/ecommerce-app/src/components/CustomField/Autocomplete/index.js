import PropTypes from 'prop-types';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { Autocomplete, TextField } from '@mui/material';
AutocompleteCustom.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
    handleChangeCustom: PropTypes.func
};

AutocompleteCustom.defaultProps = {
    label: '',
    placeholder: '',
    disabled: false,
    options: [],
}

function AutocompleteCustom(props) {
    const { field, options, label, placeholder, fullWidth, locationType, form, handleChangeCustom } = props;
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

    return (
        <FormControl fullWidth={fullWidth} error={hasError}>
            <InputLabel id={name}>{label}</InputLabel>
            <Autocomplete
                label={label}
                id={name}
                {...field}
                value={value}
                placeholder={placeholder}
                onChange={handleSelectedOptionChange}
                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.title}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Product" />}
            />
            {hasError && <FormHelperText>{errors[name]}</FormHelperText>}
        </FormControl>
    );
}

export default AutocompleteCustom;