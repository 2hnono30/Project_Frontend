import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FastField, Form, Formik, Field } from 'formik';
import InputCustom from "../../../components/CustomField/InputCustom";
import * as Yup from "yup";
import NoAvatar from "../../../images/noAvatar.jpg";
import AutocompleteCustom from './../../../components/CustomField/AutoCompleteCustom/index';
import { ProductService } from './../../../Services/Product/ProductService';
import { districtCallAPI, provinceCallAPI, wardCallAPI } from '../../../Services/Address/AddressService';
import SelectCustom from '../../../components/CustomField/SelectCustom';
import CustomerInformation from './../../Checkout/CustomerInformation';
import { currencyFormat } from '../../../components/Utils/Utils';
function OrderCreateUpdate(props) {

    const { show, onHide, order, orders, onSubmit } = props;
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('This field is required.')
            .min(2, 'Brand Name with at least 2 characters')
            .max(8, 'Brand Name has at most 8 characters'),
        id: Yup.number()
            .required('This field is required.')
            .nullable(),
    });
    const [image, setImage] = useState(0);
    const [url, setUrl] = useState()
    const [products, setProducts] = useState([]);


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
                    label: e.province_name
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
                            label: e.district_name
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
                            label: e.ward_name
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

    const changeAvatar = (e) => {
        order.fileUrl = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(order.fileUrl);
        reader.onloadend = function (e) {
            setUrl(reader.result);
        }.bind(this);
        handleUpload(order.fileUrl);

    }
    const handleUpload = (image) => {
        try {
            async function uploadAvatar() {
                // let result = await createBrandAvatar(image);
                // setImage(result.data[0]);
            }
            uploadAvatar();
        } catch {

        }
    }

    const fetchProductsData = () => {
        ProductService.getAllProducts().then(e => {
            setProducts(e.data.content.map(e => {
                return {
                    id: e.id,
                    label: e.name
                }
            }));
        })
    }
    useEffect(() => {
        fetchProductsData();
    }, [])
    useEffect(() => {
        setUrl(order.fileUrl)
    }, [show])
    const submit = (values) => {
        console.log(values);
        values.image = image;
        onSubmit(values);
    }


    return (
        <Modal show={show} onHide={onHide} size='xl'>
            <Formik onSubmit={(values) => submit(values)}
                validationSchema={validationSchema}
                initialValues={order}
            >
                {formikProps => {
                    const { values, errors, touched } = formikProps;
                    console.log(values, errors, touched);

                    // do something here ...

                    return (
                        <Form>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal order</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>

                                <div className=''>
                                    <h5>Customer Information</h5>
                                    <div className='d-flex justify-content-center '>
                                        <div className='bg-white col' style={{ marginTop: 10 }}>
                                            <FastField
                                                name="customerName"
                                                component={InputCustom}
                                                fullWidth
                                                label="Customer Name"
                                                placeholder="Eg: Quantity ..."
                                            />
                                        </div>
                                        <div className='bg-white col' style={{ marginTop: 10, marginLeft: 10 }}>
                                            <FastField
                                                name="email"
                                                component={InputCustom}
                                                fullWidth
                                                label="Email"
                                                placeholder="Eg: Quantity ..."
                                            />
                                        </div>
                                        <div className='bg-white' style={{ marginTop: 10, marginLeft: 10 }}>
                                            <FastField
                                                name="phone"
                                                component={InputCustom}
                                                fullWidth
                                                label="Phone Number"
                                                placeholder="Eg: Quantity ..."
                                            />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center '>
                                        <div className="flex-grow-1 bg-white" style={{ marginTop: 10 }}>
                                            <Field
                                                name="provinceId"
                                                component={AutocompleteCustom}
                                                fullWidth
                                                label="Province Name"
                                                options={provinces}
                                                placeholder="Eg: Province ..."
                                                handleChangeCustom={setProvinceId}
                                            />
                                        </div>
                                        <div className="flex-grow-1 bg-white" style={{ marginTop: 10, marginLeft: 10 }}>
                                            <Field
                                                name="districtId"
                                                component={AutocompleteCustom}
                                                fullWidth
                                                label="District Name"
                                                options={districts}
                                                placeholder="Eg: District ..."
                                                handleChangeCustom={setDistrictId}
                                            />
                                        </div>
                                        <div className="flex-grow-1 bg-white" style={{ marginTop: 10, marginLeft: 10 }}>
                                            <Field
                                                name="wardId"
                                                component={AutocompleteCustom}
                                                fullWidth
                                                label="Ward Name"
                                                options={wards}
                                                placeholder="Eg: Ward ..."
                                            />
                                        </div>
                                        <div className='bg-white col-3' style={{ marginLeft: 10, marginTop: 10 }}>
                                            <FastField
                                                name="address"
                                                component={InputCustom}
                                                fullWidth
                                                label="Address"
                                                placeholder="Eg: Address ..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <h5>Product Information</h5>
                                    {(
                                        order.orderItems.map((orderItem, index) => {
                                            return (
                                                <div key={index} className='d-flex justify-content-center' style={{ marginTop: 10, marginLeft: 10 }}>
                                                    <div className='col'>
                                                        <Field
                                                            name={`orderItems[${index}].productId`}
                                                            component={AutocompleteCustom}
                                                            fullWidth
                                                            label="Product"
                                                            options={products}
                                                            placeholder="Eg: Province ..."
                                                        />
                                                    </div>
                                                    <div className='bg-white col' style={{ marginLeft: 10 }}>
                                                        <FastField
                                                            name={`orderItems[${index}].quantity`}
                                                            component={InputCustom}
                                                            fullWidth
                                                            label="Quantity"
                                                            placeholder="Eg: Quantity ..."
                                                        />
                                                    </div>
                                                    <div className='bg-white col' style={{ marginLeft: 10 }}>
                                                        <FastField
                                                            name={`orderItems[${index}].price`}
                                                            component={InputCustom}
                                                            placeholder="Eg: Price ..."
                                                            fullWidth
                                                            label="Price"
                                                            disabled={ true }
                                                            currFormat="$"
                                                            handleChangeCustom
                                                        />
                                                    </div>
                                                    <div className='bg-white col' style={{ marginLeft: 10 }}>
                                                        <FastField
                                                            name={`orderItems[${index}].amount`}
                                                            component={InputCustom}
                                                            placeholder="Eg: Amount ..."
                                                            fullWidth
                                                            label="Amount"
                                                            disabled={ true }
                                                            currFormat="$"
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )}
                                    <Button  style={{ marginLeft: 10,marginTop: 10  }} >Add Product</Button>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={onHide}>Close</Button>
                                <Button type="submit" variant="primary">Save changes</Button>
                            </Modal.Footer>
                        </Form>);
                }}
            </Formik>
        </Modal>
    );
}

export default OrderCreateUpdate;