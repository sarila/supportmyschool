import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';

function ProposalCard({ proposal, onViewProposal }) {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3, transition: 'transform 0.2s ease' }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {proposal.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          Date: {proposal.date}
        </Typography>
        <Box mt={2}>
          <Typography variant="body2" color="text.primary">
            {proposal.summary}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onViewProposal(proposal)}>
          View Proposal
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProposalCard;
