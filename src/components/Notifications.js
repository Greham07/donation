import React from 'react';

const Notifications = ({ notifications }) => { // Accept notifications as a prop
  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((note, index) => (
          <li key={index}>{`New message from ${note.sender}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
