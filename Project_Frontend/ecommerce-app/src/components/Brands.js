import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import { findBrand } from '../pages/Admin/Brand/BrandService';

const Brands = ({ paginationModel, setPaginationModel }) => {
    const [brands, setBrands] = useState([]);

    const handleChange = (event) => {
        setPaginationModel({ ...paginationModel, brand: event.target.value })
    };

    useEffect(() => {
        findBrand().then((data) => setBrands(data.data.content))

    }, [])
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Brands</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={paginationModel.brand}
                label="Brand"
                onChange={handleChange}
            >
                {brands.map((e) => {
                    return <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
                })}


            </Select>
        </FormControl>
    )
}

export default Brands