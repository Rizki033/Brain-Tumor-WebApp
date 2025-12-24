import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Diagnostic from './pages/Diagnostic';
import About from './pages/About';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Footer from './components/Footer';
import './App.css';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Chatbot prediction={"Unknown"} confidence={0} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
