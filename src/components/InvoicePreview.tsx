import React from 'react';
import type { CompanyProfile, InvoiceData } from '../types/receipt';

interface InvoicePreviewProps {
  form: InvoiceData;
  company: CompanyProfile;
  qrImage: string | null;
  viewMode: 'mobile' | 'a4';
  printRef: React.RefObject<HTMLDivElement | null>;
  onUploadQrClick?: () => void;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  form,
  company,
  qrImage,
  viewMode,
  printRef,
  onUploadQrClick,
}) => {
  const formatCurrency = (val: number | string | undefined) => {
    if (val === undefined || val === null || val === '') return '-';
    const num = Number(val);
    if (isNaN(num)) return '-';
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const subtotal = form.items.reduce(
    (acc, item) => acc + (Number(item.total) || 0),
    0
  );
  const discountAmt = Number(form.discount) || 0;
  const depositAmt = Number(form.deposit) || 0;
  const grandTotal = Math.max(0, subtotal - discountAmt);
  const remainingBalance = grandTotal - depositAmt;

  const [yearStr, monthStr, dayStr] = (form.date || '').split('-');
  const day = dayStr ? parseInt(dayStr, 10) : 20;
  const month = monthStr ? parseInt(monthStr, 10) : 8;
  const year = yearStr ? parseInt(yearStr, 10) : 2026;
  const formattedDateStr = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;

  return (
    <div className={`preview-panel mode-${viewMode}`}>
      <div className="preview-label no-print">
        <span>Live Preview • {viewMode === 'mobile' ? 'Mobile Slip (390px)' : 'A4 Document'}</span>
      </div>

      <div
        className={`invoice ${viewMode === 'a4' ? 'invoice-a4' : 'invoice-mobile'}`}
        ref={printRef}
        id="invoice-print"
      >
        {/* Header Block */}
        <div className="inv-header">
          <div className="inv-logo-block">
            <div className="inv-logo-box">
              <span className="inv-logo-srm">{company.logoBadge || 'NIN'}</span>
              <span className="inv-logo-sub">{company.companyEn || 'NIN LIGHTING SOUND'}</span>
            </div>
            <div className="inv-company-info">
              <div className="inv-company-kh">{company.companyKh || 'Nin'}</div>
              <div className="inv-company-en">{company.companyEn || 'NIN LIGHTING SOUND'}</div>
            </div>
          </div>
          <div className="inv-title-block">
            <div className="inv-title">INVOICE</div>
          </div>
        </div>

        {/* Promo Banner */}
        {company.showPromoBanner && (
          <div className="inv-promo-banner">
            <div className="inv-promo-title">{company.promoTitle || 'Nin Lighting Sound'}</div>
            <div className="inv-promo-tagline">{company.promoTagline || 'យើងខ្ញុំមានទទួលរៀបចំដូចជា'}</div>
            <div className="inv-promo-services">
              {company.services.map((srv, idx) => (
                <span key={idx} className="inv-promo-service">
                  {srv}
                </span>
              ))}
            </div>
            <div className="inv-promo-price">{company.promoPriceTag || '✨ តម្លៃសមរម្យ ✨'}</div>
            <div className="inv-promo-contact">
              <span>📞</span>
              <span className="inv-promo-phone">{company.phone || '011 300 839'}</span>
              {/* <span>❤️ 🙏 🌺</span> */}
            </div>
          </div>
        )}

        {/* Contact Details & Metadata */}
        <div className="inv-contact">
          <div className="inv-contact-left">
            <div>
              <span className="contact-icon">📞</span> {company.phone || '011 300 839'}
            </div>
            <div className="inv-contact-address">
              <span className="contact-icon">📍</span> {company.address || 'ភូមិវិហារចិន សង្កាត់ស្វាយដង្គំ ស្រុកសៀមរាប ខេត្តសៀមរាប'}
            </div>
            {(company.bankAccount || company.bankName || company.accountName) && (
              <div>
                <span className="contact-icon">🏦</span>{' '}
                {company.bankName ? `${company.bankName}: ` : 'Bank: '}
                {company.bankAccount || '___________'}
                {company.accountName ? ` (${company.accountName})` : ''}
              </div>
            )}
          </div>
          <div className="inv-meta">
            <div className="inv-meta-row">
              <span className="inv-meta-label">Invoice No</span>
              <span className="inv-meta-dots">:</span>
              <span className="inv-meta-value inv-no">{form.invoiceNo || '___'}</span>
            </div>
            <div className="inv-meta-row">
              <span className="inv-meta-label">Customer Name</span>
              <span className="inv-meta-dots">:</span>
              <span className="inv-meta-value">{form.customerName || '___________'}</span>
            </div>
            <div className="inv-meta-row">
              <span className="inv-meta-label">Phone Number</span>
              <span className="inv-meta-dots">:</span>
              <span className="inv-meta-value">{form.phoneNumber || '___________'}</span>
            </div>
          </div>
        </div>

        {/* Event / Service Info Table */}
        {(form.businessType || form.date || form.eventLocation || form.paymentMethod) && (
          <div className="inv-info-table">
            {form.businessType && (
              <div className="inv-info-row">
                <div className="inv-info-cell label-cell">ប្រភេទតន្រ្តី / សេវា</div>
                <div className="inv-info-cell value-cell">{form.businessType}</div>
              </div>
            )}
            {form.date && (
              <div className="inv-info-row">
                <div className="inv-info-cell label-cell">កាលបរិច្ឆេទ</div>
                <div className="inv-info-cell value-cell">{formattedDateStr}</div>
              </div>
            )}
            {form.eventLocation && (
              <div className="inv-info-row">
                <div className="inv-info-cell label-cell">ទីតាំងប្រគុំ</div>
                <div className="inv-info-cell value-cell">{form.eventLocation}</div>
              </div>
            )}
            {form.paymentMethod && (
              <div className="inv-info-row">
                <div className="inv-info-cell label-cell">វិធីសាស្ត្របង់ប្រាក់</div>
                <div className="inv-info-cell value-cell">{form.paymentMethod}</div>
              </div>
            )}
          </div>
        )}

        {/* Line Items Table */}
        <table className="inv-items-table">
          <thead>
            <tr>
              <th className="col-no">ល.រ</th>
              <th className="col-desc">ការពិពណ៌នា / Description</th>
              <th className="col-qty">ចំនួន</th>
              <th className="col-price">តម្លៃ ($)</th>
              <th className="col-total">សរុប ($)</th>
            </tr>
          </thead>
          <tbody>
            {form.items.length === 0 ? (
              <tr className="empty-row">
                <td className="col-no">-</td>
                <td className="col-desc" style={{ color: '#aaa', fontStyle: 'italic' }}>
                  មិនទាន់មានទំនិញ (No items added)
                </td>
                <td className="col-qty">-</td>
                <td className="col-price">-</td>
                <td className="col-total">-</td>
              </tr>
            ) : (
              form.items.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td className="col-no">{idx + 1}</td>
                  <td className="col-desc">{item.description || '-'}</td>
                  <td className="col-qty">{item.qty || '-'}</td>
                  <td className="col-price">{formatCurrency(item.unitPrice)}</td>
                  <td className="col-total">{formatCurrency(item.total)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Invoice Footer Area */}
        <div className="inv-footer">
          <div className="inv-footer-left">
            {/* Simple QR */}
            <div className="simple-qr-box">
              {qrImage ? (
                <img src={qrImage} alt="QR Code" className="simple-qr-img" />
              ) : (
                <label
                  htmlFor="qr-upload-input"
                  className="simple-qr-upload-prompt no-print"
                  onClick={onUploadQrClick}
                  title="Upload Bank QR Code"
                >
                  <div className="simple-qr-upload-prompt-icon">📷</div>
                  <div className="simple-qr-upload-prompt-text">ផ្ទុក QR</div>
                  <span className="simple-qr-upload-sub">Scan to Pay</span>
                </label>
              )}
            </div>

            {form.note && (
              <div className="inv-note">
                <strong>* កំណត់ចំណាំ:</strong> {form.note}
              </div>
            )}
          </div>

          <div className="inv-summary">
            <div className="inv-summary-title">សង្ខេបសរុប</div>
            <div className="inv-summary-row">
              <span>សរុបរង (Subtotal)</span>
              <span>${formatCurrency(subtotal)}</span>
            </div>
            {discountAmt > 0 && (
              <div className="inv-summary-row discount">
                <span>បញ្ចុះតម្លៃ (Discount)</span>
                <span>-${formatCurrency(discountAmt)}</span>
              </div>
            )}
            <div className="inv-summary-row grand">
              <span>លុយសរុប (Total)</span>
              <span>${formatCurrency(grandTotal)}</span>
            </div>
            <div className="inv-summary-row">
              <span>លុយកក់ (Deposit)</span>
              <span>${formatCurrency(depositAmt)}</span>
            </div>
            <div className="inv-summary-row balance-due">
              <span>លុយត្រូវបង់ (Balance Due)</span>
              <span>${formatCurrency(remainingBalance)}</span>
            </div>

            <div className="inv-sign-block">
              <p>
                សៀមរាប, ថ្ងៃ {String(day).padStart(2, '0')} ខែ {String(month).padStart(2, '0')} ឆ្នាំ {year}
              </p>
              <p className="sign-label">ហត្ថលេខា និងឈ្មោះអ្នកទទួល</p>
              <div className="sign-line"></div>
            </div>
          </div>
        </div>

        {/* Bottom Guarantee / Notice */}
        <div className="inv-footer-note">
          {company.footerNotice || '* សូមអរគុណ! ព្រោះការទូទាត់ប្រាក់រួចហើយ ទំនិញមិនអាចផ្លាស់ប្ដូរបានទេ។'}
        </div>
      </div>
    </div>
  );
};
