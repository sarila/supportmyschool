import React from 'react';
import { Card, Typography, Avatar, Chip, IconButton } from '@mui/material';
import { AccessTime, AttachFile, Star, Delete } from '@mui/icons-material';

function ProposalCard({ message, onClick, onStar, onDelete }) {
  return (
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
        <IconButton onClick={onStar} aria-label="star">
          <Star color={message.status === 'starred' ? 'primary' : 'disabled'} />
        </IconButton>
        <IconButton onClick={onDelete} aria-label="delete">
          <Delete color="error" />
        </IconButton>
      </div>
    </Card>
  );
}

export default ProposalCard;