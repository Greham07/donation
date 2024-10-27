import React, { useState } from 'react';
import axios from 'axios';

const DonationForm = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState(''); // State to hold success or error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the JWT token from local storage
    const token = localStorage.getItem('token');
    console.log("Client-side token:", token);
    if (!token) {
      console.error('No token found');
      setMessage('No token found. Please log in again.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/donations/donate', 
        {
          itemName, 
          description, 
          category, 
          location
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the request
          }
        }
      );

      console.log('Donation submitted:', response.data);
      setMessage('Donation submitted successfully!'); // Set success message
      // Clear form fields
      setItemName('');
      setDescription('');
      setCategory('');
      setLocation('');
    } catch (error) {
      console.error('Error submitting donation:', error);
      const errorMessage = error.response?.data?.msg || 'Error submitting donation. Please try again.';
      setMessage(errorMessage); // Set error message based on server response
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Donate an Item</h2>
      <input 
        type="text" 
        placeholder="Item Name" 
        value={itemName} 
        onChange={(e) => setItemName(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Item Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Category" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Location" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        required 
      />
      <button type="submit">Submit Donation</button>
      {message && <p>{message}</p>} {/* Display success or error message */}
    </form>
  );
};

export default DonationForm;
