import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import CustomInput from "../components/CustomInput";
import { useRef } from "react";
import { useState } from "react";
import { LoginService } from "../Services/Login/LoginService";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', password: '' });
    const login = async function (event) {
        event.preventDefault();
        try {
            setUser({ ...user });
            console.log(user);
            let resUser = await LoginService.postLogin(user);
            if (resUser.data) {
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.log("Login error");
        }
    }
    return (
        <>
            <Meta title={"Login"} />
            <BreadCrumb title="Login" />

            <div class1="login-wrapper py-5 home-wrapper-2">
                <div className='container-xxl'>
                    <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <h3 className="text-center mb-3">Login</h3>
                                <form action="" className="d-flex flex-column gap-15" onSubmit={login}>
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
                                        <Link to="">Forgot Password?</Link>

                                        <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                            <button className="button border-0" type="submit">
                                                Login
                                            </button>
                                            <Link to="/signup" className="button signup">
                                                SignUp
                                            </Link>
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

export default Login;
