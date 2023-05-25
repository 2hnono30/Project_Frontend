import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FastField, Form, Formik, Field, useFormikContext } from 'formik';
import InputCustom from "../../../components/CustomField/InputCustom";
import * as Yup from "yup";
import SelectCustom from "../../../components/CustomField/SelectCustom";
import NoAvatar from "../../../images/noAvatar.jpg";
import { createCustomerAvatar } from '../Customer/CustomerAvatarService';
import { districtCallAPI, provinceCallAPI, wardCallAPI } from "../../../Services/Address/AddressService";

function CustomerCreateUpdate(props) {
    const { show, onHide, customer, onSubmit } = props;
    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('This field is required.'),
        email: Yup.string().email().required('This field is required.'),
        phoneNumber: Yup.number()
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

    const [image, setImage] = useState(0);
    const [url, setUrl] = useState()

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


    const changeAvatar = (e) => {

        customer.fileUrl = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(customer.fileUrl);
        reader.onloadend = function (e) {
            setUrl(reader.result);
        }.bind(this);
        handleUpload(customer.fileUrl);

    }

    const handleUpload = (image) => {
        try {
            async function uploadAvatar() {
                let result = await createCustomerAvatar(image);
                setImage(result.data[0]);
            }
            uploadAvatar();
        } catch {

        }
    }
    useEffect(() => {
        setUrl(customer.fileUrl)
    }, [show])
    const submit = (values) => {
        values.image = image;
        values.provinceId= values.province;
        values.provinceName= provinces.find(e => e.id === values.province)?.name
        values.districtId= values.district
        values.districtName= districts.find(e => e.id === values.district)?.name
        values.wardId= values.ward
        values.wardName= wards.find(e => e.id === values.ward)?.name
        values.address= values.address
       
        onSubmit(values);
    }
    useEffect(() => {
        fetchProvinceData();
    }, [])
    useEffect(() => {
        districtId && fetchWardData();
    }, [districtId])
    useEffect(() => {
        provinceId && fetchDistrictData();
    }, [provinceId])

    return (
        <Modal show={show} onHide={onHide} size='lg'>
            <Formik onSubmit={(values) => submit(values)}
                validationSchema={validationSchema}
                initialValues={customer}
            >
                {formikProps => {
                    const { values, errors, touched } = formikProps;
                    console.log(errors);
                    return (
                        <>
                            <Form>
                                <div className='row' style={{ padding: 10 }}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Create Customer</Modal.Title>
                                    </Modal.Header>

                                    <div className='col-8'>
                                        <div className='bg-white' style={{ marginTop: 10 }}>
                                            <FastField
                                                name="fullName"
                                                component={InputCustom}
                                                fullWidth
                                                label="Full Name"
                                                placeholder="Eg: William Tran"
                                            />
                                        </div>
                                        <div className='bg-white' style={{ marginTop: 10 }}>
                                            <FastField
                                                name="email"
                                                component={InputCustom}
                                                fullWidth
                                                label="Email"
                                                placeholder="Eg: abc123@gmail.com"
                                            />
                                        </div>
                                        <div className='bg-white' style={{ marginTop: 10 }}>
                                            <FastField
                                                name="phoneNumber"
                                                component={InputCustom}
                                                fullWidth
                                                label="Phone Number"
                                                placeholder="Eg: 0901234567"
                                            />
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
                                                placeholder="Eg:Address.."
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4 d-flex">
                                        <div className="w-100" style={{ padding: 10 }}>
                                            <img className="img-thumbnail avatar-lg" src={url || NoAvatar} alt=""
                                                onClick={() => { document.querySelector("#fileAvatar").click() }} />
                                            <input id="fileAvatar" accept="image/*" className="form-control d-none" type="file"
                                                onChange={changeAvatar}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={onHide}>Close</Button>
                                    <Button type="submit" variant="primary">Save changes</Button>
                                </Modal.Footer>
                            </Form>
                        </>

                    );
                }}
            </Formik>

        </Modal>
    )
}

export default CustomerCreateUpdate