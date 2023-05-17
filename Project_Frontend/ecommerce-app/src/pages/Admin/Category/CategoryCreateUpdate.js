import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FastField, Form, Formik} from 'formik';
import InputCustom from "../../../components/CustomField/InputCustom";
import * as Yup from "yup";
import SelectCustom from "../../../components/CustomField/SelectCustom";


function CategoryCreateUpdate(props) {
    const {show, onHide, category, categories, onSubmit} = props;
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required.'),
        id: Yup.number()
            .required('This field is required.')
            .nullable(),
    });
    return (
        <Modal show={show} onHide={onHide}>
            <Formik onSubmit={(values) => onSubmit(values)}
                    validationSchema={validationSchema}
                    initialValues={category}
            >
                {formikProps => {
                    // do something here ...
                    const {values, errors, touched} = formikProps;
                    console.log({values, errors, touched});
                    return (
                        <Form>
                            <Modal.Header closeButton>
                                <Modal.Title>Create Category</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div>
                                    <FastField
                                        name="name"
                                        component={InputCustom}
                                        fullWidth
                                        label="Name Category"
                                        placeholder="Eg: Wow nature ..."
                                    />
                                </div>
                                
                                <div style={{marginTop: 20}}>
                                    <FastField
                                        name="id"
                                        component={SelectCustom}
                                        fullWidth
                                        label="Id"
                                        options={categories}
                                        placeholder="Eg: Category ..."
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

export default CategoryCreateUpdate;