import { useState, useEffect } from "react";

const useProposalData = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const data = [
          {
            id: 1,
            sender: "Rabin Nepali",
            subject: "Community Park Renovation",
            summary: "Proposal for renovating the central park with new amenities.",
            date: "Jestha 17, 2082",
            content: "Detailed proposal content here...",
            isNew: true,
            attachments: ["proposal.pdf"],
            status: "inbox",
          },
          {
            id: 2,
            sender: "Pramika Neupane",
            subject: "School Library Upgrade",
            summary: "Request for upgrading the school's library with modern books and technology.",
            date: "Falgun 15, 2081",
            content: "Another detailed proposal...",
            isNew: false,
            attachments: ["library_plan.pdf"],
            status: "approved",
          },
        ];

        setProposals(data);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  return { proposals, loading };
};

export default useProposalData;
