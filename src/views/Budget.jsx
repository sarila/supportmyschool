import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  Tabs,
  Tab,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../components/Modal";

const Budget = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingDraftId, setEditingDraftId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("ongoing");
  const [drafts, setDrafts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem("budgetDrafts")) || [];
    const savedAnnouncements = JSON.parse(localStorage.getItem("budgetAnnouncements")) || [];
    setDrafts(savedDrafts);
    setAnnouncements(savedAnnouncements);
  }, []);

  useEffect(() => {
    localStorage.setItem("budgetDrafts", JSON.stringify(drafts));
    localStorage.setItem("budgetAnnouncements", JSON.stringify(announcements));
  }, [drafts, announcements]);

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    setFiles([...files, ...uploadedFiles]);
  };

  const handleSaveDraft = () => {
    if (title || description || files.length > 0 || deadline) {
      const draft = {
        id: editingDraftId || Date.now(),
        title,
        description,
        files,
        deadline,
        status,
        createdAt: new Date().toISOString(),
      };

      if (editingDraftId) {
        setDrafts(drafts.map((d) => (d.id === editingDraftId ? draft : d)));
        toast.info("Draft updated successfully!");
      } else {
        setDrafts([...drafts, draft]);
        toast.info("Draft saved successfully!");
      }

      resetForm();
    } else {
      toast.warning("There's nothing to save as draft!");
    }
  };

  const handleEditDraft = (draft) => {
    setTitle(draft.title);
    setDescription(draft.description);
    setFiles(draft.files);
    setDeadline(draft.deadline);
    setStatus(draft.status);
    setEditingDraftId(draft.id);
    setShowForm(true);
  };

  const handleSubmitAnnouncement = () => {
    if (title && description) {
      const announcement = {
        id: Date.now(),
        title,
        description,
        deadline,
        files,
        createdAt: new Date().toISOString(),
      };
      setAnnouncements([...announcements, announcement]);

      if (editingDraftId) {
        setDrafts(drafts.filter((draft) => draft.id !== editingDraftId));
      }

      resetForm();
      toast.success("Announcement submitted successfully!");
    } else {
      toast.error("Title and description are required!");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFiles([]);
    setDeadline("");
    setStatus("ongoing");
    setEditingDraftId(null);
    setShowForm(false);
  };

  const handleDeleteItem = (item, type) => {
    setItemToDelete({ item, type });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete.type === "draft") {
      setDrafts(drafts.filter((draft) => draft.id !== itemToDelete.item.id));
      toast.warn("Draft deleted!");
    } else {
      setAnnouncements(announcements.filter((announcement) => announcement.id !== itemToDelete.item.id));
      toast.warn("Announcement deleted!");
    }
    setDeleteDialogOpen(false);
  };

  const handleOpenModal = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "2rem auto" }}>
      <ToastContainer />
      <Typography variant="h4" align="center" gutterBottom>
        Budget Notices
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        centered
      >
        <Tab label="Announcements" />
        <Tab label="Drafts" />
      </Tabs>

      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
        <IconButton
          color="primary"
          onClick={() => setShowForm(!showForm)}
          size="large"
        >
          {showForm ? (
            <CloseIcon fontSize="large" />
          ) : (
            <AddCircleOutlineIcon fontSize="large" />
          )}
        </IconButton>
      </Stack>

      {showForm && (
        <Card variant="outlined" sx={{ padding: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {editingDraftId ? "Edit Draft" : "Create a Notice"}
            </Typography>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />
            <Typography variant="subtitle1" gutterBottom>
              Description
            </Typography>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Write the notice description here..."
            />
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
            </Box>
            <Box mt={2}>
              {files.map((file, index) => (
                <Box key={index} display="flex" alignItems="center" mt={1}>
                  <Typography variant="body2">{file.name}</Typography>
                  {file.preview && file.file.type.startsWith('image/') && (
                    <img src={file.preview} alt="preview" style={{width: 50, height: 50, marginLeft: 10}} />
                  )}
                </Box>
              ))}
            </Box>
            <TextField
              fullWidth
              label="Deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
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
                color="secondary"
                startIcon={<SaveIcon />}
                onClick={handleSaveDraft}
              >
                Save as Draft
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitAnnouncement}
              >
                Submit Announcement
              </Button>
            </Stack>
          </CardActions>
        </Card>
      )}

      {tabIndex === 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Announcements
          </Typography>
          {announcements.length === 0 ? (
            <Typography variant="h6" color="textSecondary" align="center">
              No announcements yet!
            </Typography>
          ) : (
            announcements.map((announcement) => (
              <Card
                key={announcement.id}
                variant="outlined"
                sx={{ marginY: 2, padding: 2, boxShadow: 2, cursor: "pointer" }}
                onClick={() => handleOpenModal(announcement)}
              >
                <CardContent>
                  <Typography variant="h6">{announcement.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Deadline: {announcement.deadline || "Not set"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Created: {new Date(announcement.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteItem(announcement, "announcement");
                    }}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))
          )}
        </Box>
      )}

      {tabIndex === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Drafts
          </Typography>
          {drafts.length === 0 ? (
            <Typography variant="h6" color="textSecondary" align="center">
              No drafts here!
            </Typography>
          ) : (
            drafts.map((draft) => (
              <Card
                key={draft.id}
                variant="outlined"
                sx={{ marginY: 2, padding: 2, boxShadow: 2 }}
              >
                <CardContent>
                  <Typography variant="h6">
                    {draft.title || "Untitled Draft"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Deadline: {draft.deadline || "Not set"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Created: {new Date(draft.createdAt).toLocaleString()}
                  </Typography>
                  <Chip
                    label={draft.status}
                    color={draft.status === "ongoing" ? "primary" : "default"}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={() => handleEditDraft(draft)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteItem(draft, "draft")}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))
          )}
        </Box>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this {itemToDelete?.type}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Modal
        show={selectedAnnouncement !== null}
        onHide={() => setSelectedAnnouncement(null)}
        title={selectedAnnouncement?.title}
        content={selectedAnnouncement?.description}
        attachments={selectedAnnouncement?.files}
      />
    </Box>
  );
};

export default Budget;
