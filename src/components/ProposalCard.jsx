import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';

function ProposalCard({ proposal, onStar, onDelete, onClick }) {
  if (!proposal) {
    return null; // or return a placeholder component
  }

  return (
    <Card className="mb-3" onClick={() => onClick(proposal)}>
      <Card.Body>
        <Card.Title>{proposal.subject}</Card.Title>
        <Card.Text>{proposal.summary}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">{proposal.date}</small>
          <div>
            <Button variant="link" onClick={(e) => {
              e.stopPropagation();
              onStar(proposal.id);
            }}>
              <FontAwesomeIcon icon={faStar} color={proposal.isStarred ? 'gold' : 'gray'} />
            </Button>
            <Button variant="link" onClick={(e) => {
              e.stopPropagation();
              onDelete(proposal.id);
            }}>
              <FontAwesomeIcon icon={faTrash} color="red" />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProposalCard;
