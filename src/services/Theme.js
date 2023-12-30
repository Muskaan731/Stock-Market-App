// Theme.js
import React from 'react';
import '../styles/Theme.css'; // Import your theme styles

const Theme = ({ isDarkMode }) => {
    
  return (
    <div className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Your theme toggle UI goes here */}
      {isDarkMode ? 'Dark Mode' : 'Light Mode'}
    </div>
  );
};

export default Theme;
