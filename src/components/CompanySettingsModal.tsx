import { useState } from 'react';
import type { CompanyProfile } from '../types/receipt';

interface CompanySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyProfile;
  onSave: (updated: CompanyProfile) => void;
}

export const CompanySettingsModal: React.FC<CompanySettingsModalProps> = ({
  isOpen,
  onClose,
  company,
  onSave,
}) => {
  const [profile, setProfile] = useState<CompanyProfile>(company);
  const [serviceInput, setServiceInput] = useState('');

  if (!isOpen) return null;

  const handleChange = (field: keyof CompanyProfile, value: unknown) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddService = () => {
    if (!serviceInput.trim()) return;
    setProfile((prev) => ({
      ...prev,
      services: [...prev.services, serviceInput.trim()],
    }));
    setServiceInput('');
  };

  const handleRemoveService = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profile);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-icon">⚙️</span>
            <div>
              <h3>Company & Receipt Settings</h3>
              <p>កែសម្រួលព័ត៌មានអាជីវកម្ម និងក្បាលវិក្កយបត្រ</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-grid-2">
            <div className="form-group">
              <label>Logo Badge (e.g. VIN, SRM)</label>
              <input
                type="text"
                value={profile.logoBadge}
                onChange={(e) => handleChange('logoBadge', e.target.value)}
                maxLength={6}
              />
            </div>
            <div className="form-group">
              <label>Phone Number / លេខទូរស័ព្ទ</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Khmer Company Name / ឈ្មោះអាជីវកម្ម (ភាសាខ្មែរ)</label>
            <input
              type="text"
              value={profile.companyKh}
              onChange={(e) => handleChange('companyKh', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>English Company Name / ឈ្មោះជាភាសាអង់គ្លេស</label>
            <input
              type="text"
              value={profile.companyEn}
              onChange={(e) => handleChange('companyEn', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Address / ទីតាំងអាសយដ្ឋាន</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>

          <div className="modal-grid-3">
            <div className="form-group">
              <label>Bank Name</label>
              <input
                type="text"
                value={profile.bankName}
                onChange={(e) => handleChange('bankName', e.target.value)}
                placeholder="ABA / ACLEDA"
              />
            </div>
            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                value={profile.bankAccount}
                onChange={(e) => handleChange('bankAccount', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Account Name</label>
              <input
                type="text"
                value={profile.accountName}
                onChange={(e) => handleChange('accountName', e.target.value)}
              />
            </div>
          </div>

          <div className="form-toggle-row">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={profile.showPromoBanner}
                onChange={(e) => handleChange('showPromoBanner', e.target.checked)}
              />
              <span className="toggle-text">
                បង្ហាញផ្ទាំងសេវាកម្ម (Show Promo Banner Header)
              </span>
            </label>
          </div>

          {profile.showPromoBanner && (
            <div className="promo-settings-box">
              <div className="form-group">
                <label>Promo Banner Title</label>
                <input
                  type="text"
                  value={profile.promoTitle}
                  onChange={(e) => handleChange('promoTitle', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Services Tags / ស្លាកសេវាកម្ម</label>
                <div className="services-tag-input">
                  <input
                    type="text"
                    value={serviceInput}
                    onChange={(e) => setServiceInput(e.target.value)}
                    placeholder="បញ្ចូលសេវា រួចចុច Add (ឧទាហរណ៍: 🎧 ឌឺជេ)..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddService();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="add-service-btn"
                  >
                    + Add
                  </button>
                </div>
                <div className="tags-chips-container">
                  {profile.services.map((srv, idx) => (
                    <span key={idx} className="tag-chip">
                      {srv}
                      <button
                        type="button"
                        onClick={() => handleRemoveService(idx)}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Footer Notice / កំណត់សម្គាល់ផ្នែកខាងក្រោម</label>
            <input
              type="text"
              value={profile.footerNotice}
              onChange={(e) => handleChange('footerNotice', e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              💾 រក្សាទុក (Save Changes)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
