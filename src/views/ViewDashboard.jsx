import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import MessageCard from "../components/ProposalCard";
import useProposalData from "../hooks/useProposalData";

const Dashboard = () => {
  const navigate = useNavigate();
  const { proposals, loading } = useProposalData();
  const [starredProposals, setStarredProposals] = useState({});

  const handleDelete = (id) => {
    // Logic to delete a proposal
    console.log(`Deleting proposal with id: ${id}`);
    // You would typically update your state or make an API call here
  };

  const handleStar = (id) => {
    setStarredProposals(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const latestProposals = proposals.slice(0, 5);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl p-4 mb-6">
        <h2 className="text-lg font-semibold text-[#1976d2] mb-4">Budget Distribution</h2>
        <iframe
          src="https://via.placeholder.com/400"
          className="w-full h-64 rounded-lg border border-gray-300"
          title="Pie Chart"
        ></iframe>
      </div>
      
      {/* Proposal List */}
      <div className="bg-white shadow-lg rounded-xl p-4">
        <h2 className="text-lg font-semibold text-[#1976d2] mb-4">Proposals & Budgets</h2>
        {loading ? (
          <Typography variant="body1" className="text-gray-600">
            Loading proposals...
          </Typography>
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
          <Typography variant="body1" className="text-gray-600">
            No proposals available
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={() => navigate("/proposals")}
        >
          View More
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
