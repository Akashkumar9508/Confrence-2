# Pedicon Jamshedpur 2026 Conference Website

This is a premium, responsive, and search engine optimized (SEO) static conference website built for the **"25th Jharkhand State Pedicon & 29th Annual Conference IAP Jamshedpur"** which will take place on **12th & 13th December 2026** (Pre-conference workshops on **11th December 2026**) at **Hotel Ramada, Jamshedpur**.

Built using **React.js, Vite, Tailwind CSS, Framer Motion, and React Router DOM**, this website is lightweight, mobile-first, supports dark/light modes, and handles 200+ concurrent visitors smoothly without requiring a custom backend database.

---

## 🚀 Live Demo / Deployments

- Host: **Vercel** / **Netlify**
- Main Registration Flow: User scans QR Code ➡️ Redirects to `/conference/jharkhand-pedicon-2026` ➡️ Clicks "Register" ➡️ Submits Google Form in new tab ➡️ Automated Google Apps Script triggers ticket confirmation emails.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend Core:** React.js (Vite Setup)
- **Styling:** Tailwind CSS (Dark/Light mode support, curated purple/blue/cyan palettes)
- **Routing:** React Router DOM (Single Page Routing & Redirects)
- **Animations:** Framer Motion (Page entry offsets, fading headers, counting cards)
- **Icons:** React Icons (`fi` and `fa` packs)
- **Utilities:** `qrcode.react` (Dynamic canvas QR generation)

---

## 📂 Project Structure

```text
src/
 ├── assets/          # Static logos and graphic resources
 ├── components/      # Reusable UI modules
 │    ├── Navbar.jsx           # Glassmorphic header with theme controls
 │    ├── Footer.jsx           # Standardized maps & contacts bottom footer
 │    ├── CountdownTimer.jsx   # Live ticker counting down to December 12, 2026
 │    ├── PDFViewer.jsx        # Dual-mode responsive brochure reader
 │    ├── QRGenerator.jsx      # Canvas QR generator with WhatsApp sharing
 │    ├── ScrollToTop.jsx      # Scroll restoration & back-to-top handler
 │    └── WhatsAppButton.jsx   # Floating contact widget
 ├── data/
 │    └── conferenceData.js    # Source of truth containing all schedules, fees, & speakers
 ├── hooks/
 │    └── useDarkMode.js       # Hook for localStorage-synced dark theme setting
 ├── pages/           # Page templates
 │    ├── Home.jsx             # Main landing highlights & guest previews
 │    ├── ConferenceDetail.jsx # Interactive detail page
 │    └── Success.jsx          # Post-form instructions & announcements joining page
 ├── App.jsx          # Route definitions & global layout wrapping
 └── main.jsx         # Target entry mounting React virtual DOM
```

---

## ⚙️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build Production Bundle
```bash
npm run build
```
Vite will compile and optimize assets into the `dist/` directory.

---

## 📧 Google Form & Email Automation

The email dispatch is handled by Google Apps Script triggered automatically by Google Forms spreadsheet submissions.
- Full Apps Script Code: See `google-apps-script/google-apps-script.js`.
- Step-by-step setup: See the [Google Sheets Setup Guide](file:///e:/COdeNixxx/Confrence/google-apps-script/GOOGLE_SHEET_SETUP.md).

---

## 📄 License & Ownership
Copyright © 2026 Indian Academy of Pediatrics (IAP) Jamshedpur Branch. Built for medical education and pediatric advancement.
