import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FastField, Form, Formik } from 'formik';
import InputCustom from "../../../components/CustomField/InputCustom";
import * as Yup from "yup";
import NoAvatar from "../../../images/noAvatar.jpg";
import { createBrandAvatar } from './BrandAvatarService';

function BrandCreateUpdate(props) {

    const { show, onHide, brand, brands, onSubmit } = props;
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

        brand.fileUrl = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(brand.fileUrl);
        reader.onloadend = function (e) {
            setUrl(reader.result);
        }.bind(this);
        handleUpload(brand.fileUrl);

    }
    const handleUpload = (image) => {
        try {
            async function uploadAvatar() {
                let result = await createBrandAvatar(image);
                setImage(result.data[0]);
            }
            uploadAvatar();
        } catch {

        }
    }
    useEffect(() => {
        setUrl(brand.fileUrl)
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
                initialValues={brand}
            >
                {formikProps => {
                    const { values, errors, touched } = formikProps;
                    console.log( values, errors, touched);
                    // do something here ...

                    return (
                        <Form>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal Brand</Modal.Title>
                            </Modal.Header>

                            <Modal.Body className='d-flex align-items-center'>
                                <div>
                                    <FastField
                                        name="name"
                                        component={InputCustom}
                                        fullWidth
                                        label="Name brand"
                                        placeholder="Eg: Wow nature ..."
                                    />
                                </div>
                                <div className="col-8 d-flex justify-content-center">
                                    <div className="w-50">
                                        <img className="img-thumbnail avatar-lg" src={url || NoAvatar} alt=""
                                            onClick={() => { document.querySelector("#fileAvatar").click() }} />
                                        <input id="fileAvatar" accept="image/*" className="form-control d-none" type="file"
                                            onChange={changeAvatar}
                                        />
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

export default BrandCreateUpdate;