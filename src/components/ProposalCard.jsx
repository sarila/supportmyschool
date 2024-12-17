import React, { useState } from 'react';
import {
  Card,
  Avatar,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Star, Delete, AttachFile, AccessTime } from '@mui/icons-material';

function ProposalCard({ message, onClick, onStar, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <Card onClick={onClick} className={`proposal-card ${message.isNew ? 'new' : ''}`}>
        <div className="card-left">
          <Avatar className="avatar">{message.sender[0]}</Avatar>
          <div className="card-info">
            <Typography variant="subtitle1" className="card-sender">
              {message.sender}
            </Typography>
            <Typography variant="body2" className="card-subject">
              {message.subject}
            </Typography>
          </div>
        </div>
        <div className="card-right">
          {message.attachments.length > 0 && (
            <Chip
              icon={<AttachFile />}
              label="Attachments"
              variant="outlined"
              size="small"
              className="attachment-chip"
            />
          )}
          <Typography variant="body2" className="card-date">
            <AccessTime fontSize="small" /> {message.date}
          </Typography>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onStar();
            }}
            aria-label="star"
          >
            <Star color={message.status === 'starred' ? 'primary' : 'disabled'} />
          </IconButton>
          <IconButton onClick={handleDeleteClick} aria-label="delete">
            <Delete color="error" />
          </IconButton>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <Dialog open={showDeleteConfirm} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Do you want to permanently delete this proposal?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              No
            </Button>
            <Button onClick={handleConfirmDelete} color="error">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default ProposalCard;