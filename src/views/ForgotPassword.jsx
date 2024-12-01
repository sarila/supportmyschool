import React, { useState } from "react";
import { validateField } from "../utils/formValidation";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

const ForgotPassword = () => {
  const [verificationMethod, setVerificationMethod] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const errorMessage = validateField(verificationMethod, value);
    setError(errorMessage || "");
  };

  const handleSubmit = () => {
    const errorMessage = validateField(verificationMethod, inputValue);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    console.log(`Verification Method: ${verificationMethod}`);
    console.log(`Value: ${inputValue}`);
    alert("Submitted successfully!");
    setInputValue("");
    setError("");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please select a verification method and enter your email or phone
          number to reset your password.
        </Typography>

        <FormControl component="fieldset" sx={{ mt: 3 }}>
          <FormLabel component="legend">Verification Method</FormLabel>
          <RadioGroup
            row
            value={verificationMethod}
            onChange={(e) => {
              setVerificationMethod(e.target.value);
              setError("");
              setInputValue("");
            }}
          >
            <FormControlLabel
              value="email"
              control={<Radio />}
              label="Email"
            />
            <FormControlLabel
              value="phone"
              control={<Radio />}
              label="Phone Number"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label={
            verificationMethod === "email" ? "Email Address" : "Phone Number"
          }
          variant="outlined"
          value={inputValue}
          onChange={handleChange}
          error={!!error}
          helperText={error}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default ForgotPassword;