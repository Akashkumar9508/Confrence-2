import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import { conferenceData } from './data/conferenceData';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0b041a] transition-colors duration-300">
        {/* Scroll restoration & back-to-top handler */}
        <ScrollToTop />

        {/* Global Header */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Redirect any sub-route or old path back to the main poster page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating Support Button */}
        <WhatsAppButton 
          phoneNumber={`+91${conferenceData.contactNumber}`}
          message={`Hi! I am interested in the 3rd East Zone Paediatric Rheumatology Conference (EZPRC 2026).`}
        />
      </div>
    </Router>
  );
}
