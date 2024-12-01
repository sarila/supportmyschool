import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider } from '@mui/material';

function ProposalModal({ proposal, onClose }) {
  if (!proposal) return null;

  return (
    <Dialog open={!!proposal} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {proposal.title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Date: {proposal.date}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant="body1" paragraph>
          {proposal.fullProposal}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Attachments:
        </Typography>
        {proposal.attachments.map((attachment, index) => (
          <Typography key={index} variant="body2" color="text.secondary">
            {attachment}
          </Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProposalModal;
