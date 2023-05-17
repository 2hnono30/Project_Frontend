import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FastField, Form, Formik } from 'formik';
import InputCustom from "../../components/CustomField/InputCustom/index";
import * as Yup from "yup";
import { Stack } from "react-bootstrap";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";


function UserCreate(props) {
    const { show, onHide, user, addUser } = props;

    const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passWordRegexp = (/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/);

    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .required('This field is required.'),
        email: Yup.string().email().matches(emailRegexp, 'Email invalidate').required('This field is required.'),
        username: Yup.string()
            .required('This field is required.'),
        password: Yup.string()
            .required('This field is required.')
            .min(8, 'PassWord must have 8 characters')
            .matches(passWordRegexp, 'Password must have at least 8 characters including 1 uppercase, 1 lowercase and 1 special character.'),
        phoneNumber: Yup.string()
            .min(12, 'Phone Number must have 10 characters')
            .max(12, 'Phone Number up to 10 characters')
            .test('len', 'phone number must start with 03 / 09 or 07', val => ['03', '07', '09'].includes(val?.slice(0, 2)))
            .required('This field is required.'),

    });

    const phoneNumberFormat = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/\D/g, '')
        if (phoneNumber.length < 4) return phoneNumber;
        if (phoneNumber.length < 7) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    };

    const submit = (values) => {
        addUser(values);
    }

    return (
        <Formik onSubmit={(values) => submit(values)}
            validationSchema={validationSchema}
            initialValues={user}
        >
            {formikProps => {
                // do something here ...
                const { values, errors, touched } = formikProps;

                // console.log({ values, errors, touched });
                return (
                    <>
                        <Meta title={"Sign Up"} />
                        <BreadCrumb title="Sign Up" />
                        <div class1="login-wrapper py-5 home-wrapper-2">
                            <div className='container-xxl'>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="auth-card">
                                            <h3 className="text-center mb-3">Sign Up</h3>
                                            <Form className="d-flex flex-column gap-15">
                                                <div>
                                                    <FastField
                                                        name="fullName"
                                                        component={InputCustom}
                                                        fullWidth
                                                        label="Full Name"
                                                        placeholder="Eg: Wow nature ..."
                                                    />
                                                </div>
                                                <div>
                                                    <FastField
                                                        name="email"
                                                        component={InputCustom}
                                                        fullWidth
                                                        label="Email"
                                                        placeholder="Eg: Wow nature ..."
                                                    />
                                                </div>
                                                <div>
                                                    <FastField
                                                        name="phoneNumber"
                                                        component={InputCustom}
                                                        fullWidth
                                                        label="Phone Number"
                                                        placeholder="Eg: Wow nature ..."
                                                        handleChangeCustom={phoneNumberFormat}
                                                    />
                                                </div>
                                                <div>
                                                    <FastField
                                                        name="username"
                                                        component={InputCustom}
                                                        fullWidth
                                                        label="UserName"
                                                        placeholder="Eg: Wow nature ..."
                                                    />
                                                </div>
                                                <div>
                                                    <FastField
                                                        name="password"
                                                        component={InputCustom}
                                                        fullWidth
                                                        type="password"
                                                        label="PassWord"
                                                        placeholder="Eg: Wow nature ..."
                                                    />
                                                </div>
                                                <div>
                                                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                                        <Button type="submit" className="button">Sign Up</Button>
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
            }}
        </Formik>
    );
}

export default UserCreate;