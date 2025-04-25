import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Avatar,
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Divider,
  IconButton,
  Card,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: "800px",
  margin: "0 auto",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  borderRadius: theme.shape.borderRadius * 2,
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 20px rgba(0,0,0,0.15)",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(18),
  height: theme.spacing(18),
  margin: "0 auto",
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
    },
    "&.Mui-focused": {
      transform: "translateY(-2px)",
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: theme.shape.borderRadius,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
  },
}));

const UserProfile = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    province: "",
    municipality: "",
    ward: "",
    school: "",
    role: "",
    image: null,
  });

  const [formData, setFormData] = useState(userData);
  const [error, setError] = useState("");

  const provinces = [
    "Province 1",
    "Madhesh",
    "Bagmati",
    "Gandaki",
    "Lumbini",
    "Karnali",
    "Sudurpashchim",
  ];
  const municipalities = [
    "Kathmandu",
    "Lalitpur",
    "Bhaktapur",
    "Pokhara",
    "Bharatpur",
  ];
  const schools = ["ABC School", "XYZ School", "City School", "Modern School"];
  const wards = Array.from({ length: 32 }, (_, i) => (i + 1).toString());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError("Name and Email are required!");
      toast.error("Please fill in the required fields!", {
        position: "top-center",
      });
      return;
    }
    setError("");
    setUserData(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully!", { position: "top-right" });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 5,
        px: 3,
        bgcolor: theme.palette.background.default,
      }}
    >
      <ToastContainer />
      <StyledCard elevation={3}>
        <Box textAlign="center" mb={4}>
          <Box position="relative" display="inline-block">
            <StyledAvatar
              src={userData.image || "/default-avatar.png"}
              alt={userData.name || "User"}
            />
            <IconButton
              onClick={() => setIsEditing(!isEditing)}
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                bgcolor: theme.palette.primary.main,
                color: "white",
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              {isEditing ? <CancelIcon /> : <EditIcon />}
            </IconButton>
          </Box>
          <Typography
            variant="h4"
            sx={{
              mt: 2,
              fontWeight: "bold",
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {userData.name || "Your Name"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            {userData.role || "Your Role"}
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  error={!!error}
                  helperText={error}
                  placeholder="Enter your full name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  error={!!error}
                  helperText={error}
                  placeholder="Enter your email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="province-label">Province</InputLabel>
                  <StyledSelect
                    labelId="province-label"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    label="Province"
                  >
                    <MenuItem value="" disabled>
                      Select a province
                    </MenuItem>
                    {provinces.map((province) => (
                      <MenuItem key={province} value={province}>
                        {province}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="municipality-label">Municipality</InputLabel>
                  <StyledSelect
                    labelId="municipality-label"
                    name="municipality"
                    value={formData.municipality}
                    onChange={handleInputChange}
                    label="Municipality"
                  >
                    <MenuItem value="" disabled>
                      Select a municipality
                    </MenuItem>
                    {municipalities.map((municipality) => (
                      <MenuItem key={municipality} value={municipality}>
                        {municipality}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="school-label">School</InputLabel>
                  <StyledSelect
                    labelId="school-label"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    label="School"
                  >
                    <MenuItem value="" disabled>
                      Select a school
                    </MenuItem>
                    {schools.map((school) => (
                      <MenuItem key={school} value={school}>
                        {school}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="ward-label">Ward</InputLabel>
                  <StyledSelect
                    labelId="ward-label"
                    name="ward"
                    value={formData.ward}
                    onChange={handleInputChange}
                    label="Ward"
                  >
                    <MenuItem value="" disabled>
                      Select a ward
                    </MenuItem>
                    {wards.map((ward) => (
                      <MenuItem key={ward} value={ward}>
                        {ward}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<SaveIcon />}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <Grid container spacing={3}>
            {Object.entries(userData).map(
              ([key, value]) =>
                key !== "image" && (
                  <Grid item xs={12} sm={6} key={key}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: theme.palette.action.hover,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        sx={{ mb: 1, fontWeight: 600 }}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Typography>
                      <Typography variant="body1">
                        {value || `Enter your ${key}`}
                      </Typography>
                    </Paper>
                  </Grid>
                )
            )}
          </Grid>
        )}
      </StyledCard>
    </Box>
  );
};

export default UserProfile;
