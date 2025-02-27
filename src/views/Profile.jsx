import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Avatar,
  Container,
  Paper,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const municipalities = ["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Bharatpur"];
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
      toast.error("Please fill in the required fields!", { position: "top-center" });
      return;
    }
    setError("");
    setUserData(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully!", { position: "top-right" });
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <ToastContainer />
      <Paper elevation={3} className="p-4 w-100" style={{ maxWidth: "600px" }}>
        <div className="text-center mb-3">
          {userData.image ? (
            <Avatar src={userData.image} alt="Profile" sx={{ width: 96, height: 96 }} />
          ) : (
            <Avatar sx={{ bgcolor: "yellow", width: 96, height: 96 }}>U</Avatar>
          )}
          <h2 className="mt-2">Profile</h2>
          <Button onClick={() => setIsEditing(!isEditing)} variant="warning">
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12">
              <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleInputChange} variant="outlined" error={!!error} helperText={error} />
            </div>
            <div className="col-12">
              <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} variant="outlined" error={!!error} helperText={error} />
            </div>
            <div className="col-12">
              <FormControl fullWidth>
                <InputLabel>Province</InputLabel>
                <Select name="province" value={formData.province} onChange={handleInputChange}>
                  {provinces.map((province) => (
                    <MenuItem key={province} value={province}>{province}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-12">
              <FormControl fullWidth>
                <InputLabel>Municipality</InputLabel>
                <Select name="municipality" value={formData.municipality} onChange={handleInputChange}>
                  {municipalities.map((municipality) => (
                    <MenuItem key={municipality} value={municipality}>{municipality}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-12">
              <FormControl fullWidth>
                <InputLabel>School</InputLabel>
                <Select name="school" value={formData.school} onChange={handleInputChange}>
                  {schools.map((school) => (
                    <MenuItem key={school} value={school}>{school}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-12">
              <FormControl fullWidth>
                <InputLabel>Ward</InputLabel>
                <Select name="ward" value={formData.ward} onChange={handleInputChange}>
                  {wards.map((ward) => (
                    <MenuItem key={ward} value={ward}>{ward}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-12 text-center">
              <Button type="submit" variant="warning" className="w-100">Save Changes</Button>
            </div>
          </form>
        ) : (
          <div>
            {Object.entries(userData).map(([key, value]) => (
              key !== "image" && (
                <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value || "N/A"}</p>
              )
            ))}
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default UserProfile;
