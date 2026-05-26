import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { FiDownload, FiShare2, FiSend } from 'react-icons/fi';

export default function QRGenerator({ slug = "jharkhand-pedicon-2026" }) {
  const qrRef = useRef();
  
  // Construct the redirect URL dynamically
  const redirectUrl = `${window.location.origin}/conference/${slug}`;
  const whatsappShareText = `Join the 25th Jharkhand State Pedicon & 29th Annual Conference IAP Jamshedpur! Dates: 12th & 13th December 2026. Register now: ${redirectUrl}`;

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    
    const url = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.download = `pedicon_2026_qr_code.png`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareToWhatsApp = () => {
    const encodedText = encodeURIComponent(whatsappShareText);
    const url = `https://api.whatsapp.com/send?text=${encodedText}`;
    window.open(url, '_blank');
  };

  return (
    <div className="glass-card p-6 flex flex-col items-center justify-center border border-slate-200/50 dark:border-darkbg-border bg-white dark:bg-[#160c2d]">
      <div className="w-full text-center mb-4">
        <h4 className="font-display font-bold text-base text-slate-800 dark:text-slate-100">Conference QR Link</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Scan this QR code to access this conference detail page on mobile devices.</p>
      </div>

      {/* QR Code Canvas wrapper */}
      <div 
        ref={qrRef} 
        className="p-4 bg-white rounded-xl shadow-inner border border-slate-150 flex items-center justify-center"
      >
        <QRCodeCanvas
          value={redirectUrl}
          size={180}
          bgColor={"#ffffff"}
          fgColor={"#0b041a"}
          level={"H"}
          includeMargin={true}
        />
      </div>

      <div className="w-full text-center mt-3 mb-5">
        <span className="text-[10px] bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 font-semibold px-2 py-1 rounded-md uppercase tracking-wider select-all">
          {redirectUrl}
        </span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 w-full">
        <button
          onClick={downloadQRCode}
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-darkbg-card dark:hover:bg-brand-950/30 text-slate-700 dark:text-slate-350 border border-slate-200 dark:border-darkbg-border rounded-xl text-xs font-semibold transition-all cursor-pointer"
        >
          <FiDownload />
          Download QR
        </button>
        
        <button
          onClick={shareToWhatsApp}
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          <FiSend />
          Share to WhatsApp
        </button>
      </div>
    </div>
  );
}
