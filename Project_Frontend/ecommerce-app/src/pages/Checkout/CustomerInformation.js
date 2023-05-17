import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FastField, Form, Formik, Field, useFormikContext } from 'formik';
import { InputMask } from 'react-input-mask';
import InputCustom from "../../components/CustomField/InputCustom";
import * as Yup from "yup";
import SelectCustom from "../../components/CustomField/SelectCustom";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { districtCallAPI, provinceCallAPI, wardCallAPI } from "../../Services/Address/AddressService";
import { toast } from "react-toastify";
import TextMaskCustom from '../../components/CustomField/InputMask';



function CustomerInformation(props) {
    const { customer, onSubmit, refFrom, buttonHide } = props;

    // const phoneRegExp = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('This field is required.'),
        email: Yup.string().email().matches(emailRegexp, 'Email invalidate').required('This field is required.'),
        phoneNumber: Yup.string()
            .min(12, 'Phone Number must have 10 characters')
            .max(12, 'Phone Number up to 10 characters')
            .test('len', 'phone number must start with 03 / 09 or 07', val => ['03', '07', '09'].includes(val?.slice(0,2)))
            // .matches(phoneRegExp, 'phone number must start with 03 / 09 or 07')
            .required('This field is required.'),
        province: Yup.string()
            .required('This field is required.'),
        district: Yup.string()
            .required('This field is required.'),
        ward: Yup.string()
            .required('This field is required.'),
        address: Yup.string()
            .required('This field is required.')
    });

    const [provinces, setProvinces] = useState([]);
    const [provinceId, setProvinceId] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [districtId, setDistrictId] = useState(null);
    const [wards, setWards] = useState([]);

    const fetchProvinceData = () => {
        provinceCallAPI().then(e => {
            setProvinces(e.data.results.map(e => {
                return {
                    id: e.province_id,
                    name: e.province_name
                }
            }));
        })
    }

    const fetchDistrictData = () => {
        districtCallAPI().then(e => {
            if (provinceId) {
                districtCallAPI(provinceId).then(e => {
                    setDistricts(e.data.results.map(e => {
                        return {
                            id: e.district_id,
                            name: e.district_name
                        }
                    }));
                })
            }
        })
    }
    const fetchWardData = () => {
        wardCallAPI().then(e => {
            if (districtId) {
                wardCallAPI(districtId).then(e => {
                    setWards(e.data.results.map(e => {
                        return {
                            id: e.ward_id,
                            name: e.ward_name
                        }
                    }));
                })
            }
        })
    }


    useEffect(() => {
        fetchProvinceData();
    }, [])
    useEffect(() => {
        districtId && fetchWardData();
    }, [districtId]);

    useEffect(() => {
        provinceId && fetchDistrictData();
    }, [provinceId]);

    const onSubmitForm = (values) => {
        const customer = {
            ...values,
            locationRegion: {
                provinceId: values.province,
                provinceName: provinces.find(e => e.id === values.province)?.name,
                districtId: values.district,
                districtName: districts.find(e => e.id === values.district)?.name,
                wardId: values.ward,
                wardName: wards.find(e => e.id === values.ward)?.name,
                address: values.address,
            },
            phoneNumber: values.phoneNumber.replaceAll(' ', '')
        }
        onSubmit(customer);
    }
    const phoneNumberFormat = (value) => {
        if(!value) return value;
        const phoneNumber = value.replace(/\D/g, '')
        if(phoneNumber.length < 4) return phoneNumber;
        if(phoneNumber.length < 7) return `${phoneNumber.slice(0,3)}-${phoneNumber.slice(3)}`;
        return `${phoneNumber.slice(0,3)}-${phoneNumber.slice(3,6)}-${phoneNumber.slice(6, 10)}`
    };
    return (
        <Formik onSubmit={(values) => onSubmitForm(values)}
            validationSchema={validationSchema}
            initialValues={customer}
            innerRef={refFrom}
        >
            {formikProps => {
                const { values, errors, touched } = formikProps;

                console.log({ values, errors, touched });

                return (
                    <>
                        <h4 className="mb-3">Customer Contact Information</h4>
                        <Form>
                            <div className='bg-white' style={{ marginTop: 10 }}>
                                <FastField
                                    name="fullName"
                                    component={InputCustom}
                                    fullWidth
                                    label="Full Name"
                                    placeholder="Eg: Wow nature ..."
                                />
                            </div>
                            <div className='bg-white' style={{ marginTop: 10 }}>
                                <FastField
                                    name="email"
                                    component={InputCustom}
                                    fullWidth
                                    label="Email"
                                    placeholder="Eg: Wow nature ..."
                                />
                            </div>
                            <div className='bg-white' style={{ marginTop: 10 }}>
                                <div className="flex-grow-1 bg-white" style={{ marginTop: 10 }}>
                                    <FastField
                                        name="phoneNumber"
                                        component={InputCustom}
                                        fullWidth
                                        label="Phone Number"
                                        placeholder="Eg: Wow nature ..."
                                        handleChangeCustom={phoneNumberFormat}
                                    />
                                </div>
                            </div>
                            <div className='d-flex gap-10'>
                                <div className="flex-grow-1 bg-white" style={{ marginTop: 10 }}>
                                    <Field
                                        name="province"
                                        component={SelectCustom}
                                        fullWidth
                                        label="Province"
                                        options={provinces}
                                        placeholder="Eg: Province ..."
                                        handleChangeCustom={setProvinceId}
                                    />
                                </div>
                                <div className="flex-grow-1 bg-white" style={{ marginTop: 10 }}>
                                    <Field
                                        name="district"
                                        component={SelectCustom}
                                        fullWidth
                                        label="District"
                                        options={districts}
                                        placeholder="Eg: District ..."
                                        handleChangeCustom={setDistrictId}
                                    />
                                </div>
                                <div className="flex-grow-1 bg-white" style={{ marginTop: 10 }}>
                                    <Field
                                        name="ward"
                                        component={SelectCustom}
                                        fullWidth
                                        label="Ward"
                                        options={wards}
                                        placeholder="Eg: Ward ..."
                                    />
                                </div>
                            </div>
                            <div className='bg-white' style={{ marginTop: 10 }}>
                                <FastField
                                    name="address"
                                    component={InputCustom}
                                    fullWidth
                                    label="Address"
                                    placeholder="Eg: Wow nature ..."
                                />
                            </div>
                            <div className='bg-white' style={{ marginTop: 10 }}>
                                <FastField
                                    name="note"
                                    component={InputCustom}
                                    fullWidth
                                    label="Note"
                                    placeholder="Eg: Wow nature ..."
                                />
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to="/cart" className="text-dark">
                                        <BiArrowBack className="me-2" />
                                        Return to Cart
                                    </Link>
                                    <Link to="/product" className="button">
                                        Continue to Shopping
                                    </Link>
                                    {buttonHide()}
                                </div>
                            </div>
                        </Form>
                    </>
                );
            }}
        </Formik>
    );
}

export default CustomerInformation;