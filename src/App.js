import React, { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton'; 
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [userMessages, setUserMessages] = useState({});
  const [messageInput, setMessageInput] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const apiBaseUrl = 'http://localhost:8000'; 

  const handleMessageSubmit = async () => {
    if (messageInput.trim() === '') return;

    if (messageCount >= 25) {
      alert('You have reached the message limit.');
      return;
    }

    try {
      const response = await sendMessageToAI(messageInput);
      
      setUserMessages((prevMessages) => ({
        ...prevMessages,
        [username]: [
          ...(prevMessages[username] || []),
          { text: messageInput, isUser: true },
          { text: response.generated_text, isUser: false },
        ],
      }));

      setMessageInput('');
      setMessageCount(messageCount + 1);
    } catch (error) {
      console.error('Error sending message to AI:', error);
    }
  };

  const sendMessageToAI = async (message) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/generate-text`, { text: message }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message to AI:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${apiBaseUrl}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${username}`, 
          },
        }
      );
      setUsername('');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };



  return (
    <div className="App">
      {username ? (
        <>
          <Chat
            username={username}
            sendMessageToAI={sendMessageToAI}
            userMessages={userMessages}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            handleMessageSubmit={handleMessageSubmit}
          />
          <LogoutButton handleLogout={setUsername} /> 
        </>
      ) : (
        <>
          <LoginForm onLogin={(access_token) => setUsername(access_token)} />
          {showRegisterForm ? (
            <RegisterForm />
          ) : (
            <button onClick={() => setShowRegisterForm(true)}>Register</button> 
          )}
        </>
      )}
    </div>
  );
}

export default App;
