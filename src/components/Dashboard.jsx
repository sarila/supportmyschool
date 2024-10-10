import React, { useState, useEffect } from 'react';
import '../css-files/dashboard.css';
import logo from "../assets/HeaderResize1.png";
import { FaUser, FaWallet, FaFileAlt, FaSchool, FaSignOutAlt, FaCog } from 'react-icons/fa'; // Updated icons

export const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to toggle body class based on theme
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const renderContent = () => {
    switch (selectedSection) {
      case 'profile':
        return <div>Profile Content</div>;
      case 'budget':
        return <div>Budget Content</div>;
      case 'proposal':
        return <div>Proposal Content</div>;
      case 'schools':
        return <div>Available Schools Content</div>;
      case 'settings':
        return <div>Settings Content</div>; // New content section for settings
      case 'logout':
        return <div>Logout Content</div>;
      default:
        return <div>Welcome to the Dashboard</div>;
    }
  };

  const handleToggle = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className='dashboard-container'>
      <div className='sidebar'>
        <div className='user-info'>
          <img src={logo} alt="User" className='user-image' />
        </div>
        <ul>
          <li className={selectedSection === 'profile' ? 'active' : ''} onClick={() => setSelectedSection('profile')}><FaUser /> Profile</li>
          <li className={selectedSection === 'budget' ? 'active' : ''} onClick={() => setSelectedSection('budget')}><FaWallet /> Budget</li>
          <li className={selectedSection === 'proposal' ? 'active' : ''} onClick={() => setSelectedSection('proposal')}><FaFileAlt /> Proposal</li>
          <li className={selectedSection === 'schools' ? 'active' : ''} onClick={() => setSelectedSection('schools')}><FaSchool /> Available Schools</li>
          <li className={selectedSection === 'settings' ? 'active' : ''} onClick={() => setSelectedSection('settings')}><FaCog /> Settings</li> {/* New Settings option */}
          <li className={selectedSection === 'logout' ? 'active' : ''} onClick={() => setSelectedSection('logout')}><FaSignOutAlt /> Logout</li>
        </ul>
        {/* Theme Toggle Switch */}
        <div className="theme-toggle">
          <label className="switch">
            <input type="checkbox" checked={isDarkMode} onChange={handleToggle} />
            <span className="slider"></span>
          </label>
          <span style={{ marginLeft: '10px' }}>Switch Theme</span> {/* Text for theme toggle */}
        </div>
      </div>
      <div className='main-content'>
        {renderContent()}
      </div>
    </div>
  );
};
