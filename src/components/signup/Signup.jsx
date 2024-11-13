import React, { useState } from 'react';
import PersonalInfo from './PersonalInfo';
import AccountInfo from './AccountInfo';
import '../../css-files/signup.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/FullResize2.png';

const Signup = () => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    permanentAddress: '',
    temporaryAddress: '',
    schoolId: '',
    role: '',
    username: '',
    password: '',
    type: 'School',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: validateField(id, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Form submitted:', formData); // Print form data to console
      setFormData(initialFormData); // Clear the form
      setErrors({}); // Clear the errors
    }
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'permanentAddress':
      case 'schoolId':
      case 'role':
      case 'username':
      case 'type':
        return value ? '' : `${field.replace(/([A-Z])/g, ' $1')} is required`;
      case 'phoneNumber':
        if (!value) return "Phone Number is required";
        if (!/^\d+$/.test(value)) return "Phone Number should contain only numbers";
        return '';
      case 'email':
        if (!value) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Email format is invalid";
        return '';
      case 'password':
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
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
    <div className="signup-container">
      <img src={Logo} alt="Support My School" className='fullresizelogo'/>
      <h2>Please Sign Up to Create Your Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <PersonalInfo 
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />
        <AccountInfo 
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />
        <button type="submit" className="submit-button">Create Account</button>
      </form>

      <div className="form-row">
        <p className="additional-links-text">
          Already have an account? <Link to="/" className="additional-links">Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;