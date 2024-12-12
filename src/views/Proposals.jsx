import React, { useState } from 'react';
import { Container, Box, Typography, Fab, Tabs, Tab } from '@mui/material';
import { IconButton } from '@mui/material';
import { Star, Restore, DeleteForever } from '@mui/icons-material'; 
import { Add } from '@mui/icons-material';
import MessageCard from '../components/ProposalCard';
import ProposalModal from '../components/ProposalModal';
import '../styles/proposal.css';

const initialProposals = [
  {
    id: 1,
    sender: 'Kanya School',
    subject: 'Infrastructure Budget Allocation',
    summary: 'Request for additional funding for infrastructure.',
    date: 'Today',
    content: 'Detailed proposal for infrastructure budget allocation.',
    isNew: true,
    attachments: [],
  },
  {
    id: 2,
    sender: 'Shree Laxmi Secondary School',
    subject: 'Projector Budget',
    summary: 'Proposal for purchasing new projectors.',
    date: 'Yesterday',
    content: 'Proposal for acquiring modern projectors for classrooms.',
    isNew: false,
    attachments: ['AppScreenshots.pdf'],
  },{
    id: 3,
    sender: 'Green Valley School',
    subject: 'Library Renovation Request',
    summary: 'Proposal to renovate and expand the school library.',
    date: '2 days ago',
    content: 'Detailed breakdown of the renovation plans and costs for the library.',
    isNew: true,
    attachments: [],
  },
  {
    id: 4,
    sender: 'Sunrise Academy',
    subject: 'Science Lab Equipment',
    summary: 'Request for funding to upgrade science lab equipment.',
    date: '3 days ago',
    content: 'Proposal for purchasing modern lab equipment for experiments.',
    isNew: true,
    attachments: ['LabEquipmentList.pdf'],
  },
  {
    id: 5,
    sender: 'Everest High School',
    subject: 'Sports Ground Maintenance',
    summary: 'Proposal for repairing and maintaining the sports ground.',
    date: 'Last week',
    content: 'Details about the maintenance plans for the sports ground.',
    isNew: false,
    attachments: [],
  },
  {
    id: 6,
    sender: 'Bright Future School',
    subject: 'Digital Learning Initiative',
    summary: 'Request for tablets to support digital learning.',
    date: '5 days ago',
    content: 'Proposal for integrating tablets into the curriculum.',
    isNew: true,
    attachments: ['DigitalLearningProposal.pdf'],
  },
  {
    id: 7,
    sender: 'Golden Horizon School',
    subject: 'Teacher Training Program',
    summary: 'Request for funds to train teachers on modern teaching methods.',
    date: 'Yesterday',
    content: 'Proposal detailing the benefits of training programs for teachers.',
    isNew: false,
    attachments: [],
  },
  {
    id: 8,
    sender: 'Silver Oak Secondary School',
    subject: 'Classroom Furniture',
    summary: 'Proposal for new classroom desks and chairs.',
    date: 'Last week',
    content: 'Details about the furniture required for the classrooms.',
    isNew: false,
    attachments: ['FurnitureDesigns.pdf'],
  },
  {
    id: 9,
    sender: 'Harmony Public School',
    subject: 'Art Supplies Funding',
    summary: 'Request for funding to purchase art supplies for students.',
    date: '3 days ago',
    content: 'Proposal for providing art materials for creative workshops.',
    isNew: true,
    attachments: [],
  },
  {
    id: 10,
    sender: 'Rising Star Academy',
    subject: 'Computer Lab Upgrade',
    summary: 'Request for new computers and software for the lab.',
    date: '4 days ago',
    content: 'Proposal for updating the computer lab infrastructure.',
    isNew: false,
    attachments: ['ComputerLabDetails.pdf'],
  },
  {
    id: 11,
    sender: 'Bright Minds School',
    subject: 'Music Program Expansion',
    summary: 'Proposal to expand the music program with new instruments.',
    date: 'Yesterday',
    content: 'Details about the plan to enhance music education.',
    isNew: true,
    attachments: [],
  },
  {
    id: 12,
    sender: 'Peace Valley School',
    subject: 'Cultural Festival Funding',
    summary: 'Request for financial support for an upcoming cultural event.',
    date: '5 days ago',
    content: 'Proposal detailing the budget and activities planned for the festival.',
    isNew: false,
    attachments: ['EventBudget.pdf'],
  },
  
];

function Proposal() {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [proposals, setProposals] = useState(initialProposals);
  const [tabValue, setTabValue] = useState('inbox');

  const handleOpenProposal = (proposal) => {
    setSelectedProposal(proposal);
  };

  const handleCloseModal = () => {
    setSelectedProposal(null);
  };

  const handleStar = (id) => {
    setProposals(proposals.map(proposal => {
      if (proposal.id === id && proposal.status !== 'trash') {
        const newStatus = proposal.status === 'starred' ? 'inbox' : 'starred';
        return { ...proposal, status: newStatus };
      }
      return proposal;
    }));
  };

  const handleDelete = (id) => {
    setProposals(proposals.map(proposal => {
      if (proposal.id === id) {
        if (proposal.status === 'inbox') {
          return { ...proposal, status: 'trash' }; // Move to trash
        } else if (proposal.status === 'trash') {
          return null; // Remove completely from proposals
        }
      }
      return proposal;
    }).filter(Boolean)); // Filter out any null entries
  };

  const handleRestore = (id) => {
    setProposals(proposals.map(proposal => {
      if (proposal.id === id) {
        return { ...proposal, status: 'inbox' }; // Restore to inbox
      }
      return proposal;
    }));
  };

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  const filteredProposals = proposals.filter(proposal => proposal.status === tabValue || tabValue === 'inbox');

  return (
    <Container className="proposal-container">
      <div className="header">
        <Typography variant="h4" className="heading">
          Proposals
        </Typography>
        <Fab color="primary" aria-label="add" size="medium" className="add-btn">
          <Add />
        </Fab>
      </div>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="email categories">
        <Tab label="Inbox" value="inbox" />
        <Tab label="Starred" value="starred" />
        <Tab label="Trash" value="trash" />
      </Tabs>
      <div className="proposal-list">
        {filteredProposals.map((proposal) => (
          <MessageCard
            key={proposal.id}
            message={proposal}
            onClick={() => handleOpenProposal(proposal)} // Open modal
            onStar={() => handleStar(proposal.id)} // Toggle star
            onDelete={() => handleDelete(proposal.id)} // Handle delete (move to trash)
            actionButton={
              proposal.status === 'trash' ? (
                <>
                  <IconButton onClick={() => handleRestore(proposal.id)} aria-label="restore">
                    <Restore />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(proposal.id)} aria-label="delete forever">
                    <DeleteForever />
                  </IconButton>
                </>
              ) : (
                <IconButton onClick={() => handleDelete(proposal.id)} aria-label="delete">
                  <Star />
                </IconButton>
              )
            }
          />
        ))}
      </div>
      <ProposalModal message={selectedProposal} onClose={handleCloseModal} />
    </Container>
  );
}

export default Proposal;