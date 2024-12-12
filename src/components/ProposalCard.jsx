import React, { useState } from 'react';
import { Card, Typography, Avatar, Chip } from '@mui/material';
import { AccessTime, AttachFile } from '@mui/icons-material';
import '../styles/proposal.css';

function ProposalCard({ message, onClick }) {
  const [viewed, setViewed] = useState(false);

  const handleCardClick = () => {
    setViewed(true);
    onClick();
  };

  return (
    <Card
      onClick={handleCardClick}
      className={`proposal-card ${message.isNew && !viewed ? 'new' : ''}`}
      style={{
        backgroundColor: viewed || !message.isNew ? '#f9f9f9' : '', 
      }}
    >
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
      </div>
    </Card>
  );
}

export default ProposalCard;