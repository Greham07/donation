import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState(null); // State to hold any error messages

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // Include the Authorization header if needed
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/donations', {
          headers: {
            Authorization: `Bearer ${token}`, // If your endpoint requires authentication
          },
        });
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
        setError('Failed to fetch donations.'); // Set error message
      }
    };

    fetchDonations();
  }, []);

  return (
    <div>
      <h2>Available Donations</h2>
      <ul>
        {donations.map((donation) => (
          <li key={donation._id}>
            <Link to={`/donation/${donation._id}`}>
              {donation.itemName}
            </Link>
            {' - '} {/* Add a separator */}
            <span>{donation.location}</span> {/* Display location */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonationList;
