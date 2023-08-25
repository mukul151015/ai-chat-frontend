// LogoutButton.js

import React from 'react';

function LogoutButton({ handleLogout }) {
  const HandleUserName = async () => {
         handleLogout("");
    // try {
    //   await axios.post('http://localhost:8000/logout', null, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('access_token')}`, 
    //     },
    //   });
      
    //   localStorage.removeItem('access_token');
    //   onLogout();
    // } catch (error) {
    //   console.error('Error logging out:', error);
    // }
    
  };

  return (
    <div>
      <button onClick={HandleUserName}>Logout</button>
    </div>
  );
}

export default LogoutButton;
