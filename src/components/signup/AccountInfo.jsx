import React from 'react';
import InputField from './InputField';

const AccountInfo = ({ formData, errors, handleChange }) => {
  return (
    <section className="form-section">
      <h3>Account Info</h3>
      <div className="form-row">
        <div style={{ flex: 1 }}>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={formData.type}
            onChange={handleChange}
            className={errors.type ? 'error' : ''}
          >
            <option value="School">School</option>
            <option value="Government Body">Government Body</option>
          </select>
          {errors.type && <small className="error-text">{errors.type}</small>}
        </div>
      </div>

      {/* Conditional rendering for Government Body */}
      {formData.type === 'Government Body' && (
        <div className="form-row">
          <div style={{ flex: 1 }}>
            <InputField
              id="role"
              value={formData.role}
              handleChange={handleChange}
              error={errors.role}
              placeholder="Enter your role"
            />
          </div>
        </div>
      )}

      {/* Conditional rendering for School */}
      {formData.type === 'School' && (
        <div className="form-row">
          <div style={{ flex: 1 }}>
            <InputField
              id="schoolId"
              value={formData.schoolId}
              handleChange={handleChange}
              error={errors.schoolId}
              placeholder="Enter your school ID"
            />
          </div>
          <div style={{ flex: 1 }}>
            <InputField
              id="role"
              value={formData.role}
              handleChange={handleChange}
              error={errors.role}
              placeholder="Enter your role"
            />
          </div>
        </div>
      )}

      <div className="form-row">
        <InputField
          id="username"
          value={formData.username}
          handleChange={handleChange}
          error={errors.username}
          placeholder="Enter your username"
        />
        <InputField
          id="password"
          value={formData.password}
          handleChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
        />
      </div>
    </section>
  );
};

export default AccountInfo;
