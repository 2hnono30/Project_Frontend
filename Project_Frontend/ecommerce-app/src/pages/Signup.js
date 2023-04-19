import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import { RegisterService } from "../Services/Register/RegisterService";
const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        staff: {
            fullName: '',
            email: '',
            phoneNumber: '',
            username: '',
            password: ''
        }
    });
    const addUser = async function (event) {
        event.preventDefault();
        try {
            setUser({ ...user });
            console.log(user);
            let resUser = await RegisterService.postRegister(user);
            console.log(resUser)
            if (resUser.status === 201) {
                navigate("/login", { replace: true });
            }
        } catch (error) {
            console.log("register error");
        }
    }
    return (
        <>
            <Meta title={"Sign Up"} />
            <BreadCrumb title="Sign Up" />
            <div class1="login-wrapper py-5 home-wrapper-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <h3 className="text-center mb-3">Sign Up</h3>
                                <form action="" className="d-flex flex-column gap-15" onSubmit={addUser}>
                                    <CustomInput
                                        state={user}
                                        setState={setUser}
                                        type="text"
                                        name="fullName"
                                        placeholder="fullName"
                                    />
                                    <CustomInput
                                        state={user}
                                        setState={setUser}
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                    />
                                    <CustomInput
                                        state={user}
                                        setState={setUser}
                                        type="tel"
                                        name="phoneNumber"
                                        placeholder="phoneNumber"
                                    />
                                    <CustomInput
                                        state={user}
                                        setState={setUser}
                                        type="email"
                                        name="username"
                                        placeholder="username"
                                    />
                                    <CustomInput
                                        state={user}
                                        setState={setUser}
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <div>
                                        <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                            <button className="button border-0">Sign Up</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
