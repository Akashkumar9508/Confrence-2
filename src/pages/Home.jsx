import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FiCalendar, 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiInfo, 
  FiChevronRight, 
  FiCheckCircle, 
  FiCopy, 
  FiAward, 
  FiTrendingUp, 
  FiStar, 
  FiUser, 
  FiBriefcase,
  FiExternalLink,
  FiX
} from 'react-icons/fi';
import { FaWhatsapp, FaUniversity } from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react';
import { conferenceData } from '../data/conferenceData';
import CountdownTimer from '../components/CountdownTimer';
import ranchiCollage from '../assets/ranchi-collage.jpg';

export default function Home() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('sponsorship'); // 'sponsorship' | 'advertisement'
  const [copiedField, setCopiedField] = useState(null);
  const [activeModalQr, setActiveModalQr] = useState(null);

  const upiPayUrl = `upi://pay?pa=${conferenceData.bankDetails.upiId}&pn=${encodeURIComponent(conferenceData.bankDetails.accountName)}&am=4000.00&cu=INR&tn=EZPRC2026`;

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleRegisterClick = () => {
    window.open(conferenceData.googleFormLink, '_blank');
  };

  const handleWhatsAppInquiry = () => {
    const message = `Hi, I am interested in sponsoring/advertising at the 3rd East Zone Paediatric Rheumatology Conference (EZPRC 2026). Please share more details.`;
    const cleanNumber = conferenceData.contactNumber.replace(/[^\d+]/g, '');
    window.open(`https://wa.me/91${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 dark:bg-darkbg dark:text-slate-100 transition-colors duration-300">
      
      {/* Background Blobs for Visual depth */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blob-purple opacity-30 pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-blob-cyan opacity-30 pointer-events-none" />

      {/* ==================================================
          1. HERO HEADER
          ================================================== */}
      <header className="relative py-20 px-4 text-center overflow-hidden">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 dark:opacity-35 pointer-events-none" 
          style={{ backgroundImage: `url(${ranchiCollage})` }}
        />
        {/* Vertical Gradient Overlay for smooth blending into the page sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/20 via-transparent to-slate-50 dark:from-brand-950/10 dark:via-transparent dark:to-darkbg pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          
          {/* Highlight Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <span className="bg-brand-100 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border border-brand-200/50 dark:border-brand-900/30 uppercase tracking-widest shadow-sm">
              {conferenceData.subtitle}
            </span>
          </motion.div>

          {/* Main Title & Theme */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-indigo-950 dark:text-white leading-tight tracking-tight max-w-4xl mx-auto"
          >
            {conferenceData.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-slate-500 dark:text-slate-455 text-xs sm:text-sm uppercase font-bold tracking-wider mb-2">
              Conference Theme
            </p>
            <p className="font-display font-extrabold text-lg sm:text-2xl text-brand-600 dark:text-accent-400 bg-brand-50/50 dark:bg-brand-950/25 py-2 px-4 rounded-xl border border-brand-100/50 dark:border-brand-900/20 inline-block shadow-inner">
              "{conferenceData.theme}"
            </p>
          </motion.div>

          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 max-w-xl mx-auto uppercase tracking-wide">
            Organised by: {conferenceData.organisedBy}
          </p>

          {/* Dates & Venue Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto bg-white dark:bg-darkbg-card border border-indigo-150/40 dark:border-darkbg-border shadow-xl rounded-3xl p-6 sm:p-8 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
          >
            {/* Left: EZPRC Logo / Badge */}
            <div className="flex flex-col items-center space-y-1 md:border-r border-slate-100 dark:border-slate-800 pb-4 md:pb-0">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-brand-950/60 flex items-center justify-center text-brand-600 dark:text-accent-300 border border-indigo-100 dark:border-brand-900/30">
                <span className="font-display font-black text-sm text-center leading-none">EZPRC<br/>2026</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase mt-2">Ranchi, JH</p>
            </div>

            {/* Middle: Event Dates */}
            <div className="space-y-2 md:col-span-1 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 pb-4 md:pb-0">
              <div className="flex items-center justify-center gap-2 text-indigo-700 dark:text-brand-300">
                <FiCalendar className="shrink-0 text-brand-550 dark:text-accent-400" size={20} />
                <span className="font-display font-black text-base sm:text-lg tracking-tight">
                  {conferenceData.dates}
                </span>
              </div>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/30 px-3 py-1 rounded-full inline-block">
                Mark Your Calendar
              </span>
            </div>

            {/* Right: Venue */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-indigo-950 dark:text-white">
                <FiMapPin className="shrink-0 text-red-500 dark:text-red-400" size={20} />
                <span className="font-display font-extrabold text-sm sm:text-base uppercase tracking-tight">
                  {conferenceData.venue.name}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">Ranchi, Jharkhand</p>
            </div>
          </motion.div>

          {/* Countdown Wrapper */}
          <div className="max-w-2xl mx-auto pt-6">
            <CountdownTimer targetDate="2026-10-31T09:00:00" />
          </div>

        </div>
      </header>

      {/* ==================================================
          2. ELEGANT INVITATION LETTER
          ================================================== */}
      <section id="invitation" className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-darkbg-card border border-slate-200/80 dark:border-darkbg-border shadow-lg rounded-3xl p-6 sm:p-12 relative overflow-hidden"
        >
          {/* Subtle design element */}
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-500" />
          
          <div className="space-y-6">
            {/* Salutation */}
            <h3 className="font-display font-extrabold text-lg sm:text-xl text-indigo-950 dark:text-white">
              Dear Colleagues, Mentors, and Friends in Paediatrics,
            </h3>
            
            {/* Letter Body */}
            <p className="text-slate-650 dark:text-slate-300 text-sm sm:text-base leading-relaxed text-justify">
              {conferenceData.description}
            </p>

            {/* Why You Should Be There */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <h4 className="font-display font-black text-sm sm:text-base text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <FiAward className="text-brand-500" /> Why You Should Be There:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {conferenceData.whyAttend.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 bg-slate-50 dark:bg-brand-950/20 border border-slate-200/60 dark:border-brand-900/10 rounded-2xl flex items-start gap-3 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <FiCheckCircle className="text-brand-600 dark:text-accent-400" size={14} />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-tight mb-1">
                        {item.title}
                      </h5>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-normal">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-350 text-sm sm:text-base leading-relaxed text-justify pt-2">
              {conferenceData.invitationClosing}
            </p>

            {/* Letter Footer (Dr. Neha Singh Card) */}
            <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-400 bg-slate-800 shrink-0 shadow-md">
                  <img
                    src={conferenceData.organisingCommittee[0].image}
                    alt={conferenceData.organisingCommittee[0].name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h5 className="font-display font-extrabold text-sm sm:text-base text-indigo-950 dark:text-white uppercase leading-none">
                    {conferenceData.organisingCommittee[0].name}
                  </h5>
                  <p className="text-[10px] text-brand-600 dark:text-accent-400 font-bold uppercase tracking-wider mt-1.5 leading-none">
                    {conferenceData.organisingCommittee[0].role}
                  </p>
                  <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 uppercase font-semibold">
                    EZPRC 2026 Organising Secretary
                  </p>
                </div>
              </div>

              {/* Call / Contact details */}
              <div className="flex flex-col gap-2 shrink-0 bg-slate-50 dark:bg-brand-950/30 border border-slate-150 dark:border-brand-900/20 p-4 rounded-2xl w-full sm:w-auto">
                <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-extrabold block">Organising Secretariat</span>
                <a 
                  href={`tel:${conferenceData.contactNumber}`} 
                  className="flex items-center gap-2 font-display font-black text-sm text-indigo-950 dark:text-white hover:text-brand-500 transition-colors"
                >
                  <FiPhone className="text-brand-500" /> +91 {conferenceData.contactNumber}
                </a>
                <button
                  onClick={handleWhatsAppInquiry}
                  className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer border-none shadow-sm"
                >
                  <FaWhatsapp size={14} /> Contact on WhatsApp
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </section>

      {/* ==================================================
          3. SPONSORSHIP & ADVERTISING RATES (interactive tabs)
          ================================================== */}
      <section id="sponsorship" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="text-center mb-10 space-y-2">
          <span className="text-brand-600 dark:text-accent-400 text-xs sm:text-sm font-bold uppercase tracking-widest">
            Sponsorship Opportunities
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-indigo-950 dark:text-white uppercase tracking-tight">
            Sponsorship & Souvenir Tariff
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Review sponsorship options and souvenir advertisement slots available for corporate partners and contributors.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="p-1 bg-slate-200/60 dark:bg-darkbg-card rounded-2xl border border-slate-300/40 dark:border-darkbg-border flex gap-1 shadow-inner">
            <button
              onClick={() => setActiveTab('sponsorship')}
              className={`px-5 py-2.5 rounded-xl font-display font-extrabold text-xs sm:text-sm transition-all duration-200 cursor-pointer border-none ${
                activeTab === 'sponsorship'
                  ? 'bg-white dark:bg-brand-600 text-brand-900 dark:text-white shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Sponsorship Tariff
            </button>
            <button
              onClick={() => setActiveTab('advertisement')}
              className={`px-5 py-2.5 rounded-xl font-display font-extrabold text-xs sm:text-sm transition-all duration-200 cursor-pointer border-none ${
                activeTab === 'advertisement'
                  ? 'bg-white dark:bg-brand-600 text-brand-900 dark:text-white shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Souvenir Advertisement
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === 'sponsorship' ? (
            <motion.div
              key="sponsorship-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-7xl mx-auto"
            >
              {conferenceData.sponsorshipTariff.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white dark:bg-darkbg-card border border-slate-200/80 dark:border-darkbg-border rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group hover:border-brand-300 dark:hover:border-brand-800"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 flex items-center justify-center text-brand-600 dark:text-accent-400">
                      {item.sector.includes("Sponsor") ? <FiStar size={20} /> : <FiBriefcase size={20} />}
                    </div>
                    <h4 className="font-display font-black text-xs sm:text-sm text-indigo-950 dark:text-white uppercase leading-snug">
                      {item.sector}
                    </h4>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/80">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-semibold uppercase tracking-wider mb-0.5">Amount</span>
                    <strong className="text-brand-600 dark:text-accent-400 font-display font-black text-base">
                      {item.amount}
                    </strong>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="advertisement-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {conferenceData.souvenirAdvertisement.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white dark:bg-darkbg-card border border-slate-200/80 dark:border-darkbg-border rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group hover:border-brand-300 dark:hover:border-brand-800"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-brand-950/60 flex items-center justify-center text-accent-600 dark:text-accent-400">
                      <FiTrendingUp size={20} />
                    </div>
                    <h4 className="font-display font-black text-sm text-indigo-950 dark:text-white uppercase leading-snug">
                      {item.item}
                    </h4>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/80">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-semibold uppercase tracking-wider mb-0.5">Rate</span>
                    <strong className="text-brand-600 dark:text-accent-400 font-display font-black text-base">
                      {item.amount}
                    </strong>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA for Sponsorship */}
        <div className="mt-10 text-center">
          <button
            onClick={handleWhatsAppInquiry}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border-none"
          >
            Inquire About Sponsorships <FiChevronRight />
          </button>
        </div>

      </section>

      {/* ==================================================
          4. REGISTRATION HUBS & ACCOUNT DETAILS
          ================================================== */}
      <section id="registration" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Left Column: Fees breakdown */}
          <div className="lg:col-span-5 bg-white dark:bg-darkbg-card border border-slate-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-display font-black text-xl text-indigo-950 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 uppercase tracking-tight">
                REGISTRATION FEES
              </h3>
              
              <ul className="space-y-4">
                <li className="flex justify-between items-start gap-4 border-b border-slate-50 dark:border-slate-800 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{conferenceData.registrationFees.delegate.label}</h4>
                  </div>
                  <strong className="text-brand-600 dark:text-accent-400 font-display font-black text-base">{conferenceData.registrationFees.delegate.fee}</strong>
                </li>
                
                <li className="flex justify-between items-start gap-4 border-b border-slate-50 dark:border-slate-800 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{conferenceData.registrationFees.pgStudent.label}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{conferenceData.registrationFees.pgStudent.note}</p>
                  </div>
                  <strong className="text-brand-600 dark:text-accent-400 font-display font-black text-base">{conferenceData.registrationFees.pgStudent.fee}</strong>
                </li>
                
                <li className="flex justify-between items-start gap-4 border-b border-slate-50 dark:border-slate-800 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{conferenceData.registrationFees.seniorCitizen.label}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{conferenceData.registrationFees.seniorCitizen.note}</p>
                  </div>
                  <strong className="text-brand-600 dark:text-accent-450 font-display font-black text-sm bg-indigo-50 dark:bg-brand-950/40 px-2 py-0.5 rounded-md">{conferenceData.registrationFees.seniorCitizen.fee}</strong>
                </li>

                <li className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{conferenceData.registrationFees.accompanying.label}</h4>
                  </div>
                  <strong className="text-brand-600 dark:text-accent-400 font-display font-black text-base">{conferenceData.registrationFees.accompanying.fee}</strong>
                </li>
              </ul>

              {/* Special Accomodation Promo Box */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                <div className="flex gap-2 items-start">
                  <FiInfo size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Special Accommodation Offer:</strong> {conferenceData.registrationFees.specialOffer}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Form Trigger Button */}
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleRegisterClick}
                className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                Open Google Form Registration <FiChevronRight />
              </button>
              <div className="text-center mt-3">
                <a 
                  href={conferenceData.googleFormLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[10px] text-slate-400 hover:underline inline-flex items-center gap-1"
                >
                  Direct Google Form Link <FiExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: QR Codes & Payments */}
          <div className="lg:col-span-7 bg-white dark:bg-darkbg-card border border-slate-200 dark:border-darkbg-border rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              
              {/* Left Box: Form Register QR */}
              <div className="flex flex-col items-center text-center p-4 bg-slate-50 dark:bg-brand-950/20 rounded-2xl border border-slate-100 dark:border-brand-900/10 h-full justify-between">
                <div>
                  <span className="text-[10px] bg-indigo-100 dark:bg-brand-950/40 text-indigo-750 dark:text-brand-300 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    Register Here
                  </span>
                  <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-1 leading-normal">Scan to fill Google Form</p>
                </div>
                <div 
                  onClick={() => setActiveModalQr('register')}
                  className="p-2.5 bg-white rounded-xl shadow-inner border border-slate-200/60 dark:border-brand-900/20 my-4 flex items-center justify-center cursor-zoom-in hover:scale-[1.03] transition-transform active:scale-[0.97]"
                  title="Click to view full screen"
                >
                  <QRCodeCanvas
                    value={conferenceData.googleFormLink}
                    size={140}
                    bgColor={"#ffffff"}
                    fgColor={"#1e1b4b"}
                    level={"H"}
                    includeMargin={true}
                  />
                </div>
                <button 
                  onClick={handleRegisterClick}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-lg cursor-pointer border-none"
                >
                  Register Online
                </button>
              </div>

              {/* Right Box: Pay QR */}
              <div className="flex flex-col items-center text-center p-4 bg-slate-50 dark:bg-brand-950/20 rounded-2xl border border-slate-100 dark:border-brand-900/10 h-full justify-between">
                <div>
                  <span className="text-[10px] bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    Scan Here to Pay
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">UPI Transfer (BHIM/GPay)</p>
                </div>
                <div 
                  onClick={() => setActiveModalQr('payment')}
                  className="p-2.5 bg-white rounded-xl shadow-inner border border-slate-200/60 dark:border-brand-900/20 my-4 flex items-center justify-center cursor-zoom-in hover:scale-[1.03] transition-transform active:scale-[0.97]"
                  title="Click to view full screen"
                >
                  {conferenceData.bankDetails.upiQrImage ? (
                    <img
                      src={conferenceData.bankDetails.upiQrImage}
                      alt="UPI QR Code"
                      className="w-[140px] h-[140px] object-contain rounded-lg"
                    />
                  ) : (
                    <QRCodeCanvas
                      value={upiPayUrl}
                      size={140}
                      bgColor={"#ffffff"}
                      fgColor={"#047857"}
                      level={"H"}
                      includeMargin={true}
                    />
                  )}
                </div>
                <span className="text-[10px] text-green-700 dark:text-green-400 font-bold bg-green-50 dark:bg-green-950/40 px-2 py-1 rounded">
                  UPI ID: {conferenceData.bankDetails.upiId}
                </span>
              </div>

            </div>

            {/* Bank details bar at the bottom */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">Bank Account Transfer Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-brand-950/15 p-4 rounded-xl border border-slate-100 dark:border-brand-900/10">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Account Name</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-semibold">{conferenceData.bankDetails.accountName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Bank Name</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-semibold">{conferenceData.bankDetails.bankName}</strong>
                </div>
                <div className="pt-1.5 border-t sm:border-t-0 sm:border-r border-slate-200/50 dark:border-slate-800 flex justify-between items-center sm:pr-4">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Account Number</span>
                    <strong className="text-slate-900 dark:text-white font-black select-all">{conferenceData.bankDetails.accountNumber}</strong>
                  </div>
                  <button
                    onClick={() => handleCopy(conferenceData.bankDetails.accountNumber, 'acc')}
                    className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-650 dark:hover:text-white flex items-center gap-1 text-[10px] cursor-pointer"
                  >
                    <FiCopy size={12} /> {copiedField === 'acc' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="pt-1.5 border-t sm:border-t-0 flex justify-between items-center sm:pl-4">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[9px] uppercase font-bold tracking-wider">IFSC Code</span>
                    <strong className="text-slate-900 dark:text-white font-black select-all">{conferenceData.bankDetails.ifscCode}</strong>
                  </div>
                  <button
                    onClick={() => handleCopy(conferenceData.bankDetails.ifscCode, 'ifsc')}
                    className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-650 dark:hover:text-white flex items-center gap-1 text-[10px] cursor-pointer"
                  >
                    <FiCopy size={12} /> {copiedField === 'ifsc' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          5. FAQS & VENUE DIRECTIONS MAP
          ================================================== */}
      <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200/60 dark:border-slate-800 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* MAP */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white uppercase tracking-tight">
              Venue Location & Directions
            </h3>
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-darkbg-border h-[320px] shadow-sm relative">
              <iframe
                src={conferenceData.venue.googleMapsEmbed}
                className="w-full h-full border-none"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Royal Retreat Ranchi Map"
              />
            </div>
            <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-normal flex items-start gap-1">
              <FiMapPin className="shrink-0 mt-0.5" />
              Address: {conferenceData.venue.address}
            </p>
          </div>

          {/* FAQs */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white uppercase tracking-tight">
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-3">
              {conferenceData.faqs.map((faq, idx) => (
                <div 
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-darkbg-border bg-white dark:bg-darkbg-card overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-brand-600 dark:text-accent-400 font-bold ml-2">
                      {activeFaq === idx ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-100 dark:border-darkbg-border"
                      >
                        <p className="p-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-brand-950/10">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Fullscreen QR Modal */}
      <AnimatePresence>
        {activeModalQr && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalQr(null)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              className="bg-white dark:bg-darkbg-card rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-100 dark:border-darkbg-border flex flex-col items-center space-y-4 cursor-default"
            >
              <div className="w-full flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider ${
                  activeModalQr === 'register' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'
                }`}>
                  {activeModalQr === 'register' ? 'Registration Link' : 'UPI Payment Transfer'}
                </span>
                <button
                  onClick={() => setActiveModalQr(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-brand-950/40 dark:hover:bg-brand-900/40 text-slate-500 hover:text-slate-800 dark:text-slate-350 dark:hover:text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer border-none"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-inner flex items-center justify-center my-4">
                {activeModalQr === 'payment' && conferenceData.bankDetails.upiQrImage ? (
                  <img
                    src={conferenceData.bankDetails.upiQrImage}
                    alt="UPI QR Code Fullscreen"
                    className="w-[260px] h-[260px] object-contain rounded-lg"
                  />
                ) : (
                  <QRCodeCanvas
                    value={activeModalQr === 'register' ? conferenceData.googleFormLink : upiPayUrl}
                    size={260}
                    bgColor={"#ffffff"}
                    fgColor={activeModalQr === 'register' ? "#1e1b4b" : "#047857"}
                    level={"H"}
                    includeMargin={true}
                  />
                )}
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                {activeModalQr === 'register' 
                  ? 'Scan with your smartphone camera to open the Google Registration Form.' 
                  : 'Scan with GPay, PhonePe, Paytm, BHIM, or any UPI app to complete your transaction.'
                }
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
