# LADY NAYRA — Installation & Setup Guide

## 1. Run Locally (with Auto-PDF WhatsApp Backend)
```bash
npm install
npm start
```
Open `http://localhost:3000` in Chrome or Edge.

## 2. Install on Android Mobile & Windows (PWA - Simplest)
- Upload `index.html`, `manifest.json`, and `sw.js` to any free HTTPS host (Netlify, Vercel, or GitHub Pages).
- **Android Chrome:** Open the link -> tap **Menu (⋮)** -> **Add to Home screen / Install app**.
- **Windows 7+ Chrome:** Open the link -> **Menu (⋮)** -> **Save and share** -> **Create shortcut (Open as window)**.

## 3. Build Windows 7 & Above `.exe` Installer
Uses Electron 22 (supports Windows 7, 8, 10, 11):
```bash
npm install
npm run build:win7
```
Find your `.exe` installer inside the `dist/` folder.

## 4. Build Android `.apk`
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap add android
npx cap open android
```
Then click **Build -> Build APK(s)** in Android Studio.
