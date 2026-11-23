# LADY NAYRA Billing Pro

Original billing/POS/inventory application for Android and Windows.

## Features
- Dashboard
- Fast POS / New Sale
- Cash, UPI, Card and Credit payments
- Invoice printing
- Item master and stock
- Customers
- Purchases
- Expenses
- Sales and profit reports
- Business/GST/invoice settings
- JSON backup and restore
- Offline-first local storage

## Windows
npm install
npm run build:win

## Android
npm install
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug

GitHub Actions already contains separate Windows and Android workflows.
