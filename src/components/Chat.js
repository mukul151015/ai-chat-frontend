import React, { useState } from 'react';
import './Chat.css';

function Chat({ username, sendMessageToAI, userMessages, messageInput, setMessageInput, handleMessageSubmit }) {
  return (
    <div className="chat-container">
      <div className="chat">
        {userMessages[username]?.map((message, index) => (
          <div key={index} className={`message ${message.isUser ? 'user' : 'ai'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={handleMessageSubmit}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
