import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box, Grid, Paper, CircularProgress, useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import MessageCard from "../components/ProposalCard";
import useProposalData from "../hooks/useProposalData";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
}));

const ViewDashboard = () => {
  const navigate = useNavigate();
  const { proposals, loading } = useProposalData();
  const [starredProposals, setStarredProposals] = useState({});
  const theme = useTheme();

  const handleDelete = (id) => {
    console.log(`Deleting proposal with id: ${id}`);
  };

  const handleStar = (id) => {
    setStarredProposals(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const latestProposals = proposals.slice(0, 5);

  return (
    <Box sx={{ p: 4, bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom sx={{ mb: 4 }}>
        Dashboard Overview
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
              Budget Distribution
            </Typography>
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <iframe
                src="https://lookerstudio.google.com/u/0/reporting/667d6459-3865-4de6-8280-5e3bfd56e89e/page/ETAmD"
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            </Box>
          </StyledPaper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
              Recent Proposals
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            ) : latestProposals.length > 0 ? (
              latestProposals.map((proposal) => (
                <MessageCard 
                  key={proposal.id} 
                  message={proposal} 
                  onDelete={() => handleDelete(proposal.id)}
                  onStar={() => handleStar(proposal.id)}
                  isStarred={starredProposals[proposal.id]}
                />
              ))
            ) : (
              <Typography variant="body1" color="text.secondary">
                No proposals available
              </Typography>
            )}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/proposals")}
                sx={{ 
                  borderRadius: '20px',
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  fontWeight: 'bold',
                }}
              >
                View All Proposals
              </Button>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewDashboard;
