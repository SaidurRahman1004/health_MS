import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            {/* আরও routes পরে যোগ করব */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;