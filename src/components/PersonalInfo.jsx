import React from 'react';
import { Box, Typography } from '@mui/material';
import InputField from './InputField';

const PersonalInfo = ({ formData, errors, handleChange }) => {
  return (
    <Box>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Personal Info
      </Typography>
      <InputField
        id="firstName"
        value={formData.firstName}
        handleChange={handleChange}
        error={errors.firstName}
        placeholder="First Name"
      />
      <InputField
        id="lastName"
        value={formData.lastName}
        handleChange={handleChange}
        error={errors.lastName}
        placeholder="Last Name"
      />
      <InputField
        id="phoneNumber"
        value={formData.phoneNumber}
        handleChange={handleChange}
        error={errors.phoneNumber}
        placeholder="Phone Number"
      />
      <InputField
        id="email"
        value={formData.email}
        handleChange={handleChange}
        error={errors.email}
        placeholder="Email"
      />
      <InputField
        id="permanentAddress"
        value={formData.permanentAddress}
        handleChange={handleChange}
        error={errors.permanentAddress}
        placeholder="Permanent Address"
      />
      <InputField
        id="temporaryAddress"
        value={formData.temporaryAddress}
        handleChange={handleChange}
        error={errors.temporaryAddress}
        placeholder="Temporary Address"
      />
    </Box>
  );
};

export default PersonalInfo;