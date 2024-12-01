import React from 'react';
import { Box, Typography, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';

const AccountInfo = ({ formData, errors, handleChange }) => {

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Account Info
      </Typography>

      {/* Account Type Select Dropdown */}
      <FormControl fullWidth margin="normal" error={!!errors.type}>
        <InputLabel id="type-label">Account Type</InputLabel>
        <Select
          labelId="type-label"
          id="type"
          name="type"
          value={formData.type || ''}
          onChange={handleSelectChange}
        >
          <MenuItem value="School">School</MenuItem>
          <MenuItem value="Government Body">Government Body</MenuItem>
        </Select>
      </FormControl>
      {errors.type && <Typography color="error">{errors.type}</Typography>}

      {formData.type === 'School' && (
        <TextField
          fullWidth
          margin="normal"
          id="schoolId"
          name="schoolId"
          value={formData.schoolId || ''}
          onChange={handleInputChange}
          label="School ID"
          error={!!errors.schoolId}
          helperText={errors.schoolId}
        />
      )}

      {formData.type === 'Government Body' && (
        <TextField
          fullWidth
          margin="normal"
          id="role"
          name="role"
          value={formData.role || ''}
          onChange={handleInputChange}
          label="Role"
          error={!!errors.role}
          helperText={errors.role}
        />
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          margin="normal"
          id="username"
          name="username"
          value={formData.username || ''}
          onChange={handleInputChange}
          label="Username"
          error={!!errors.username}
          helperText={errors.username}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            type="password"
            value={formData.password || ''}
            onChange={handleInputChange}
            label="Password"
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            fullWidth
            margin="normal"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword || ''}
            onChange={handleInputChange}
            label="Confirm Password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AccountInfo;