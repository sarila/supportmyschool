import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import { Typography, Box } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const Modal = ({ show, onHide, title, content, attachments, deadline }) => {
  return (
    <BootstrapModal show={show} onHide={onHide} size="lg">
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Typography variant="body2" color="text.secondary" mt={2}>
          Deadline: {deadline || "Not set"}
        </Typography>
        {attachments && attachments.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6">Attachments:</Typography>
            {attachments.map((file, index) => (
              <Box key={index} display="flex" alignItems="center" mt={1}>
                {file && file.type && file.type.startsWith('image/') ? (
                  <img src={file.preview} alt="preview" style={{width: 100, height: 100, marginRight: 10}} />
                ) : (
                  <AttachFileIcon style={{marginRight: 10}} />
                )}
                <a href={file?.preview} target="_blank" rel="noopener noreferrer" download={file?.name}>
                  {file?.name || 'Unnamed file'}
                </a>
              </Box>
            ))}
          </Box>
        )}
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;