import React from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

const AccountInfo = ({ formData, errors, handleChange, handleBlur }) => (
  <Box>
    <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
      Account Info
    </Typography>
    <FormControl fullWidth margin="normal" error={!!errors.type}>
      <InputLabel id="type-label">Account Type</InputLabel>
      <Select
        labelId="type-label"
        id="type"
        name="type"
        value={formData.type || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Account Type"
    sx={{
      fontSize: "1rem",
      height: "56px",
    }}
      >
        <MenuItem value="School">School</MenuItem>
        <MenuItem value="Government Body">Government Body</MenuItem>
      </Select>
    </FormControl>
    {errors.type && <Typography color="error">{errors.type}</Typography>}

    {formData.type === "School" && (
      <TextField
        fullWidth
        margin="normal"
        id="id"
        name="id"
        value={formData.id || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        label="School ID"
        error={!!errors.id}
        helperText={errors.id}
      />
    )}

    {/* {formData.type === "Government Body" && (
      <TextField
        fullWidth
        margin="normal"
        id="role"
        name="role"
        value={formData.role || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Role"
        error={!!errors.role}
        helperText={errors.role}
      />
    )} */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        fullWidth
        margin="normal"
        id="username"
        name="username"
        value={formData.username || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Username"
        error={!!errors.username}
        helperText={errors.username}
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          margin="normal"
          id="password"
          name="password"
          type="password"
          value={formData.password || ""}
          onChange={handleChange}
          onBlur={handleBlur}
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
          value={formData.confirmPassword || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Confirm Password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
      </Box>
    </Box>
  </Box>
);

export default AccountInfo;