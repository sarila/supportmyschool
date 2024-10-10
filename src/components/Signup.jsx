import React, { useState } from 'react';
import '../css-files/signup.css';

export const Signup = () => {
  // State to manage form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and submit logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="signup-container">
      <div className="intro">
        <span className="title">SMS</span>
        <span className="subtitle">Hack Corruption</span>
      </div>

<div className="form-section">
      <h1>Create an account</h1>
      <form id="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          id="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Create account</button>
      </form>
      <p>Already have an account? <a href="./login.html">Login</a></p>
      </div>
    </div>
  );
};