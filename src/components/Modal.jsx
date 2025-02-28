import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import { Typography, Box, useTheme } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const Modal = ({ show, onHide, title, content, attachments, deadline }) => {
  const theme = useTheme();

  return (
    <BootstrapModal 
      show={show} 
      onHide={onHide} 
      size="lg"
      data-bs-theme={theme.palette.mode}
    >
      <BootstrapModal.Header closeButton style={{ 
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary 
      }}>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body style={{ 
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary 
      }}>
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
                  <AttachFileIcon style={{marginRight: 10, color: theme.palette.text.secondary}} />
                )}
                <a href={file?.preview} target="_blank" rel="noopener noreferrer" download={file?.name} style={{color: theme.palette.primary.main}}>
                  {file?.name || 'Unnamed file'}
                </a>
              </Box>
            ))}
          </Box>
        )}
      </BootstrapModal.Body>
      <BootstrapModal.Footer style={{ 
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary 
      }}>
        <Button variant={theme.palette.mode === 'dark' ? 'outline-light' : 'outline-dark'} onClick={onHide}>
          Close
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
