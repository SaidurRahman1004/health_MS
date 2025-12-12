import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SymptomChecker from './pages/SymptomChecker';
import BMICalculator from './pages/BMICalculator';
import Articles from './pages/Articles';
import Hospitals from './pages/Hospitals';
import FirstAid from './pages/FirstAid';
import History from './pages/History';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavigationBar />
          <div style={{ minHeight: '80vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/symptom-checker" element={<SymptomChecker />} />
              <Route path="/bmi-calculator" element={<BMICalculator />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/hospitals" element={<Hospitals />} />
              <Route path="/first-aid" element={<FirstAid />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;