import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate.push('/login');
    }

    socket.emit('join');
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('users', (users) => {
      console.log('Users connected:', users);
    });

    return () => {
      socket.disconnect();
    };
  }, [navigate]);

  const sendMessage = () => {
    if (message) {
      socket.emit('message', { message });
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        <div>
          {messages.map((msg, index) => (
            <p key={index}><strong>{msg.username}: </strong>{msg.message}</p>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
