import React, { useState } from 'react';
import { FiDownload, FiZoomIn, FiZoomOut, FiMaximize, FiFileText } from 'react-icons/fi';

export default function PDFViewer({ pdfUrl }) {
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive' or 'preview'

  const handleZoomIn = () => {
    if (zoom < 150) setZoom(prev => prev + 10);
  };

  const handleZoomOut = () => {
    if (zoom > 70) setZoom(prev => prev - 10);
  };

  // Mock brochure images for preview mode (premium visuals to represent Pedicon brochure content)
  const brochureSlides = [
    {
      title: "Pedicon 2026 Welcome & Overview",
      desc: "Detailed invitation message from Chief Organising Secretary Dr. Sunil K. Singh and Chairperson Dr. Mridula Rohatgi.",
      gradient: "from-brand-900 to-indigo-950 text-white"
    },
    {
      title: "Scientific Program & Sessions",
      desc: "Pediatric Infectious Diseases, Neonatology, Critical Care panels, Asthma workshops, and research poster guidelines.",
      gradient: "from-indigo-950 to-slate-900 text-white"
    },
    {
      title: "Delegate Registration Fees",
      desc: "Delegate Fee: ₹4,000 | PG Student: ₹2,000 | Accompanying Person: ₹3,000 | Senior Citizens: Complimentary.",
      gradient: "from-slate-900 to-brand-950 text-white"
    }
  ];

  return (
    <div className="w-full glass-card overflow-hidden border border-slate-200/50 dark:border-darkbg-border bg-white dark:bg-[#160c2d]">
      {/* Header bar with controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 dark:bg-darkbg-card border-b border-slate-200 dark:border-darkbg-border gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
            <FiFileText size={18} />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-slate-800 dark:text-slate-100">Official Conference Brochure</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">pedicon_brochure_2026.pdf</p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex bg-slate-200 dark:bg-[#0b041a] p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setViewMode('interactive')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'interactive' 
                ? 'bg-white dark:bg-brand-600 text-brand-600 dark:text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            Interactive PDF
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'preview' 
                ? 'bg-white dark:bg-brand-600 text-brand-600 dark:text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            Slide Summary
          </button>
        </div>

        {/* PDF control buttons */}
        <div className="flex items-center gap-2">
          {viewMode === 'interactive' && (
            <div className="flex items-center bg-slate-200/50 dark:bg-[#0b041a]/50 p-1 rounded-lg gap-1 border border-slate-350 dark:border-darkbg-border">
              <button 
                onClick={handleZoomOut} 
                className="p-1 rounded hover:bg-slate-300 dark:hover:bg-brand-950 text-slate-600 dark:text-slate-400 cursor-pointer"
                title="Zoom Out"
              >
                <FiZoomOut size={16} />
              </button>
              <span className="text-xs font-semibold min-w-[40px] text-center text-slate-600 dark:text-slate-300">
                {zoom}%
              </span>
              <button 
                onClick={handleZoomIn} 
                className="p-1 rounded hover:bg-slate-300 dark:hover:bg-brand-950 text-slate-600 dark:text-slate-400 cursor-pointer"
                title="Zoom In"
              >
                <FiZoomIn size={16} />
              </button>
            </div>
          )}

          <a
            href={pdfUrl}
            download="Pedicon_Jamshedpur_2026_Brochure.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <FiDownload />
            Download PDF
          </a>
        </div>
      </div>

      {/* Main Viewer Area */}
      <div className="relative bg-slate-100 dark:bg-[#0b041a] flex items-center justify-center p-4 min-h-[450px]">
        {viewMode === 'interactive' ? (
          <div 
            className="w-full bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800 transition-all duration-200 overflow-auto rounded-lg max-w-4xl"
            style={{ 
              height: '550px',
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center'
            }}
          >
            {/* Native browser fallback view */}
            <object
              data={`${pdfUrl}#toolbar=0&navpanes=0`}
              type="application/pdf"
              className="w-full h-full"
            >
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
                className="w-full h-full border-none"
                title="Pedicon Brochure Viewer"
              />
            </object>
          </div>
        ) : (
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 py-6 px-2">
            {brochureSlides.map((slide, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-2xl bg-gradient-to-br ${slide.gradient} shadow-md border border-slate-250 dark:border-darkbg-border flex flex-col justify-between h-64`}
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-accent-400 font-bold mb-4">
                    0{idx + 1}
                  </div>
                  <h5 className="font-display font-bold text-lg leading-snug">{slide.title}</h5>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{slide.desc}</p>
                </div>
                <div className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase mt-4">
                  Pedicon 2026 • Brochure
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
