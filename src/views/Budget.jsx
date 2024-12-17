import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

// Material UI Components
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Stack,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PublishIcon from "@mui/icons-material/Publish";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Budget = () => {
  const [showForm, setShowForm] = useState(false); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("ongoing");
  const [publishedNotices, setPublishedNotices] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles(uploadedFiles);
  };

  const handlePublish = () => {
    if (title && description && deadline && status) {
      const notice = {
        title,
        description,
        files,
        deadline,
        status,
      };
      setPublishedNotices([...publishedNotices, notice]);

      // Clear Fields
      setTitle("");
      setDescription("");
      setFiles([]);
      setDeadline("");
      setStatus("ongoing");
      setShowForm(false); 
    } else {
      alert("Please fill in all fields before publishing.");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "2rem auto" }}>
      {!showForm && (
        <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
          <IconButton
            color="primary"
            onClick={() => setShowForm(true)}
            size="large"
          >
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Stack>
      )}

      {showForm && (
        <Card variant="outlined" sx={{ padding: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Create a Notice
            </Typography>
            {/* Title Field */}
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />

            {/* Description Field */}
            <Typography variant="subtitle1" gutterBottom>
              Description
            </Typography>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Write the notice description here..."
            />

            {/* File Upload */}
            <Box mt={2}>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Upload Files
                <input
                  type="file"
                  multiple
                  hidden
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </Button>
              {files.length > 0 && (
                <Box mt={2}>
                  {files.map((item, index) => (
                    <Typography key={index} variant="body2">
                      {item.file.name}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>

            {/* Deadline Picker */}
            <TextField
              fullWidth
              label="Deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* Status Dropdown */}
            <TextField
              fullWidth
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              margin="normal"
            >
              <MenuItem value="ongoing">Ongoing</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </TextField>
          </CardContent>

          <CardActions>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PublishIcon />}
                onClick={handlePublish}
              >
                Publish Notice
              </Button>
            </Stack>
          </CardActions>
        </Card>
      )}

      {/* Published Notices */}
      {publishedNotices.map((notice, index) => (
        <Card
          key={index}
          variant="outlined"
          sx={{ marginY: 2, padding: 2, boxShadow: 2 }}
        >
          <CardContent>
            <Typography variant="h6">{notice.title}</Typography>
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: notice.description }}
            />
            <Typography variant="body2" color="text.secondary">
              Deadline: {notice.deadline}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Status: {notice.status}
            </Typography>

            {/* File Previews */}
            <Box mt={2}>
              {notice.files.map((item, i) => (
                <Box key={i} mb={1}>
                  {item.file.type.startsWith("image/") ? (
                    <img
                      src={item.preview}
                      alt={item.file.name}
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  ) : item.file.type === "application/pdf" ? (
                    <embed
                      src={item.preview}
                      type="application/pdf"
                      width="100%"
                      height="400px"
                    />
                  ) : null}
                  <Typography variant="body2">
                    <a
                      href={item.preview}
                      download={item.file.name}
                      style={{ textDecoration: "none" }}
                    >
                      Download {item.file.name}
                    </a>
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
          <CardActions>
            {/* Apply Button */}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/proposals")}
            >
              Apply
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Budget;