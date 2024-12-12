import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = () => {
  const [verificationMethod, setVerificationMethod] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          position: "relative",
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
        <Button
          startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            fontSize: "1rem",
            textTransform: "none",
          }}
          onClick={handleBack}
        >
          Back
        </Button>

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