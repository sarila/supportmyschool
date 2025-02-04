import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, Avatar } from "@mui/material";
import '../styles/profile.css';

const UserProfile = () => {
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
  const [error, setError] = useState('');

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
      return;
    }

    setError('');
    setUserData(formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image">
            {userData.image ? (
              <Avatar src={userData.image} alt="Profile" sx={{ width: 96, height: 96 }} />
            ) : (
              <i className="fas fa-user text-4xl text-[#0a192f]"></i>
            )}
          </div>
          <h1 className="profile-title">Profile</h1>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="contained"
            color="warning"
            className="edit-button"
          >
            <i className={`fas ${isEditing ? "fa-times" : "fa-edit"}`}></i> {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="form-container">
              <Grid container spacing={4}>
                {[
                  { label: "Full Name", name: "name", type: "text", icon: "fa-user" },
                  { label: "Email", name: "email", type: "email", icon: "fa-envelope" },
                ].map(({ label, name, type, icon }) => (
                  <Grid item xs={12} md={6} key={name}>
                    <TextField
                      fullWidth
                      label={label}
                      name={name}
                      type={type}
                      value={formData[name]}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <i className={`fas ${icon} text-yellow-400`} />
                        ),
                      }}
                      variant="outlined"
                      className="input-field"
                      error={error && (name === 'name' || name === 'email')}
                      helperText={error && (name === 'name' || name === 'email') ? error : ''}
                    />
                  </Grid>
                ))}
              </Grid>

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Province</InputLabel>
                    <Select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      label="Province"
                      className="select-field"
                    >
                      <MenuItem value="">Select Province</MenuItem>
                      {provinces.map((province) => (
                        <MenuItem key={province} value={province}>
                          {province}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Municipality</InputLabel>
                    <Select
                      name="municipality"
                      value={formData.municipality}
                      onChange={handleInputChange}
                      label="Municipality"
                      className="select-field"
                    >
                      <MenuItem value="">Select Municipality</MenuItem>
                      {municipalities.map((municipality) => (
                        <MenuItem key={municipality} value={municipality}>
                          {municipality}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>School</InputLabel>
                    <Select
                      name="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      label="School"
                      className="select-field"
                    >
                      <MenuItem value="">Select School</MenuItem>
                      {schools.map((school) => (
                        <MenuItem key={school} value={school}>
                          {school}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Ward</InputLabel>
                    <Select
                      name="ward"
                      value={formData.ward}
                      onChange={handleInputChange}
                      label="Ward"
                      className="select-field"
                    >
                      <MenuItem value="">Select Ward</MenuItem>
                      {wards.map((ward) => (
                        <MenuItem key={ward} value={ward}>
                          {ward}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="warning"
                fullWidth
                className="save-button"
              >
                Save Changes
              </Button>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-row">
                <span className="info-label">Full Name:</span>
                <span className="info-value">{userData.name || "N/A"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{userData.email || "N/A"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Province:</span>
                <span className="info-value">{userData.province || "N/A"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Municipality:</span>
                <span className="info-value">{userData.municipality || "N/A"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">School:</span>
                <span className="info-value">{userData.school || "N/A"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Ward:</span>
                <span className="info-value">{userData.ward || "N/A"}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
