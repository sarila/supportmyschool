import React, { useState, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Tabs,
  Tab,
  Modal,
  Form,
} from "react-bootstrap";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faStar,
  faTrash,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/proposal.css";

function Proposal() {
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [tabValue, setTabValue] = useState("inbox");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newProposal, setNewProposal] = useState({
    id: null,
    title: "",
    description: "",
    files: [],
    status: "inbox",
  });

  const handleOpenAddModal = () => {
    setNewProposal({
      id: null,
      title: "",
      description: "",
      files: [],
      status: "inbox",
    });
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleTabChange = (newTabValue) => {
    setTabValue(newTabValue);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setNewProposal((prev) => ({
      ...prev,
      files: [...prev.files, ...acceptedFiles],
    }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = (isDraft = false) => {
    if (!newProposal.title.trim() || !newProposal.description.trim()) {
      toast.error("Title and description are required!");
      return;
    }

    const updatedProposal = {
      id: newProposal.id || Date.now(),
      sender: "Current User",
      subject: newProposal.title,
      summary:
        newProposal.description.replace(/<[^>]*>/g, "").substring(0, 100) +
        "...",
      date: new Date().toLocaleDateString(),
      content: newProposal.description,
      isStarred: false,
      attachments: newProposal.files.map((file) => ({
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file)
      })),
      status: isDraft ? "draft" : "inbox",
    };

    setProposals((prevProposals) => {
      const index = prevProposals.findIndex((p) => p.id === updatedProposal.id);
      if (index !== -1) {
        const newProposals = [...prevProposals];
        newProposals[index] = updatedProposal;
        return newProposals;
      }
      return [...prevProposals, updatedProposal];
    });

    setNewProposal({
      id: null,
      title: "",
      description: "",
      files: [],
      status: "inbox",
    });
    handleCloseAddModal();
    toast.success(
      isDraft ? "Draft saved successfully!" : "Proposal submitted successfully!"
    );
  };

  const handleStar = (id) => {
    const updatedProposals = proposals.map((proposal) =>
      proposal.id === id
        ? { ...proposal, isStarred: !proposal.isStarred }
        : proposal
    );
    setProposals(updatedProposals);
    toast.info(
      updatedProposals.find((p) => p.id === id).isStarred
        ? "Proposal starred!"
        : "Proposal unstarred!"
    );
  };

  const handleTrash = (id) => {
    const updatedProposals = proposals.map((proposal) =>
      proposal.id === id ? { ...proposal, status: "trash" } : proposal
    );
    setProposals(updatedProposals);
    toast.warn("Proposal moved to trash!");
  };

  const handleProposalClick = (proposal) => {
    if (proposal.status === "draft") {
      setNewProposal({
        id: proposal.id,
        title: proposal.subject,
        description: proposal.content,
        files: proposal.attachments.map((attachment) => {
          const fileName = attachment.name;
          return new File([attachment.url], fileName, {
            type: attachment.type,
          });
        }),
        status: "draft",
      });
      setOpenAddModal(true);
    } else {
      setSelectedProposal(proposal);
    }
  };

  const filteredProposals = proposals.filter((proposal) => {
    if (tabValue === "inbox") return proposal.status === "inbox";
    if (tabValue === "starred") return proposal.isStarred;
    if (tabValue === "drafts") return proposal.status === "draft";
    if (tabValue === "trash") return proposal.status === "trash";
    return true;
  });

  return (
    <Container className="proposal-container">
      <ToastContainer />
      <Row className="header">
        <Col>
          <h4 className="heading">Proposals</h4>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            className="add-btn"
            onClick={handleOpenAddModal}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Col>
      </Row>

      <Tabs activeKey={tabValue} onSelect={handleTabChange} className="mb-4">
        <Tab eventKey="inbox" title="Inbox" />
        <Tab eventKey="starred" title="Starred" />
        <Tab eventKey="drafts" title="Drafts" />
        <Tab eventKey="trash" title="Trash" />
      </Tabs>

      <Row className="proposal-list">
        {filteredProposals.length > 0 ? (
          filteredProposals.map((proposal) => (
            <Col xs={12} key={proposal.id}>
              <ProposalCard
                proposal={proposal}
                onStar={() => handleStar(proposal.id)}
                onDelete={() => handleTrash(proposal.id)}
                onClick={() => handleProposalClick(proposal)}
              />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <p className="text-center">No Proposals here</p>
          </Col>
        )}
      </Row>

      <Modal show={openAddModal} onHide={handleCloseAddModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {newProposal.id ? "Edit Draft" : "Create New Proposal"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newProposal.title}
                onChange={(e) =>
                  setNewProposal({ ...newProposal, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <ReactQuill
                value={newProposal.description}
                onChange={(value) =>
                  setNewProposal({ ...newProposal, description: value })
                }
                placeholder="Write your proposal here..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drag & drop files here, or click to select files</p>
              </div>
            </Form.Group>
            {newProposal.files.length > 0 && (
              <Form.Group className="mb-3">
                <Form.Label>Attached Files:</Form.Label>
                <ul className="list-group">
                  {newProposal.files.map((file, index) => (
                    <li key={index} className="list-group-item">
                      {file.name}
                    </li>
                  ))}
                </ul>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="info" onClick={() => handleSubmit(true)}>
            Save as Draft
          </Button>
          <Button variant="primary" onClick={() => handleSubmit(false)}>
            Submit Proposal
          </Button>
        </Modal.Footer>
      </Modal>

      <ProposalModal
        proposal={selectedProposal}
        onClose={() => setSelectedProposal(null)}
      />
    </Container>
  );
}

function ProposalCard({ proposal, onStar, onDelete, onClick }) {
  if (!proposal) {
    return null;
  }
  return (
    <Card className="mb-3" onClick={() => onClick(proposal)}>
      <Card.Body>
        <Card.Title>{proposal.subject}</Card.Title>
        <Card.Text>{proposal.summary}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">{proposal.date}</small>
          <div>
            <Button
              variant="link"
              onClick={(e) => {
                e.stopPropagation();
                onStar(proposal.id);
              }}
            >
              <FontAwesomeIcon
                icon={faStar}
                color={proposal.isStarred ? "gold" : "gray"}
              />
            </Button>
            <Button
              variant="link"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(proposal.id);
              }}
            >
              <FontAwesomeIcon icon={faTrash} color="red" />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

function ProposalModal({ proposal, onClose }) {
  if (!proposal) return null;

  const renderAttachment = (attachment) => {
    if (attachment.type.startsWith('image/')) {
      return (
        <div className="attachment-item">
          <a href={attachment.url} target="_blank" rel="noopener noreferrer">
            <img
              src={attachment.url}
              alt="attachment-thumbnail"
              className="img-thumbnail attachment-thumbnail"
            />
          </a>
          <p className="attachment-name">{attachment.name}</p>
        </div>
      );
    } else {
      return (
        <div className="attachment-item">
          <FontAwesomeIcon icon={faFile} className="file-icon" />
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="attachment-link"
          >
            {attachment.name}
          </a>
        </div>
      );
    }
  };  

  return (
    <Modal
      show={!!proposal}
      onHide={onClose}
      size="lg"
      className="proposal-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{proposal.subject}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-info">
          <p className="modal-sender">
            <strong>From:</strong> {proposal.sender}
          </p>
          <p className="modal-date">
            <strong>Date:</strong> {proposal.date}
          </p>
        </div>
        <hr />
        <div
          className="modal-body-content"
          dangerouslySetInnerHTML={{ __html: proposal.content }}
        />
        {proposal.attachments && proposal.attachments.length > 0 && (
          <div className="modal-attachments">
            <h6>Attachments:</h6>
            <div className="attachment-list">
              {proposal.attachments.map((attachment, index) => (
                <div key={index} className="modal-attachment-item">
                  {renderAttachment(attachment)}
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Proposal;
