import React from 'react';

interface HeaderProps {
  viewMode: 'mobile' | 'a4';
  setViewMode: (mode: 'mobile' | 'a4') => void;
  onPrint: () => void;
  onSaveImage: () => void;
  onOpenSettings: () => void;
  onLoadSample: () => void;
  onClear: () => void;
  isSavingImage: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  onPrint,
  onSaveImage,
  onOpenSettings,
  onLoadSample,
  onClear,
  isSavingImage,
}) => {
  return (
    <header className="app-topbar no-print">
      <div className="topbar-left">
        <div className="topbar-logo-badge">
          <span>🧾</span>
        </div>
        <div>
          <h1 className="topbar-title">Receipt & Invoice Studio</h1>
          <p className="topbar-subtitle">
            កម្មវិធីបង្កើត និងបោះពុម្ពវិក្កយបត្រ (Khmer & English)
          </p>
        </div>
      </div>

      <div className="topbar-center">
        <div className="view-mode-toggle" role="tablist">
          <button
            type="button"
            className={`view-btn ${viewMode === 'mobile' ? 'active' : ''}`}
            onClick={() => setViewMode('mobile')}
            title="Mobile slip receipt view (390px)"
          >
            📱 Mobile Slip
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === 'a4' ? 'active' : ''}`}
            onClick={() => setViewMode('a4')}
            title="Standard A4 sheet layout"
          >
            📄 A4 Paper
          </button>
        </div>
      </div>

      <div className="topbar-right">
        <button
          type="button"
          className="topbar-btn secondary"
          onClick={onLoadSample}
          title="Load default sample data"
        >
          ✨ Sample
        </button>
        <button
          type="button"
          className="topbar-btn secondary"
          onClick={onClear}
          title="Reset all form fields"
        >
          🧹 Clear
        </button>
        <button
          type="button"
          className="topbar-btn secondary"
          onClick={onOpenSettings}
          title="Customize Store & Company Details"
        >
          ⚙️ Settings
        </button>
        <button
          type="button"
          className="topbar-btn success"
          onClick={onSaveImage}
          disabled={isSavingImage}
          title="Download receipt as JPG image"
        >
          {isSavingImage ? '⏳ Saving...' : '🖼️ Save Image'}
        </button>
        <button
          type="button"
          className="topbar-btn primary"
          onClick={onPrint}
          title="Print or Save as PDF"
        >
          🖨️ Print / PDF
        </button>
      </div>
    </header>
  );
};
