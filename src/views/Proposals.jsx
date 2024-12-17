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
import "react-quill/dist/quill.snow.css";
import "../styles/proposal.css";
import MessageCard from "../components/ProposalCard";
import ProposalModal from "../components/ProposalModal";

const initialProposals = [
  {
    id: 1,
    sender: "Kanya School",
    subject: "Infrastructure Budget Allocation",
    summary: "Request for additional funding for infrastructure.",
    date: "Today",
    content: "Detailed proposal for infrastructure budget allocation.",
    isNew: true,
    attachments: [],
  },
  {
    id: 2,
    sender: "Shree Laxmi Secondary School",
    subject: "Projector Budget",
    summary: "Proposal for purchasing new projectors.",
    date: "Yesterday",
    content: "Proposal for acquiring modern projectors for classrooms.",
    isNew: false,
    attachments: ["AppScreenshots.pdf"],
  },
  {
    id: 3,
    sender: "Green Valley School",
    subject: "Library Renovation Request",
    summary: "Proposal to renovate and expand the school library.",
    date: "2 days ago",
    content:
      "Detailed breakdown of the renovation plans and costs for the library.",
    isNew: true,
    attachments: [],
  },
  {
    id: 4,
    sender: "Sunrise Academy",
    subject: "Science Lab Equipment",
    summary: "Request for funding to upgrade science lab equipment.",
    date: "3 days ago",
    content: "Proposal for purchasing modern lab equipment for experiments.",
    isNew: true,
    attachments: ["LabEquipmentList.pdf"],
  },
  {
    id: 5,
    sender: "Everest High School",
    subject: "Sports Ground Maintenance",
    summary: "Proposal for repairing and maintaining the sports ground.",
    date: "Last week",
    content: "Details about the maintenance plans for the sports ground.",
    isNew: false,
    attachments: [],
  },
];

function Proposal() {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [proposals, setProposals] = useState(initialProposals);
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
  };

  const handleStar = (id) => {
    setProposals((prev) =>
      prev.map((proposal) =>
        proposal.id === id
          ? { ...proposal, isNew: !proposal.isNew }
          : proposal
      )
    );
  };

  const handleTrash = (id) => {
    setProposals((prev) => prev.filter((proposal) => proposal.id !== id));
  };

  const handleProposalClick = (proposal) => {
    setSelectedProposal(proposal); 
  };

  const filteredProposals = proposals.filter(
    (proposal) => proposal.status === tabValue || tabValue === "inbox"
  );

  const renderFile = (file) => {
    const isImage = file.type.startsWith("image/");
    if (isImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageURL = reader.result;
        return (
          <div>
            <img
              src={imageURL}
              alt="attachment-thumbnail"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <Typography variant="body2">{file.name}</Typography>
          </div>
        );
      };
      reader.readAsDataURL(file); 
    } else {
      return <Typography variant="body2">{file.name}</Typography>;
    }
  };

  return (
    <Container className="proposal-container">
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
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="email categories">
        <Tab label="Inbox" value="inbox" />
        <Tab label="Starred" value="starred" />
        <Tab label="Trash" value="trash" />
      </Tabs>

      <div className="proposal-list">
        {filteredProposals.map((proposal) => (
          <MessageCard
            key={proposal.id}
            message={proposal}
            onStar={() => handleStar(proposal.id)} 
            onDelete={() => handleTrash(proposal.id)}
            onClick={() => handleProposalClick(proposal)} 
          />
        ))}
      </div>

      <Modal
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="add-proposal-modal"
        aria-describedby="add-a-new-proposal"
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
          <Box className="file-list">
            {newProposal.files.map((file, index) => (
              <div key={index}>{renderFile(file)}</div>
            ))}
          </Box>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Proposal
          </Button>
        </Box>
      </Modal>

      {/* Proposal Modal */}
      <ProposalModal
        message={selectedProposal} 
        onClose={() => setSelectedProposal(null)} 
      />
    </Container>
  );
}

export default Proposal;