import React, { useState, useEffect } from 'react';
import '../css-files/dashboard.css';
import logo from "../assets/HeaderResize1.png";
import Profile from "./Profile";
import { FaUser, FaWallet, FaFileAlt, FaSchool, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { Navbar } from './Navbar';

export const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Effect to toggle body class based on theme
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const renderContent = () => {
    switch (selectedSection) {
      case 'profile':
        return <Profile />;
      case 'budget':
        return <div className='content-box'>Budget Content</div>;
      case 'proposal':
        return <div className='content-box'>Proposal Content</div>;
      case 'schools':
        return <div className='content-box'>Available Schools Content</div>;
      case 'settings':
        return <div className='content-box'>Settings Content</div>;
      case 'logout':
        return <div className='content-box'>Logout Content</div>;
      default:
        return <div className='content-box'>Welcome to the Dashboard</div>;
    }
  };

  const handleToggle = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prevState => !prevState);
  };

  return (
    <div className='dashboard-container'>
      <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className='user-info'>
          <img src={logo} alt="User" className='user-image' />
        </div>
        <ul>
          <li className={selectedSection === 'profile' ? 'active' : ''} onClick={() => setSelectedSection('profile')}><FaUser /> {isSidebarCollapsed ? '' : 'Profile'}</li>
          <li className={selectedSection === 'budget' ? 'active' : ''} onClick={() => setSelectedSection('budget')}><FaWallet /> {isSidebarCollapsed ? '' : 'Budget'}</li>
          <li className={selectedSection === 'proposal' ? 'active' : ''} onClick={() => setSelectedSection('proposal')}><FaFileAlt /> {isSidebarCollapsed ? '' : 'Proposal'}</li>
          <li className={selectedSection === 'schools' ? 'active' : ''} onClick={() => setSelectedSection('schools')}><FaSchool /> {isSidebarCollapsed ? '' : 'Schools'}</li>
          <li className={selectedSection === 'settings' ? 'active' : ''} onClick={() => setSelectedSection('settings')}><FaCog /> {isSidebarCollapsed ? '' : 'Settings'}</li>
          <li className={selectedSection === 'logout' ? 'active' : ''} onClick={() => setSelectedSection('logout')}><FaSignOutAlt /> {isSidebarCollapsed ? '' : 'Logout'}</li>
        </ul>
        <div className="theme-toggle">
          <label className="switch">
            <input type="checkbox" checked={isDarkMode} onChange={handleToggle} />
            <span className="slider"></span>
          </label>
          <span style={{ marginLeft: '10px' }}>Dark Theme</span>
        </div>
      </div>

      <div className="main-content">
        <Navbar onToggleSidebar={toggleSidebar} />
        {renderContent()}
      </div>
    </div>
  );
};
