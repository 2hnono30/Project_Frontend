import React from 'react';
import { MaskedInput, createDefaultMaskGenerator } from 'react-hook-mask';
import { TextField } from '@mui/material';
import InputMask from "react-input-mask";


const mask = createDefaultMaskGenerator('099-9999-9999')
function TextMaskCustom(props) {

    const {
        field, form,
        type, label, placeholder, disabled, fullWidth ,handleChangeCustom
    } = props;
    console.log(field);
    const handleInputCustomChange = (InputCustom) => {
        if (InputCustom.value) {
            handleChangeCustom && handleChangeCustom(InputCustom.value);
            console.log(InputCustom.value);
        }
        const changeEvent = {
            target: {
                name: name,
                value: InputCustom.value
            }
        };
        field.onChange(changeEvent);
    }
    const { name } = field;
    const { errors, touched } = form;
    return (
        <InputMask
            // value={field.value}
            {...field}
            maskGenerator={mask}
            onChange={handleInputCustomChange}
        >
            {() => <TextField/>}
            </InputMask>

    );
}

export default TextMaskCustom;