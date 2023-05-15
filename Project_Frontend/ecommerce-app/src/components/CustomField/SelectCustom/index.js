import PropTypes from 'prop-types';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

SelectCustom.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
};

SelectCustom.defaultProps = {
    label: '',
    placeholder: '',
    disabled: false,
    options: [],
}

function SelectCustom(props) {
    const { field, options, label, placeholder, fullWidth, locationType } = props;
    const { name, value } = field;

    let optionKey = ''
    let optionName = ''

    switch(locationType) {
        case 'province': 
            optionKey = 'province_id';
            optionName = 'province_name';
        break;

        case 'district': 
            optionKey = 'district_id';
            optionName = 'district_name';
        break;

        case 'ward': 
            optionKey = 'ward_id';
            optionName = 'ward_name';
        break;

        default: 
            optionKey = 'id';
            optionName = 'name';
    }

    const handleSelectedOptionChange = (selectedOption) => {
        console.log(selectedOption.target.value)
        const changeEvent = {

            target: {
                name: name,
                value: selectedOption.target.value
            }
        };
        field.onChange(changeEvent);
    }

    return (
        <FormControl fullWidth={fullWidth}>
            <InputLabel id={name}>{label}</InputLabel>
            <Select
                label={label}
                id={name}
                {...field}
                defaultValue = ""
                value={value}
                onChange={handleSelectedOptionChange}
                placeholder={placeholder}
            >
                {options.map(option => <MenuItem key={option.id} value={option[optionKey]}>{option[optionName]}</MenuItem>)}
                
            </Select>
        </FormControl>
    );
}

export default SelectCustom;