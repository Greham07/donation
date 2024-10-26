// src/components/DonationDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DonationDetails = () => {
  const { donationId } = useParams(); // Get donationId from URL
  const [donation, setDonation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch donation details by ID
    const fetchDonationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/donations/${donationId}`);
        setDonation(response.data); // Set donation data to state
      } catch (err) {
        setError('Error fetching donation details');
      }
    };
    fetchDonationDetails();
  }, [donationId]);

  if (error) return <p>{error}</p>;
  if (!donation) return <p>Loading...</p>;

  return (
    <div>
      <h2>Donation Details</h2>
      <p><strong>Title:</strong> {donation.itemName}</p>
      <p><strong>Description:</strong> {donation.description}</p>
      <p><strong>Location:</strong> {donation.location}</p>
      <p><strong>Posted by:</strong> {donation.donor?.name || 'Unknown'}</p>
    </div>
  );
};

export default DonationDetails;
