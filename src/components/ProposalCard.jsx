import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ProposalCard = ({ message, onDelete, onStar, isStarred }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (typeof onDelete === 'function') {
      onDelete();
    } else {
      console.error("onDelete is not a function");
    }
  };

  const handleStar = (e) => {
    e.stopPropagation();
    if (typeof onStar === 'function') {
      onStar();
    } else {
      console.error("onStar is not a function");
    }
  };

  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-300">
      <CardContent>
        <div className="flex justify-between items-start">
          <div>
            <Typography variant="h6" component="div">
              {message.subject}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              From: {message.sender}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {message.date}
            </Typography>
          </div>
          <div>
            <IconButton onClick={handleStar} color={isStarred ? "primary" : "default"}>
              {isStarred ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
            <IconButton onClick={handleDelete} color="error">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <Typography variant="body1" className="mt-2">
          {message.summary}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProposalCard;
