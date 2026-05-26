import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function WhatsAppButton({ phoneNumber = "+917649390574", message = "Hi! I am interested in registering for the 25th Jharkhand State Pedicon & 29th Annual Conference IAP Jamshedpur." }) {
  
  const handleClick = () => {
    // Format phone number (remove non-digits except +)
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-2xl hover:shadow-[0_8px_30px_rgb(34,197,94,0.4)] cursor-pointer focus:outline-none"
      title="Contact Registrar on WhatsApp"
      aria-label="WhatsApp Contact"
    >
      <span className="absolute w-full h-full rounded-full bg-green-400 opacity-30 animate-ping pointer-events-none" />
      <FaWhatsapp size={30} className="relative z-10" />
    </motion.button>
  );
}
