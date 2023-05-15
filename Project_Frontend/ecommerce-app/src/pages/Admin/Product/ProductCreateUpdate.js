import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FastField, Form, Formik } from 'formik';
import InputCustom from "../../../components/CustomField/InputCustom";
import * as Yup from "yup";
import SelectCustom from "../../../components/CustomField/SelectCustom";
import { createProductAvatar } from './ProductAvatarService';
import NoAvatar from "../../../images/noAvatar.jpg";
import { toast } from "react-toastify";

function ProductCreateUpdate(props) {

    const { show, onHide, categories, onSubmit, product, products, brands } = props;
    const [image, setImage] = useState(0);
    const [url, setUrl] = useState();
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required.'),
        price: Yup.string().required('This field is required.'),
        categoryId: Yup.number()
            .required('This field is required.')
            .nullable(),
        brandId: Yup.number()
            .required('This field is required.')
            .nullable(),


    });

    function deleteHandler(image, index) {
        setUrls(urls.filter((e) => e !== image));
        setImages(images.filter((e, index1) => index1 !== index))

    }
    const changeAvatar = (e) => {


        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = function (e) {
            setUrl(reader.result);
        }.bind(this);
        handleUpload(e.target.files[0]);

    }
    useEffect(() => {
        setUrl(product.avatar)
        setUrls(product.images)
        setImage(product.avatarId)
        setImages(product.imageIds)



    }, [show])

    const handleUpload = (image) => {
        // preview image in js => display image 
        // add id of file into object values when on submit 
        // setAvatar({ ...avatar, uploading: true })
        try {
            async function uploadAvatar() {
                let result = await createProductAvatar(image);
                toast.success('Upload Image Success')
                setImage(result.data[0]);
            }
            uploadAvatar();
        } catch {

        }
    }
    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles)
        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        setUrls(imagesArray);
        try {
            async function uploadAvatar() {
                let result = await createProductAvatar(selectedFilesArray);
                toast.success('Upload Image Success')
                setImages(result.data)



            }
            uploadAvatar();
        } catch {

        }




    }

    const submit = (values) => {

        if (image == 0) {
            values.avatarId = product.avatarId;
        } else {
            values.avatarId = image
        }
        if (images.length == 0) {
            values.images = values.imageIds;
        } else {
            console.log(images);
            values.images = images;
        }

        onSubmit(values);

    }
    return (
        <Modal show={show} onHide={onHide} size='lg'>
            <Formik onSubmit={(values) => submit(values)}
                validationSchema={validationSchema}
                initialValues={product}
            >
                {formikProps => {
                    // do something here ...
                    const { values, errors, touched } = formikProps;

                    return (
                        <Form>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div>
                                    <FastField
                                        name="name"
                                        component={InputCustom}
                                        fullWidth
                                        label="Name Product"
                                        placeholder="Eg: Wow nature ..."
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FastField
                                        name="price"
                                        component={InputCustom}
                                        fullWidth
                                        label="Price Product"
                                        placeholder="Eg: 500.000 ..."
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FastField
                                        name="categoryId"
                                        component={SelectCustom}
                                        fullWidth
                                        label="Category"
                                        options={categories}
                                        placeholder="Eg: Category ..."
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <FastField
                                        name="brandId"
                                        component={SelectCustom}
                                        fullWidth
                                        label="Brand"
                                        options={brands}
                                        placeholder="Eg: Brand ..."
                                    />
                                </div>
                                <div className='row' style={{ marginTop: 20 }}>
                                    <div className='col-3'>Avatar</div>
                                    <div className=" d-flex justify-content-end col-9"  >

                                        <div className="w-50 ">
                                            <img className="img-thumbnail avatar-lg" src={url || NoAvatar} alt=""
                                                onClick={() => { document.querySelector("#fileAvatar").click() }} />
                                            <input name='avatar' id="fileAvatar" accept="image/*" className="form-control d-none" type="file"
                                                onChange={changeAvatar}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: 20 }} >
                                    <section>
                                        <label> + Add Images</label>
                                        <br />
                                        <span>up to 10 images</span>
                                        <input
                                            type='file'
                                            name='images'
                                            onChange={onSelectFile}
                                            multiple
                                            accept="image/*">

                                        </input>
                                        {urls.length > 0 &&
                                            (urls.length > 10 ? (
                                                <p className="error">
                                                    You can't upload more than 10 images! <br />
                                                    <span>
                                                        please delete <b> {urls.length - 10} </b> of them{" "}
                                                    </span>
                                                </p>
                                            ) : (
                                                <button
                                                    className="upload-btn"
                                                    onClick={() => {
                                                        console.log(urls);
                                                    }}
                                                >
                                                    UPLOAD {urls.length} IMAGE
                                                    {urls.length === 1 ? "" : "S"}
                                                </button>
                                            ))}

                                        <div className="images">
                                            {urls &&
                                                urls.map((image, index) => {
                                                    return (
                                                        <div key={image} className="image">
                                                            <img src={image} height="200" alt="upload" />
                                                            <button onClick={() => deleteHandler(image, index)}>
                                                                delete image
                                                            </button>
                                                            <p>{index + 1}</p>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </section>


                                </div>


                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={onHide}>Close</Button>
                                <Button type="submit" variant="primary">Save changes</Button>
                            </Modal.Footer>
                        </Form>);
                }}
            </Formik>
        </Modal >
    );
}

export default ProductCreateUpdate;