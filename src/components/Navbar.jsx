import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useDarkMode from '../hooks/useDarkMode';

export default function Navbar() {
  const [theme, toggleTheme] = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  // Handle scroll after navigating from another page
  useEffect(() => {
    if (location.state && location.state.scrollTo && location.pathname === '/') {
      const sectionId = location.state.scrollTo;
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      // Clear state so it doesn't scroll again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const navLinks = [
    { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Invitation', action: () => handleNavClick('invitation') },
    { label: 'Sponsorship & Tariff', action: () => handleNavClick('sponsorship') },
    { label: 'Fees & Payments', action: () => handleNavClick('registration') },
    { label: 'FAQ & Venue', action: () => handleNavClick('faq') },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass-effect py-3 shadow-md bg-white/80 dark:bg-[#0b041a]/80' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-400 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
              E
            </div>
            <div>
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent dark:from-brand-300 dark:via-brand-400 dark:to-accent-300">
                EZPRC 2026
              </span>
              <span className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                3rd East Zone Paediatric Rheumatology Conference
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="font-medium text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors duration-200 cursor-pointer relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-500 dark:after:bg-brand-400 after:transition-all hover:after:w-full"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* CTA Button */}
              <button
                onClick={() => handleNavClick('registration')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-medium text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border-none"
              >
                Register Now
                <FiArrowRight />
              </button>
            </div>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-darkbg-card hover:bg-slate-200 dark:hover:bg-brand-950/40 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-darkbg-border cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden w-full border-t border-slate-200/50 dark:border-darkbg-border/50 bg-white/95 dark:bg-[#0b041a]/95 backdrop-blur-lg overflow-hidden shadow-inner"
          >
            <div className="px-4 pt-3 pb-6 space-y-3 flex flex-col">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-brand-950/20 text-slate-700 dark:text-slate-200 font-medium text-sm transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 border-t border-slate-200 dark:border-darkbg-border">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNavClick('registration');
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer border-none"
                >
                  Register Now
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
