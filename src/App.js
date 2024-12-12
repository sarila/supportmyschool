import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Dashboard } from './views/Dashboard.jsx';
import LoginPage from './views/Login.jsx';
import Signup from './views/Signup.jsx';
import Proposals from './views/Proposals.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/proposals" element={<Proposals />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;