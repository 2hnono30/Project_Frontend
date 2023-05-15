import React, { useEffect, useState } from 'react';
import axios from  'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FastField, Form, Formik } from 'formik';
import InputCustom from "../../../components/CustomField/InputCustom";
import * as Yup from "yup";
import SelectCustom from "../../../components/CustomField/SelectCustom";

function CustomerCreateUpdate(props) {
    console.log(props);
    const {show, onHide,customers,districts,wards, onSubmit} = props;
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required.'),
        id: Yup.number()
            .required('This field is required.')
            .nullable(),
    });

    const [provinces, setProvinces] = useState([])
    const fetchProvinces = async () => {
        await axios.get(`https://vapi.vnappmob.com/api/province/`)
        .then((res) => {
            console.log(res.data);
            setProvinces(res.data.results);
            return res.data.results
        })
    }
    useEffect(() => {
        fetchProvinces();
    }, [show])

    return (
        <Modal show={show} onHide={onHide}>
            <Formik onSubmit={(values) => onSubmit(values)}
                validationSchema={validationSchema}
                initialValues={customers}
            >
                {formikProps => {
                    const { values, errors, touched } = formikProps;
                    console.log({ values, errors, touched });
                    return (
                        <Form>
                            <Modal.Header closeButton>
                                <Modal.Title>Create Customer</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div>
                                    <FastField
                                        name="name"
                                        component={InputCustom}
                                        fullWidth
                                        label="Full Name"
                                        placeholder="Eg: Kobe Bryant"
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FastField
                                        name="email"
                                        component={InputCustom}
                                        fullWidth
                                        label="Email"
                                        placeholder="Ex : abc123@gmail.com"
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FastField
                                        name="phone"
                                        component={InputCustom}
                                        fullWidth
                                        label="Phone"
                                        placeholder="Ex :0901234567 "
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FastField
                                        name="image"
                                        component={InputCustom}
                                        type="file"
                                        fullWidth
                                        
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FastField
                                        name="province"
                                        component={SelectCustom}
                                        locationType='province'
                                        fullWidth
                                        label="Province"
                                        options={provinces}
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FastField
                                        name="disctrist"
                                        component={SelectCustom}
                                        fullWidth
                                        label="District"
                                        options={districts}
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FastField
                                        name="ward"
                                        component={SelectCustom}
                                        fullWidth
                                        label="Ward"
                                        options={wards}
                                    />
                                </div>

                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={onHide}>Close</Button>
                                <Button type="submit" variant="primary">Save changes</Button>
                            </Modal.Footer>
                        </Form>
                    );
                }}
            </Formik>
        </Modal>
    )
}

export default CustomerCreateUpdate