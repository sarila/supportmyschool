import React from 'react';
import InputField from './InputField';

const PersonalInfo = ({ formData, errors, handleChange }) => {
  return (
    <section className="form-section">
      <h3>Personal Info</h3>
      <div className="form-row">
        <InputField
          id="firstName"
          value={formData.firstName}
          handleChange={handleChange}
          error={errors.firstName}
          placeholder="Enter your first name"
        />
        <InputField
          id="lastName"
          value={formData.lastName}
          handleChange={handleChange}
          error={errors.lastName}
          placeholder="Enter your last name"
        />
      </div>
      <div className="form-row">
        <InputField
          id="phoneNumber"
          value={formData.phoneNumber}
          handleChange={handleChange}
          error={errors.phoneNumber}
          placeholder="Enter your phone number"
        />
        <InputField
          id="email"
          value={formData.email}
          handleChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-row">
        <InputField
          id="permanentAddress"
          value={formData.permanentAddress}
          handleChange={handleChange}
          error={errors.permanentAddress}
          placeholder="Enter your permanent address"
        />
        <InputField
          id="temporaryAddress"
          value={formData.temporaryAddress}
          handleChange={handleChange}
          error={errors.temporaryAddress}
          placeholder="Enter your temporary address"
        />
      </div>
    </section>
  );
};

export default PersonalInfo;
