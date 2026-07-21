import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const api_url = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${api_url}/api/user/login`,
        formData
      );

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.userData)
        );

        alert("Login Successfully");

        setFormData({
          email: "",
          password: "",
        });

        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="background-shapes">
        <span className="shape shape1"></span>
        <span className="shape shape2"></span>
        <span className="shape shape3"></span>
        <span className="shape shape4"></span>
      </div>

      <div className="login-wrapper">
        <div className="login-left">
          <h1>Welcome Back 👋</h1>

          <p>
            Login to access your account and continue
            exploring our premium shopping experience.
          </p>
        </div>

        <div className="login-card">
          <div className="login-header">
            <h2>Sign In</h2>
            <p>Enter your credentials to continue</p>
          </div>

          <form onSubmit={loginUser}>
                        <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="login-options">
              <button
                type="button"
                className="forgot-btn"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="login-btn">
              Sign In
            </button>
                        <div className="login-divider">
              <span>OR</span>
            </div>

            <div className="register-section">
              <p>
                Don't have an account?
                <span
                  className="register-link"
                  onClick={() => navigate("/register")}
                >
                  {" "}
                  Create Account
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;