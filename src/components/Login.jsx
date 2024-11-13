import React, { useState } from "react";
import "../css-files/login.css";
import logo from "../assets/FullResize1.png";
import landingimage from "../assets/schoolkids.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Form submitted:', formData);
      // Clear the form data after successful submission
      setFormData({
        username: '',
        email: '',
        password: ''
      });
    }
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'username':
        return value ? '' : 'Username is required';
      case 'email':
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email format is invalid';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  };

  const validateForm = (data) => {
    const newErrors = {};
    for (const field in data) {
      const error = validateField(field, data[field]);
      if (error) newErrors[field] = error;
    }
    return newErrors;
  };

  return (
    <div className="login-page">
      <div className="image-section">
        <img src={landingimage} alt="School children" className="background-image" />
      </div>
      <div className="login-section">
        <div className="login-container">
          <img src={logo} alt="Support My School" className="logo" />
          <form onSubmit={handleSubmit}>
            <div className="loginbox">
              <div className="input-container">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
                {errors.username && <span className="error">{errors.username}</span>}
              </div>

              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="input-container">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>

              <div className="login-button-container">
                <button type="submit" className="login-button">Login</button>
              </div>
              <a href="/forgot-password" className="additional-links">Forgot your password?</a>
            </div>
            <p className="additional-links-text">
              New to Support My School? <a className="additional-links" href="/sign-up">Sign up here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;