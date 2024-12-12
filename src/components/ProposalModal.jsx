import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  Button,
  DialogActions,
} from '@mui/material';
import { AttachFile } from '@mui/icons-material';
import '../styles/proposal.css';

const ProposalModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <Dialog open={!!message} onClose={onClose} fullWidth maxWidth="md" className="proposal-modal">
      <DialogTitle className="modal-header">
        <Typography variant="h6" className="modal-title">
          {message.subject}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <div className="modal-info">
          <Typography variant="subtitle2" className="modal-sender">
            From: {message.sender}
          </Typography>
          <Typography variant="subtitle2" className="modal-date">
            Date: {message.date}
          </Typography>
        </div>
        <Divider />
        <Typography variant="body1" className="modal-content">
          {message.content}
        </Typography>
        {message.attachments.length > 0 && (
          <div className="modal-attachments">
            <Typography variant="h6">Attachments:</Typography>
            {message.attachments.map((attachment, index) => (
              <div key={index} className="modal-attachment-item">
                <AttachFile fontSize="small" />
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="attachment-link"
                >
                  {attachment.name}
                </a>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = attachment.url;
                    link.download = attachment.name;
                    link.click();
                  }}
                  className="download-btn"
                >
                  Download
                </Button>
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