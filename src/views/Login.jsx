import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import logo from "../assets/FullResize1.png";
import landingimage from "../assets/schoolkids.jpg";
import { validateField, validateForm } from "../utils/formValidation";
import { useNavigate } from "react-router-dom";
import routes from "../routes";

const Login = () => {
  const [formData, setFormData] = useState({
    phonenumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Form submitted:", formData);
      setFormData({
        phonenumber: "",
        email: "",
        password: "",
      });
      navigate(routes.dashboard.path);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundImage: `url(${landingimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Support My School"
            sx={{
              display: "block",
              mx: "auto",
              mb: 2,
              maxWidth: "150px",
            }}
          />
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            Log in to Support My School
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              error={!!errors.phonenumber}
              helperText={errors.phonenumber}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, py: 1 }}
            >
              Login
            </Button>
            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
              <Link href="/sign-up" variant="body2">
                Sign up here
              </Link>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;