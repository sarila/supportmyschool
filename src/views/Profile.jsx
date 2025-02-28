// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Grid,
//   Avatar,
//   Container,
//   Paper,
// } from "@mui/material";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/profile.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const UserProfile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     province: "",
//     municipality: "",
//     ward: "",
//     school: "",
//     role: "",
//     image: null,
//   });

//   const [formData, setFormData] = useState(userData);
//   const [error, setError] = useState("");

//   const provinces = [
//     "Province 1",
//     "Madhesh",
//     "Bagmati",
//     "Gandaki",
//     "Lumbini",
//     "Karnali",
//     "Sudurpashchim",
//   ];
//   const municipalities = ["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Bharatpur"];
//   const schools = ["ABC School", "XYZ School", "City School", "Modern School"];
//   const wards = Array.from({ length: 32 }, (_, i) => (i + 1).toString());

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email) {
//       setError("Name and Email are required!");
//       toast.error("Please fill in the required fields!", { position: "top-center" });
//       return;
//     }
//     setError("");
//     setUserData(formData);
//     setIsEditing(false);
//     toast.success("Profile updated successfully!", { position: "top-right" });
//   };

//   return (
//     <Container className="d-flex justify-content-center mt-5">
//       <ToastContainer />
//       <Paper elevation={3} className="p-4 w-100" style={{ maxWidth: "600px" }}>
//         <div className="text-center mb-3">
//           {userData.image ? (
//             <Avatar src={userData.image} alt="Profile" sx={{ width: 96, height: 96 }} />
//           ) : (
//             <Avatar sx={{ bgcolor: "yellow", width: 96, height: 96 }}>U</Avatar>
//           )}
//           <h2 className="mt-2">Profile</h2>
//           <Button onClick={() => setIsEditing(!isEditing)} variant="warning">
//             {isEditing ? "Cancel" : "Edit Profile"}
//           </Button>
//         </div>

//         {isEditing ? (
//           <form onSubmit={handleSubmit} className="row g-3">
//             <div className="col-12">
//               <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleInputChange} variant="outlined" error={!!error} helperText={error} />
//             </div>
//             <div className="col-12">
//               <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} variant="outlined" error={!!error} helperText={error} />
//             </div>
//             <div className="col-12">
//               <FormControl fullWidth>
//                 <InputLabel>Province</InputLabel>
//                 <Select name="province" value={formData.province} onChange={handleInputChange}>
//                   {provinces.map((province) => (
//                     <MenuItem key={province} value={province}>{province}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </div>
//             <div className="col-12">
//               <FormControl fullWidth>
//                 <InputLabel>Municipality</InputLabel>
//                 <Select name="municipality" value={formData.municipality} onChange={handleInputChange}>
//                   {municipalities.map((municipality) => (
//                     <MenuItem key={municipality} value={municipality}>{municipality}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </div>
//             <div className="col-12">
//               <FormControl fullWidth>
//                 <InputLabel>School</InputLabel>
//                 <Select name="school" value={formData.school} onChange={handleInputChange}>
//                   {schools.map((school) => (
//                     <MenuItem key={school} value={school}>{school}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </div>
//             <div className="col-12">
//               <FormControl fullWidth>
//                 <InputLabel>Ward</InputLabel>
//                 <Select name="ward" value={formData.ward} onChange={handleInputChange}>
//                   {wards.map((ward) => (
//                     <MenuItem key={ward} value={ward}>{ward}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </div>
//             <div className="col-12 text-center">
//               <Button type="submit" variant="warning" className="w-100">Save Changes</Button>
//             </div>
//           </form>
//         ) : (
//           <div>
//             {Object.entries(userData).map(([key, value]) => (
//               key !== "image" && (
//                 <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value || "N/A"}</p>
//               )
//             ))}
//           </div>
//         )}
//       </Paper>
//     </Container>
//   );
// };

// export default UserProfile;

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
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: '#f8f9fa',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  margin: '0 auto',
  border: `4px solid ${theme.palette.primary.main}`,
}));

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
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <ToastContainer />
      <StyledPaper elevation={3}>
        <Box textAlign="center" mb={4}>
          <ProfileAvatar src={userData.image || "/default-avatar.png"} alt={userData.name || "User"} />
          <Typography variant="h4" mt={2} fontWeight="bold" color="primary">
            {userData.name || "Your Name"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {userData.role || "Your Role"}
          </Typography>
          <IconButton 
            onClick={() => setIsEditing(!isEditing)} 
            color="primary" 
            sx={{ mt: 2 }}
          >
            {isEditing ? <CancelIcon /> : <EditIcon />}
          </IconButton>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
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
                <TextField
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
                  <Select
                    labelId="province-label"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    label="Province"
                  >
                    <MenuItem value="" disabled>Select a province</MenuItem>
                    {provinces.map((province) => (
                      <MenuItem key={province} value={province}>{province}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="municipality-label">Municipality</InputLabel>
                  <Select
                    labelId="municipality-label"
                    name="municipality"
                    value={formData.municipality}
                    onChange={handleInputChange}
                    label="Municipality"
                  >
                    <MenuItem value="" disabled>Select a municipality</MenuItem>
                    {municipalities.map((municipality) => (
                      <MenuItem key={municipality} value={municipality}>{municipality}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="school-label">School</InputLabel>
                  <Select
                    labelId="school-label"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    label="School"
                  >
                    <MenuItem value="" disabled>Select a school</MenuItem>
                    {schools.map((school) => (
                      <MenuItem key={school} value={school}>{school}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="ward-label">Ward</InputLabel>
                  <Select
                    labelId="ward-label"
                    name="ward"
                    value={formData.ward}
                    onChange={handleInputChange}
                    label="Ward"
                  >
                    <MenuItem value="" disabled>Select a ward</MenuItem>
                    {wards.map((ward) => (
                      <MenuItem key={ward} value={ward}>{ward}</MenuItem>
                    ))}
                  </Select>
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
            {Object.entries(userData).map(([key, value]) => (
              key !== "image" && (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Typography>
                  <Typography variant="body1">
                    {value || `Enter your ${key}`}
                  </Typography>
                </Grid>
              )
            ))}
          </Grid>
        )}
      </StyledPaper>
    </Container>
  );
};

export default UserProfile;
