import React from 'react';
import type { CompanyProfile, InvoiceData, InvoiceItem } from '../types/receipt';
import { commonItemsSuggestions } from '../constants/presets';
import { AdSenseBanner } from './AdSenseBanner';

interface FormEditorProps {
  form: InvoiceData;
  setForm: React.Dispatch<React.SetStateAction<InvoiceData>>;
  company: CompanyProfile;
  setCompany: React.Dispatch<React.SetStateAction<CompanyProfile>>;
  qrImage: string | null;
  setQrImage: React.Dispatch<React.SetStateAction<string | null>>;
  onPrint: () => void;
  onSaveImage: () => void;
  isSavingImage: boolean;
  onOpenSettings: () => void;
}

export const FormEditor: React.FC<FormEditorProps> = ({
  form,
  setForm,
  company,
  setCompany,
  qrImage,
  setQrImage,
  onPrint,
  onSaveImage,
  isSavingImage,
  onOpenSettings,
}) => {
  const handleChange = (field: keyof InvoiceData, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCompanyChange = (field: keyof CompanyProfile, value: unknown) => {
    setCompany((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const updated = [...form.items];
    const current = { ...updated[index], [field]: value };

    // Auto-calculate total
    if (field === 'qty' || field === 'unitPrice') {
      const q = field === 'qty' ? Number(value) : Number(current.qty);
      const p = field === 'unitPrice' ? Number(value) : Number(current.unitPrice);
      current.total = q && p ? Number((q * p).toFixed(2)) : '';
    }

    updated[index] = current;
    setForm((prev) => ({ ...prev, items: updated }));
  };

  const addItem = () => {
    setForm((prev) => {
      const newId = `item-${prev.items.length + 1}-${Math.floor(Math.random() * 10000)}`;
      const newItem: InvoiceItem = {
        id: newId,
        description: '',
        qty: 1,
        unitPrice: '',
        total: '',
      };
      return {
        ...prev,
        items: [...prev.items, newItem],
      };
    });
  };

  const removeItem = (index: number) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const addSuggestedItem = (name: string, price: number) => {
    setForm((prev) => {
      const newId = `item-${prev.items.length + 1}-${Math.floor(Math.random() * 10000)}`;
      const newItem: InvoiceItem = {
        id: newId,
        description: name,
        qty: 1,
        unitPrice: price,
        total: price,
      };
      return {
        ...prev,
        items: [...prev.items, newItem],
      };
    });
  };

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setQrImage(ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Calculations
  const subtotal = form.items.reduce(
    (acc, item) => acc + (Number(item.total) || 0),
    0
  );
  const discountAmt = Number(form.discount) || 0;
  const depositAmt = Number(form.deposit) || 0;
  const grandTotal = Math.max(0, subtotal - discountAmt);
  const remainingBalance = grandTotal - depositAmt;

  return (
    <aside className="form-panel no-print">
      <div className="form-header">
        <div className="form-logo" onClick={onOpenSettings} title="Click to customize">
          <span className="logo-srm">{company.logoBadge || 'NIN'}</span>
        </div>
        <div className="form-header-info">
          <h2 className="form-title">Invoice Editor</h2>
          <p className="form-subtitle">{company.companyKh || 'Nin Lighting Sound'}</p>
        </div>
        <button
          type="button"
          className="form-settings-icon-btn"
          onClick={onOpenSettings}
          title="Store Settings"
        >
          ⚙️
        </button>
      </div>

      {/* Invoice Details */}
      <section className="form-section">
        <h3 className="section-title">📋 ព័ត៌មានវិក្កយបត្រ (Invoice Details)</h3>
        <div className="form-grid-2">
          <div className="form-group">
            <label>Invoice No</label>
            <input
              type="text"
              value={form.invoiceNo}
              onChange={(e) => handleChange('invoiceNo', e.target.value)}
              placeholder="056"
            />
          </div>
          <div className="form-group">
            <label>កាលបរិច្ឆេទ (Date)</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Customer Information */}
      <section className="form-section">
        <h3 className="section-title">👤 ព័ត៌មានអតិថិជន (Customer Info)</h3>
        <div className="form-group">
          <label>Customer Name / ឈ្មោះអតិថិជន</label>
          <input
            type="text"
            value={form.customerName}
            onChange={(e) => handleChange('customerName', e.target.value)}
            placeholder="ឈ្មោះអតិថិជន..."
          />
        </div>
        <div className="form-group">
          <label>Phone Number / លេខទូរស័ព្ទ</label>
          <input
            type="text"
            value={form.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            placeholder="096 9999 230"
          />
        </div>
        <div className="form-group">
          <label>ប្រភេទតន្រ្តី / សេវាកម្ម (Business Type)</label>
          <input
            type="text"
            value={form.businessType}
            onChange={(e) => handleChange('businessType', e.target.value)}
            placeholder="ពិធីមង្គលការ, ភោជនីយដ្ឋាន..."
          />
        </div>
        <div className="form-group">
          <label>ទីតាំងប្រគុំ (Venue / Location)</label>
          <input
            type="text"
            value={form.eventLocation}
            onChange={(e) => handleChange('eventLocation', e.target.value)}
            placeholder="ភូមិ, ឃុំ, ស្រុក, ខេត្ត..."
          />
        </div>
        <div className="form-group">
          <label>វិធីសាស្ត្របង់ប្រាក់ (Payment Method)</label>
          <select
            value={form.paymentMethod}
            onChange={(e) => handleChange('paymentMethod', e.target.value)}
          >
            <option value="">-- ជ្រើសរើស --</option>
            <option value="សាច់ប្រាក់">សាច់ប្រាក់ (Cash)</option>
            <option value="បណ្តោល(Credit)">បណ្តោល (Credit)</option>
            <option value="ABA Transfer">ABA Transfer</option>
            <option value="ACLEDA Transfer">ACLEDA Transfer</option>
            <option value="Wing Transfer">Wing Transfer</option>
            <option value="TrueMoney">TrueMoney</option>
          </select>
        </div>
      </section>

      {/* Bank Account Details */}
      <section className="form-section">
        <div className="section-title-row">
          <h3 className="section-title">🏦 គណនីបង់ប្រាក់ (Bank Payment Details)</h3>
        </div>
        <div className="quick-chips" style={{ marginBottom: '10px' }}>
          <button
            type="button"
            className="chip-btn"
            onClick={() => {
              handleCompanyChange('bankName', 'ABA');
              handleCompanyChange('bankAccount', '009999230');
            }}
          >
            ⚡ ABA: 009999230
          </button>
          <button
            type="button"
            className="chip-btn"
            onClick={() => {
              handleCompanyChange('bankName', 'ABA');
              handleCompanyChange('bankAccount', '011 300 839');
            }}
          >
            ⚡ ABA: 011 300 839
          </button>
        </div>
        <div className="form-grid-2">
          <div className="form-group">
            <label>ធនាគារ (Bank Name)</label>
            <input
              type="text"
              value={company.bankName}
              onChange={(e) => handleCompanyChange('bankName', e.target.value)}
              placeholder="ABA, ACLEDA, Wing..."
            />
          </div>
          <div className="form-group">
            <label>លេខគណនី (Account No)</label>
            <input
              type="text"
              value={company.bankAccount}
              onChange={(e) => handleCompanyChange('bankAccount', e.target.value)}
              placeholder="009999230"
            />
          </div>
        </div>
        <div className="form-group">
          <label>ឈ្មោះម្ចាស់គណនី (Account Name - ស្រេចចិត្ត/Optional)</label>
          <input
            type="text"
            value={company.accountName}
            onChange={(e) => handleCompanyChange('accountName', e.target.value)}
            placeholder="ទុកទំនេរ បើមិនត្រូវការ (e.g. VANN VIN)"
          />
        </div>
      </section>

      {/* Items Section */}
      <section className="form-section">
        <div className="section-title-row">
          <h3 className="section-title">📦 បញ្ជីទំនិញ / Services</h3>
          <span className="items-count-badge">{form.items.length} មុខ</span>
        </div>

        {/* Quick Add Suggestions */}
        <div className="quick-suggestions-block">
          <span className="quick-label">⚡ បន្ថែមរហ័ស:</span>
          <div className="quick-chips">
            {commonItemsSuggestions.slice(0, 4).map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="chip-btn"
                onClick={() => addSuggestedItem(item.name, item.price)}
              >
                + {item.name.split(' ')[0]} (${item.price})
              </button>
            ))}
          </div>
        </div>

        <div className="items-header-row">
          <span>ការពិពណ៌នា</span>
          <span>ចំនួន</span>
          <span>តម្លៃ ($)</span>
          <span>សរុប ($)</span>
          <span></span>
        </div>

        <div className="items-list">
          {form.items.map((item, idx) => (
            <div key={item.id || idx} className="item-row">
              <input
                type="text"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(idx, 'description', e.target.value)
                }
                placeholder="ឈ្មោះទំនិញ ឬសេវា..."
                className="item-desc"
              />
              <input
                type="number"
                value={item.qty}
                onChange={(e) => handleItemChange(idx, 'qty', e.target.value)}
                placeholder="0"
                min="0"
                className="item-qty"
              />
              <input
                type="number"
                value={item.unitPrice}
                onChange={(e) =>
                  handleItemChange(idx, 'unitPrice', e.target.value)
                }
                placeholder="0.00"
                min="0"
                step="0.01"
                className="item-price"
              />
              <input
                type="number"
                value={item.total}
                readOnly
                placeholder="0.00"
                className="item-total-input"
              />
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeItem(idx)}
                title="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button type="button" className="add-item-btn" onClick={addItem}>
          + បន្ថែមទំនិញ (Add Item)
        </button>
      </section>

      {/* Totals & Notes */}
      <section className="form-section">
        <h3 className="section-title">💰 សង្ខេបសរុប (Summary & Payments)</h3>
        <div className="form-grid-2">
          <div className="form-group">
            <label>ការបញ្ចុះតម្លៃ / Discount ($)</label>
            <input
              type="number"
              value={form.discount}
              onChange={(e) => handleChange('discount', e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label>លុយកក់ / Deposit ($)</label>
            <input
              type="number"
              value={form.deposit}
              onChange={(e) => handleChange('deposit', e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Live Calculation Card */}
        <div className="calc-summary-card">
          <div className="calc-row">
            <span>សរុបរង (Subtotal):</span>
            <span className="calc-val">${subtotal.toFixed(2)}</span>
          </div>
          {discountAmt > 0 && (
            <div className="calc-row discount-row">
              <span>បញ្ចុះតម្លៃ (Discount):</span>
              <span className="calc-val">-${discountAmt.toFixed(2)}</span>
            </div>
          )}
          <div className="calc-row grand-row">
            <span>លុយសរុប (Grand Total):</span>
            <span className="calc-val grand">${grandTotal.toFixed(2)}</span>
          </div>
          <div className="calc-row deposit-row">
            <span>លុយកក់ (Deposit):</span>
            <span className="calc-val">${depositAmt.toFixed(2)}</span>
          </div>
          <div className="calc-row due-row">
            <span>នៅខ្វះ (Balance Due):</span>
            <span className="calc-val due">${remainingBalance.toFixed(2)}</span>
          </div>
        </div>

        <div className="form-group">
          <label>កំណត់ចំណាំ / Note</label>
          <textarea
            value={form.note}
            onChange={(e) => handleChange('note', e.target.value)}
            placeholder="កំណត់ចំណាំបន្ថែម (វេលារៀបចំ, ទីតាំង, លក្ខខណ្ឌ)..."
            rows={3}
          />
        </div>
      </section>

      {/* KHQR Code Section */}
      <section className="form-section">
        <h3 className="section-title">📱 KHQR / Bank QR Code</h3>
        <div className="qr-upload-area">
          {qrImage ? (
            <div className="qr-preview-wrap">
              <img src={qrImage} alt="KHQR Preview" className="qr-preview-thumb" />
              <button
                type="button"
                className="qr-remove-btn"
                onClick={() => setQrImage(null)}
              >
                ✕ លុបចោល QR (Remove)
              </button>
            </div>
          ) : (
            <label className="qr-upload-label" htmlFor="qr-upload-input">
              <div className="qr-upload-icon">📷</div>
              <div className="qr-upload-text">ចុចដើម្បីផ្ទុក QR Code (Upload KHQR)</div>
              <div className="qr-upload-hint">គាំទ្ររូបភាព PNG, JPG</div>
            </label>
          )}
          <input
            id="qr-upload-input"
            type="file"
            accept="image/*"
            onChange={handleQrUpload}
            style={{ display: 'none' }}
          />
        </div>
      </section>

      {/* AdSense Unit in Editor Panel */}
      <AdSenseBanner className="sidebar-adsense" format="auto" />

      {/* Sticky Bottom Actions */}
      <div className="action-buttons no-print">
        <button
          type="button"
          className="print-btn primary-print"
          onClick={onPrint}
        >
          🖨️ Print / Save as PDF
        </button>
        <button
          type="button"
          className="print-btn image-save"
          onClick={onSaveImage}
          disabled={isSavingImage}
        >
          {isSavingImage ? '⏳ កំពុងទាញយក...' : '🖼️ ទាញយករូបភាព (JPG)'}
        </button>
      </div>
    </aside>
  );
};
