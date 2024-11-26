import React from 'react';
import { TextField } from '@mui/material';

const InputField = ({ id, value, handleChange, error, placeholder, type = 'text' }) => {
  return (
    <TextField
      id={id}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      label={placeholder}
      variant="outlined"
      type={type}
      fullWidth
      margin="normal"
    />
  );
};

export default InputField;