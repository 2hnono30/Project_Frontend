import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FastField, Form, Formik } from 'formik';
import InputCustom from "../../../components/CustomField/InputCustom";
import * as Yup from "yup";
import NoAvatar from "../../../images/noAvatar.jpg";
import AutocompleteCustom from '../../../components/CustomField/Autocomplete';

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

    useEffect(() => {
        setUrl(order.fileUrl)
    }, [show])
    const submit = (values) => {
        console.log(values);
        values.image = image;
        onSubmit(values);
    }


    return (
        <Modal show={show} onHide={onHide}>
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

                            <Modal.Body className='d-flex align-items-center'>
                                <div>
                                    <FastField
                                        name="name"
                                        // component={AutocompleteCustom}
                                        fullWidth
                                        // label="Product"
                                        placeholder="Eg: Wow nature ..."
                                    />
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