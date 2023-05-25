import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FastField, Form, Formik } from 'formik';
import InputCustom from "../../../components/CustomField/InputCustom";
import * as Yup from "yup";
import NoAvatar from "../../../images/noAvatar.jpg";
import { createCategoryAvatar } from './CategoryAvatarService';


function CategoryCreateUpdate(props) {
    const { show, onHide, category, categories, onSubmit } = props;
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('This field is required.')
            .min(2, 'Category Name with at least 2 characters'),
        id: Yup.number()
            .required('This field is required.')
            .nullable(),
    });

    const [image, setImage] = useState(0);
    const [url, setUrl] = useState()
    const changeAvatar = (e) => {

        category.fileUrl = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(category.fileUrl);
        reader.onloadend = function (e) {
            setUrl(reader.result);
        }.bind(this);
        handleUpload(category.fileUrl);

    }
    const handleUpload = (image) => {
        try {
            async function uploadAvatar() {
                let result = await createCategoryAvatar(image);
                setImage(result.data[0]);
            }
            uploadAvatar();
        } catch {

        }
    }
    useEffect(() => {
        setUrl(category.fileUrl)
    }, [show])
    const submit = (values) => {
        values.image = image;
        console.log(values.image);
        onSubmit(values);
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Formik onSubmit={(values) => submit(values)}
                validationSchema={validationSchema}
                initialValues={category}
            >
                {formikProps => {
                    // do something here ...
                    const { values, errors, touched } = formikProps;
                    console.log({ values, errors, touched });
                    return (
                        <Form>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal Category</Modal.Title>
                            </Modal.Header>

                            <Modal.Body className='d-flex align-items-center'>
                                <div>
                                    <FastField
                                        name="name"
                                        component={InputCustom}
                                        fullWidth
                                        label="Name category"
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

export default CategoryCreateUpdate;