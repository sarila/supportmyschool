import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faImage } from "@fortawesome/free-solid-svg-icons";
import "../styles/proposal.css";

const ProposalModal = ({ message, onClose }) => {
  if (!message) return null;

  const renderAttachment = (attachment) => {
    if (attachment && typeof attachment === 'string') {
      const isImage = attachment.match(/\.(jpeg|jpg|gif|png)$/i);
      if (isImage) {
        return (
          <div className="attachment-item">
            <img 
              src={attachment} 
              alt="attachment-thumbnail" 
              className="img-thumbnail attachment-thumbnail" 
            />
            <p className="attachment-name">{attachment}</p>
          </div>
        );
      } else {
        return (
          <div className="attachment-item">
            <FontAwesomeIcon icon={faFile} className="file-icon" />
            <a href={attachment} target="_blank" rel="noopener noreferrer" className="attachment-link">
              {attachment}
            </a>
          </div>
        );
      }
    }
    return <div>No valid attachment available</div>;
  };

  return (
    <Modal show={!!message} onHide={onClose} size="lg" className="proposal-modal">
      <Modal.Header closeButton>
        <Modal.Title>{message.subject}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-info">
          <p className="modal-sender">
            <strong>From:</strong> {message.sender}
          </p>
          <p className="modal-date">
            <strong>Date:</strong> {message.date}
          </p>
        </div>
        <hr />
        <div className="modal-body-content" dangerouslySetInnerHTML={{ __html: message.content }} />
        {message.attachments.length > 0 && (
          <div className="modal-attachments">
            <h6>Attachments:</h6>
            <div className="attachment-list">
              {message.attachments.map((attachment, index) => (
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
};

export default ProposalModal;
