import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {TextField, Autocomplete} from '@mui/material';
import {useEffect} from 'react';

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
    let {field, form, options, label, placeholder, fullWidth, handleChangeCustom, disabled, type} = props;
    const {name, value} = field;
    const [defaultValue, setDefaultValue] = useState();
    const {errors, touched} = form;


    useEffect(() => {
        const defaultValueNew = options.find(e => value === e.id)
        if (defaultValueNew) {
            setDefaultValue(defaultValueNew);
            handleChangeCustom && handleChangeCustom(defaultValueNew.id);
        }

    }, [options])
    if(options.length === 0){
        options = [{id: null, label: 'Empty'}]
    }

    const hasError = touched[name] && !!errors[name];
    const handleChange = (newValue) => {
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
        <>{defaultValue &&
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
                    />
                }}
            />
        }

    </>
    )
}
