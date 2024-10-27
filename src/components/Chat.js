import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import React from 'react';

// Move socket connection inside the component or use a context
let socket;

const Chat = ({ donorId, doneeId, notifications, setNotifications }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket = io('http://localhost:5000'); // Adjust this to your backend URL

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      socket.emit('joinChat', { donorId, doneeId });
    });

    // Listen for messages received from the server
    const messageReceivedHandler = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      // Add to notifications if the message is relevant to the current user
      if (message.receiver === donorId || message.sender === donorId) {
        setNotifications((prevNotifications) => [...prevNotifications, message]);
      }
    };

    socket.on('messageReceived', messageReceivedHandler);

    // Cleanup function
    return () => {
      socket.off('messageReceived', messageReceivedHandler);
      socket.off('connect');
      socket.disconnect(); // Disconnect when the component unmounts
    };
  }, [donorId, doneeId, setNotifications]);

  const handleSendMessage = () => {
    if (!newMessage) return;

    const messageData = {
      sender: donorId,
      receiver: doneeId,
      message: newMessage,
    };

    socket.emit('sendMessage', messageData); // Emit to the server
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <h3>Chat</h3>
      <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <strong>{msg.sender === donorId ? 'Donor' : 'Donee'}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <textarea
        className="chat-input"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
