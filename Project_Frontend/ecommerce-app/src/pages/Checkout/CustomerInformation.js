import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FastField, Form, Formik } from 'formik';
import { useFormikContext } from 'formik';
import InputCustom from "../../components/CustomField/InputCustom";
import * as Yup from "yup";
import SelectCustom from "../../components/CustomField/SelectCustom";
import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { districtCallAPI, provinceCallAPI, wardCallAPI } from "../../Services/Address/AddressService";
import { toast } from "react-toastify";


function CustomerInformation(props) {
    const { customer, onSubmit, refFrom } = props;
    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('This field is required.'),
        email: Yup.string().email().required('This field is required.'),
        phone: Yup.number()
            .required('This field is required.')
            .nullable(),
        province: Yup.string()
            .required('This field is required.')
            .nullable(),
        district: Yup.string()
            .required('This field is required.')
            .nullable(),
        ward: Yup.string()
            .required('This field is required.')
            .nullable(),
        address: Yup.string()
            .required('This field is required.')
            .nullable(),
    });

    // const provinceAPI = () => {
    //     try {
    //       async function fetchAllProvince() {
    //         let resProvince = await provinceCallAPI();
    //         console.log(resProvince.data.results);
    //       }
    //       fetchAllProvince();
    //     } catch {
    //       console.log("error Province Call API");
    //     }
    //   }
    //   provinceAPI();

    const [provinces, setProvinces] = useState([]);
    const fetchData = () => {
        provinceCallAPI().then(e => {
            setProvinces(e);
            console.log(provinces);
            // toast.success('province Call API Success');
        })
    }

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <>
            <Formik onSubmit={(values) => onSubmit(values)}
                validationSchema={validationSchema}
                initialValues={customer}
                innerRef={refFrom}
            >
                {formikProps => {
                    // do something here ...
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
                                    <FastField
                                        name="phone"
                                        component={InputCustom}
                                        fullWidth
                                        label="Phone Number"
                                        placeholder="Eg: Wow nature ..."
                                    />
                                </div>
                                <div className='d-flex gap-10'>
                                    <div className="flex-grow-1 bg-white" style={{ marginTop: 10 }}>
                                        <FastField
                                            name="province"
                                            component={SelectCustom}
                                            fullWidth
                                            label="Province"

                                            options={[provinces]}
                                            placeholder="Eg: Province ..."
                                        />
                                    </div>
                                    <div className="flex-grow-1 bg-white" style={{ marginTop: 10 }}>
                                        <FastField
                                            name="district"
                                            component={SelectCustom}
                                            fullWidth
                                            label="District"
                                            options={[]}
                                            placeholder="Eg: District ..."
                                        />
                                    </div>
                                    <div className="flex-grow-1 bg-white" style={{ marginTop: 10 }}>
                                        <FastField
                                            name="ward"
                                            component={SelectCustom}
                                            fullWidth
                                            label="Ward"
                                            options={[]}
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
                                    </div>
                                </div>
                            </Form>
                        </>
                    );
                }}
            </Formik>
        </>
    );
}

export default CustomerInformation;