import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  Button,
  DialogActions,
  Chip,
} from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import "../styles/proposal.css";

const ProposalModal = ({ message, onClose }) => {
  if (!message) return null;

  const renderAttachment = (attachment) => {
    if (attachment && typeof attachment === 'string') {
      // Check if the attachment is an image
      const isImage = attachment.match(/\.(jpeg|jpg|gif|png)$/i);
      if (isImage) {
        return (
          <div className="attachment-item">
            <img 
              src={attachment} 
              alt="attachment-thumbnail" 
              className="attachment-thumbnail" 
            />
            <Typography variant="body2" className="attachment-name">
              {attachment}
            </Typography>
          </div>
        );
      } else {
        // Non-image attachments
        return (
          <div className="attachment-item">
            <Chip
              icon={<AttachFile />}
              label={<a href={attachment} target="_blank" rel="noopener noreferrer">{attachment}</a>}
              clickable
              variant="outlined"
            />
          </div>
        );
      }
    }
    return <div>No valid attachment available</div>;
  };

  return (
    <Dialog
      open={!!message}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      className="proposal-modal"
    >
      <DialogTitle className="modal-header">
        <Typography variant="h5" className="modal-title">
          {message.subject}
        </Typography>
      </DialogTitle>
      <DialogContent className="modal-content-wrapper">
        <div className="modal-info">
          <Typography variant="subtitle1" className="modal-sender">
            <strong>From:</strong> {message.sender}
          </Typography>
          <Typography variant="subtitle2" className="modal-date">
            <strong>Date:</strong> {message.date}
          </Typography>
        </div>
        <Divider className="modal-divider" />
        <Typography
          variant="body1"
          className="modal-body-content"
          dangerouslySetInnerHTML={{ __html: message.content }}
        />
        {message.attachments.length > 0 && (
          <div className="modal-attachments">
            <Typography variant="h6">Attachments:</Typography>
            {message.attachments.map((attachment, index) => (
              <div key={index} className="modal-attachment-item">
                {renderAttachment(attachment)}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" className="close-btn">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProposalModal;
