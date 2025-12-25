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
  const [diagnosis, setDiagnosis] = React.useState({ prediction: "Unknown", confidence: 0 });

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diagnostic" element={<Diagnostic setGlobalDiagnosis={setDiagnosis} />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Chatbot prediction={diagnosis.prediction} confidence={diagnosis.confidence} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
