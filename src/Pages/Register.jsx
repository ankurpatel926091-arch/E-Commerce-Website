import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {

    const api_url = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const registerUser = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Password and Confirm Password must be same");
            return;
        }

        try {

            const res = await axios.post(
                `${api_url}/api/user/register`,
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }
            );

            if (res.status === 201) {

                alert("Account Created Successfully");

                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });

                navigate("/login");
            }

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );
        }
    };

    return (

        <div className="register-page">

            <div className="background-shapes">
                <span className="shape shape1"></span>
                <span className="shape shape2"></span>
                <span className="shape shape3"></span>
                <span className="shape shape4"></span>
            </div>

            <div className="register-wrapper">

                <div className="register-left">

                    <h1>Create Account 🚀</h1>

                    <p>
                        Join our store today and enjoy
                        secure shopping with premium
                        experience.
                    </p>

                </div>

                <div className="register-card">

                    <div className="register-header">

                        <h2>Register</h2>

                        <p>Create your new account</p>

                    </div>

                    <form onSubmit={registerUser}>
                                                <div className="input-group">
                            <label>Full Name</label>

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Email Address</label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Create password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>

                            <input
                                type="password"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        confirmPassword: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="register-btn"
                        >
                            Create Account
                        </button>
                                                <div className="register-divider">
                            <span>OR</span>
                        </div>

                        <div className="login-section">
                            <p>
                                Already have an account?
                                <span
                                    className="login-link"
                                    onClick={() => navigate("/login")}
                                >
                                    {" "}Sign In
                                </span>
                            </p>
                        </div>

                    </form>

                </div>

            </div>

        </div>

    );
};

export default Register;