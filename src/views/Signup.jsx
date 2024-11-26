import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import PersonalInfo from '../components/PersonalInfo';
import AccountInfo from '../components/AccountInfo';
import { validateForm } from '../utils/formValidation'; // Correctly importing the named export
import Logo from '../assets/FullResize2.png';
import '../styles/signup.css';

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
    confirmPassword: '',
    type: 'School',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: validateForm({ ...formData, [id]: value })[id] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Form submitted:', formData);
      setFormData(initialFormData);
      setErrors({});
    }
  };

  return (
    <Box className="signup-container" sx={{ maxWidth: '600px', mx: 'auto', py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <img src={Logo} alt="Support My School" className="fullresizelogo" />
        <Typography variant="h4" component="h1">
          Please Sign Up to Create Your Account
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <PersonalInfo formData={formData} errors={errors} handleChange={handleChange} />
        <AccountInfo formData={formData} errors={errors} handleChange={handleChange} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Create Account
        </Button>
      </form>
      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        Already have an account?{' '}
        <a href="/" className="additional-links">
          Login Here
        </a>
      </Typography>
    </Box>
  );
};

export default Signup;