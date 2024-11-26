import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ProposalCard from '../components/ProposalCard';
import ProposalModal from '../components/ProposalModal';
import '../styles/reports.css';

//dummy data
const proposalsData = [
  {
    id: 1,
    title: "Proposal for Budget Allocation for School Infrastructure",
    date: "2024-11-01",
    attachments: ["budget_breakdown.pdf", "school_image.jpg"],
    summary: "A detailed proposal requesting funds to improve school infrastructure, focusing on classroom renovations and resource upgrades.",
    fullProposal: `
      This proposal outlines a request for funding to upgrade the infrastructure of schools within the district. 
      The key focus areas include:
      1. Renovation of classrooms, including the installation of durable furniture and modern teaching tools.
      2. Construction of additional classrooms to reduce overcrowding, ensuring a better learning environment for students.
      3. Improvement of sanitary facilities, including the addition of separate restrooms for boys and girls, and ensuring access to clean drinking water.
      4. Installation of solar panels to provide uninterrupted electricity to schools, promoting sustainability.
      
      Budget Breakdown:
      - Classroom renovations: Rs. 5,000,000
      - Sanitation improvements: Rs. 2,000,000
      - Solar panel installations: Rs. 1,500,000
      - Miscellaneous expenses: Rs. 500,000
      
      Total Requested Amount: Rs. 9,000,000
      
      The implementation timeline is estimated to be six months upon approval. This proposal aims to create a safer and more conducive environment for education in our schools.
    `,
  },
  {
    id: 2,
    title: "Proposal for Teachers' Salaries Adjustment",
    date: "2024-11-05",
    attachments: ["salary_report.pdf", "guidelines.pdf"],
    summary: "A request to adjust teacher salaries in alignment with recent government-issued pay scale guidelines.",
    fullProposal: `
      This proposal seeks approval for revising teachers' salaries to comply with the updated government pay scale guidelines released in October 2024. 
      Teachers play a crucial role in shaping the future of our children, and competitive compensation is essential to ensure their motivation and retention.

      The proposed adjustments include:
      - A 15% increment for primary school teachers to bring their salaries on par with the inflation rate.
      - A 10% increment for secondary school teachers, along with additional performance-based incentives.
      - A one-time allowance for rural area teachers to compensate for challenging work conditions.

      Justification:
      - Current salaries are below market standards, leading to high turnover rates and vacancies.
      - Adjustments will align the district's education sector with national standards and improve teacher satisfaction.
      
      Total Budget Impact:
      - Annual cost increase: Rs. 12,000,000
      - Funding sources: State education grants and district funds.

      Approval and timely implementation of this proposal will enhance teacher retention and improve the overall quality of education.
    `,
  },
];
function Reports() {
  const [selectedProposal, setSelectedProposal] = useState(null);

  const handleOpen = (proposal) => {
    setSelectedProposal(proposal);
  };

  const handleClose = () => {
    setSelectedProposal(null);
  };

  return (
    <Box className="reports-container">
      <Typography variant="h4" className="heading">
        Incoming Proposals
      </Typography>
      <Box className="proposal-grid">
        {proposalsData.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            onViewProposal={handleOpen}
          />
        ))}
      </Box>

      {selectedProposal && (
        <ProposalModal
          proposal={selectedProposal}
          onClose={handleClose}
        />
      )}
    </Box>
  );
}

export default Reports;
