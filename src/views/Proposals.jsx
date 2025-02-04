import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Fab,
  Tabs,
  Tab,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import ReactQuill from "react-quill";
import { Add } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/proposal.css";
import MessageCard from "../components/ProposalCard";
import ProposalModal from "../components/ProposalModal";

function Proposal() {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [proposals, setProposals] = useState([]); // No hardcoded data
  const [tabValue, setTabValue] = useState("inbox");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: "",
    description: "",
    files: [],
    status: "inbox",
  });

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setNewProposal((prev) => ({
        ...prev,
        files: [...prev.files, ...acceptedFiles],
      }));
    },
    multiple: true,
  });

  const handleSubmit = () => {
    if (!newProposal.title.trim() || !newProposal.description.trim()) {
      toast.error("Title and description are required!");
      return;
    }

    const updatedProposal = {
      id: proposals.length + 1,
      sender: "New Sender",
      subject: newProposal.title,
      summary: newProposal.description,
      date: "Just Now",
      content: newProposal.description,
      isNew: true,
      attachments: newProposal.files.map((file) => file.name),
      status: newProposal.status,
    };

    setProposals([...proposals, updatedProposal]);
    setNewProposal({
      title: "",
      description: "",
      files: [],
      status: "inbox",
    });
    handleCloseAddModal();
    toast.success("Proposal submitted successfully!");
  };

  const handleStar = (id) => {
    setProposals((prev) =>
      prev.map((proposal) =>
        proposal.id === id ? { ...proposal, isNew: !proposal.isNew } : proposal
      )
    );
    toast.info("Proposal updated!");
  };

  const handleTrash = (id) => {
    setProposals((prev) => prev.filter((proposal) => proposal.id !== id));
    toast.warn("Proposal deleted!");
  };

  const handleProposalClick = (proposal) => {
    setSelectedProposal(proposal);
  };

  const filteredProposals = proposals.filter(
    (proposal) => proposal.status === tabValue || tabValue === "inbox"
  );

  return (
    <Container className="proposal-container">
      <ToastContainer />
      <div className="header">
        <Typography variant="h4" className="heading">
          Proposals
        </Typography>
        <Fab
          color="primary"
          aria-label="add"
          size="medium"
          className="add-btn"
          onClick={handleOpenAddModal}
        >
          <Add />
        </Fab>
      </div>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="email categories"
      >
        <Tab label="Inbox" value="inbox" />
        <Tab label="Starred" value="starred" />
        <Tab label="Trash" value="trash" />
      </Tabs>

      <div className="proposal-list">
        {filteredProposals.length > 0 ? (
          filteredProposals.map((proposal) => (
            <MessageCard
              key={proposal.id}
              message={proposal}
              onStar={() => handleStar(proposal.id)}
              onDelete={() => handleTrash(proposal.id)}
              onClick={() => handleProposalClick(proposal)}
            />
          ))
        ) : (
          <Typography variant="body1" className="no-proposals">
            No Proposals here
          </Typography>
        )}
      </div>

      <Modal
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="add-proposal-modal"
      >
        <Box className="modal-box">
          <Typography variant="h5">Create New Proposal</Typography>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={newProposal.title}
            onChange={(e) =>
              setNewProposal({ ...newProposal, title: e.target.value })
            }
            margin="normal"
          />
          <ReactQuill
            value={newProposal.description}
            onChange={(value) =>
              setNewProposal({ ...newProposal, description: value })
            }
            placeholder="Write your proposal here..."
            className="quill-editor"
          />
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <Typography variant="body2">
              Drag & drop files here, or click to select files
            </Typography>
          </div>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Proposal
          </Button>
        </Box>
      </Modal>

      <ProposalModal
        message={selectedProposal}
        onClose={() => setSelectedProposal(null)}
      />
    </Container>
  );
}

export default Proposal;
