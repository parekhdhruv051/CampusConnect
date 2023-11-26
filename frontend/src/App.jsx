import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css';
import CreatePost from './CreatePost';

// import PostPage from './PostPage';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Community from './Community.jsx';
import Sign2 from './Login/Sign2.jsx';


function App() {

  return (

    <Router>

      <Routes>
        <Route path="/login/*" element={<Sign2 />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Community/*" element={<Community />} />
      </Routes>
    </Router>
  )
}

export default App