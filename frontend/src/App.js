import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Diagnostic from './pages/Diagnostic';
import About from './pages/About';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';
import Footer from './components/Footer';
import './App.css';
import Chatbot from './components/Chatbot';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [diagnosis, setDiagnosis] = React.useState({ prediction: "Unknown", confidence: 0 });

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/diagnostic"
              element={
                <ProtectedRoute>
                  <Diagnostic setGlobalDiagnosis={setDiagnosis} />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/patient-dashboard"
              element={
                <ProtectedRoute>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Chatbot prediction={diagnosis.prediction} confidence={diagnosis.confidence} />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
