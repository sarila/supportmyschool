import React from 'react';
import ErrorMessage from './ErrorMessage';

const InputField = ({ id, value, handleChange, error, placeholder }) => {
  return (
    <div>
      <label htmlFor={id}>{placeholder}</label>
      <input
        type={id === 'password' ? 'password' : 'text'}
        id={id}
        value={value}
        onChange={handleChange}
        className={error ? 'error' : ''}
        placeholder={placeholder}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default InputField;
