# recipe-admin

Receipt & Invoice Studio for Nin Lighting Sound — Built with React, TypeScript, and Vite.

## Features

- 🧾 **Dual View Modes**: Mobile Slip (390px) & Full A4 printable sheet
- 📦 **Line Items Management**: Dynamic line items with auto-calculations (Quantity × Unit Price = Total)
- ⚡ **Quick Preset Suggestions**: One-click common event and service presets
- 💰 **Financial Summary**: Subtotal, Discount, Deposit (លុយកក់), and Remaining Balance (លុយត្រូវបង់)
- 🏦 **Bank Payment Integration**: Direct bank account configuration (ABA, ACLEDA, etc.) with real-time preview
- 📱 **KHQR Code Upload**: Custom QR code support with live rendering
- ⚙️ **Store & Brand Customizer**: Dynamic Khmer & English branding, custom services banner, and footer notices
- 🖨️ **Print & PDF Ready**: Clean `@media print` styling for high-resolution A4 printing
- 🖼️ **Image Export**: Save high-resolution receipts (.JPG) directly via `html2canvas`
- 💾 **Persistence**: Auto-saves form progress and company settings in `localStorage`

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```
