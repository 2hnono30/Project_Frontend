import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RegisterService } from "../../Services/Register/RegisterService";
import { toast, ToastContainer } from 'react-toastify';
import { Container, Paper } from "@mui/material";
import UserCreate from "./UserCreate";

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        username: '',
        password: ''
    });
    const addUser = (values) => {
        try {
            console.log(values);
            RegisterService(values).then(e => {
                if (e.status === 201) {
                    navigate("/login", { replace: true });
                }
                toast.success("account registration successfully ");
            });
        } catch (error) {
            toast.error("account registration failed");
        }
    }

    return <UserCreate
        user={user}
        addUser={addUser} />
};

export default Signup;
