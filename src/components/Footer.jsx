import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { conferenceData } from '../data/conferenceData';

export default function Footer() {
  const navigate = useNavigate();

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer className="relative bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 overflow-hidden dark:bg-darkbg dark:border-darkbg-border">
      {/* Background Blobs for aesthetics */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-brand-800/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent-950/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 ${conferenceData.showSponsorship ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-12 mb-12`}>
          
          {/* Col 1: About Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-600 to-accent-400 flex items-center justify-center text-white font-bold text-base shadow-md">
                E
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight text-white">
                EZPRC 2026
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              The 3rd East Zone Paediatric Rheumatology Conference (EZPRC 2026) is the premier regional scientific event bringing the complexities of paediatric rheumatic and immunodeficiency diseases to Ranchi, Jharkhand.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-display font-bold text-white text-base mb-6 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-brand-500">
              Quick Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-brand-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <FiArrowRight size={14} className="text-slate-500" /> Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('invitation')} className="hover:text-brand-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <FiArrowRight size={14} className="text-slate-500" /> Invitation Letter
                </button>
              </li>
              {conferenceData.showSponsorship && (
                <li>
                  <button onClick={() => handleNavClick('sponsorship')} className="hover:text-brand-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                    <FiArrowRight size={14} className="text-slate-500" /> Sponsorship & Tariff
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => handleNavClick('registration')} className="hover:text-brand-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <FiArrowRight size={14} className="text-slate-500" /> Fees & Payments
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} className="hover:text-brand-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                  <FiArrowRight size={14} className="text-slate-500" /> FAQ & Venue
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Sponsorship Info */}
          {conferenceData.showSponsorship && (
            <div>
              <h3 className="font-display font-bold text-white text-base mb-6 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-brand-500">
                Sponsorship Packages
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <button onClick={() => handleNavClick('sponsorship')} className="hover:text-brand-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer">
                    <FiArrowRight size={14} className="text-slate-500" /> Platinum Sponsor (₹8,00,000)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('sponsorship')} className="hover:text-brand-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer">
                    <FiArrowRight size={14} className="text-slate-500" /> Diamond Sponsor (₹5,00,000)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('sponsorship')} className="hover:text-brand-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer">
                    <FiArrowRight size={14} className="text-slate-500" /> Gold Sponsor (₹3,00,000)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('sponsorship')} className="hover:text-brand-400 text-left transition-colors flex items-center gap-1.5 cursor-pointer">
                    <FiArrowRight size={14} className="text-slate-500" /> Premium Stall (₹2,00,000)
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Col 4: Contact Us */}
          <div>
            <h3 className="font-display font-bold text-white text-base mb-6 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-brand-500">
              Contact Details
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-brand-400 mt-1 shrink-0" size={16} />
                <span>
                  <strong>The Royal Retreat, Ranchi</strong><br />
                  Ramgarh Rd, Krishna Nagar, Sainik Colony, Ranchi, Jharkhand 834012
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-brand-400 shrink-0" size={16} />
                <a href={`tel:${conferenceData.contactNumber}`} className="hover:text-white transition-colors">
                  +91 {conferenceData.contactNumber}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-brand-400 shrink-0" size={16} />
                <a href={`mailto:${conferenceData.contactEmail}`} className="hover:text-white transition-colors">
                  {conferenceData.contactEmail}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom divider and copyright */}
        <div className="border-t border-slate-800/80 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 dark:border-darkbg-border/60">
          <p>© {new Date().getFullYear()} IAP Ranchi District Branch. All Rights Reserved. Designed for Pediatricians & Residents.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-slate-300 transition-colors">Jharkhand Pediatric Association</span>
            <span>•</span>
            <span className="hover:text-slate-300 transition-colors">Scientific Hub</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
