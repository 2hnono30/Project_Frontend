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
import { InputAdornment, TextField } from '@mui/material';
import { number } from 'prop-types';

function OrderCreateUpdate(props) {

    const { show, onHide, order, orders, onSubmit } = props;
    const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const validationSchema = Yup.object().shape({
        customerName: Yup.string().required('This field is required.'),
        email: Yup.string().email().matches(emailRegexp, 'Email invalidate').required('This field is required.'),
        phone: Yup.string()
            .min(12, 'Phone Number must have 10 characters')
            .max(12, 'Phone Number up to 10 characters')
            .test('len', 'phone number must start with 03 / 09 or 07', val => ['03', '07', '09'].includes(val?.slice(0, 2)))
            // .matches(phoneRegExp, 'phone number must start with 03 / 09 or 07')
            .required('This field is required.'),
        provinceId: Yup.string()
            .required('This field is required.'),
        districtId: Yup.string()
            .required('This field is required.'),
        wardId: Yup.string()
            .required('This field is required.'),
        // productId: Yup.array()
        //     .of(
        //         Yup.object()
        //             .shape({
        //                 productId: Yup.string.required('This field is required.'),
        //             })
        //             .required(),
        //     ),
        address: Yup.string()
            .required('This field is required.')
    });

    const [image, setImage] = useState(0);
    const [url, setUrl] = useState()
    const [products, setProducts] = useState([]);


    const [provinces, setProvinces] = useState([]);
    const [provinceId, setProvinceId] = useState(order.provinceId);
    const [districts, setDistricts] = useState([]);
    const [districtId, setDistrictId] = useState(order.districtId);
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
            setProducts(e.data.content?.map(e => {
                return {
                    id: e.id,
                    label: e.name,
                    price: e.price
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
        values.provinceName = provinces.find(e => e.id == values.provinceId)?.label;
        values.districtName = districts.find(e => e.id == values.districtId)?.label;
        values.wardName = wards.find(e => e.id == values.wardId)?.label;
        console.log('update', values)
        onSubmit(values);
    }


    return (
        <Modal show={show} onHide={onHide} size='xl'>
            <Formik onSubmit={(values) => submit(values)}
                validationSchema={validationSchema}
                initialValues={order}
            >
                {formikProps => {
                    const { values, errors, touched, setFieldValue } = formikProps;
                    // console.log(values, errors, touched);
                    const handleChangeProduct = (productId, index) => {
                        const product = products.find(e => e.id === productId);
                        setFieldValue(`orderItems[${index}].price`, product?.price);
                    }
                    let subTotal = 0;
                    values.orderItems.forEach(element => {
                        subTotal += (element.price * element.quantity);
                    });
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
                                                placeholder="Eg: Customer Name ..."
                                            />
                                        </div>
                                        <div className='bg-white col' style={{ marginTop: 10, marginLeft: 10 }}>
                                            <FastField
                                                name="email"
                                                component={InputCustom}
                                                fullWidth
                                                label="Email"
                                                placeholder="Eg: Email ..."
                                            />
                                        </div>
                                        <div className='bg-white' style={{ marginTop: 10, marginLeft: 10 }}>
                                            <FastField
                                                name="phone"
                                                component={InputCustom}
                                                fullWidth
                                                label="Phone Number"
                                                placeholder="Eg: Phone Number ..."
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
                                                isEdit={values.id !== null}
                                                placeholder="Eg: Province Name ..."
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
                                                isEdit={values.id !== null}
                                                placeholder="Eg: District Name ..."
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
                                                isEdit={values.id !== null}
                                                placeholder="Eg: Ward Name ..."
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
                                        values.orderItems.map((orderItem, index) => {

                                            return (
                                                <div key={index + 'orderUpdate'} className='d-flex justify-content-center' style={{ marginTop: 10, marginLeft: 10 }}>
                                                    <div className='col'>
                                                        <Field
                                                            name={`orderItems[${index}].productId`}
                                                            component={AutocompleteCustom}
                                                            fullWidth
                                                            label="Product"
                                                            isEdit={orderItem.id !== null}
                                                            options={products}
                                                            handleChangeValue={handleChangeProduct}
                                                            index={index}
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
                                                            type="number"

                                                        />
                                                    </div>
                                                    <div className='bg-white col' style={{ marginLeft: 10 }}>
                                                        <FastField
                                                            name={`orderItems[${index}].price`}
                                                            component={InputCustom}
                                                            placeholder="Eg: Price ..."
                                                            fullWidth
                                                            label="Price"
                                                            disabled={true}
                                                            currFormat="$"
                                                        />
                                                    </div>
                                                    <div className='bg-white col' style={{ marginLeft: 10 }}>
                                                        <TextField value={orderItem.quantity * orderItem.price || 0} label="Amount"
                                                            placeholder="Eg: Amount ..."
                                                            disabled={true}
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                            )
                                        })
                                    )}
                                    <div className='d-flex justify-content-between'>
                                        <Button style={{ marginLeft: 10, marginTop: 10 }}
                                            onClick={() => {
                                                setFieldValue("orderItems", [
                                                    ...values.orderItems,
                                                    {
                                                        id: null,
                                                        productId: null,
                                                        quantity: 0,
                                                        price: 0,
                                                        amount: 0,
                                                    }
                                                ]);
                                            }}
                                        >Add Product</Button>
                                        <div style={{ marginLeft: 10, marginTop: 10 }}>TotalAmount With Shipping Fee ($10) : {"$" + `${subTotal + 10}` || ("$" + 0)}</div>
                                    </div>
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