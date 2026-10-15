import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import type { CompanyProfile, InvoiceData } from './types/receipt';
import { defaultCompany, initialInvoiceData } from './constants/presets';
import { Header } from './components/Header';
import { FormEditor } from './components/FormEditor';
import { InvoicePreview } from './components/InvoicePreview';
import { CompanySettingsModal } from './components/CompanySettingsModal';
import './App.css';

export default function App() {
  const [form, setForm] = useState<InvoiceData>(() => {
    const saved = localStorage.getItem('receipt_form_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return initialInvoiceData;
  });

  const [company, setCompany] = useState<CompanyProfile>(() => {
    const saved = localStorage.getItem('receipt_company_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed.companyKh === 'ហ៊ាវិន តន្រ្តី' ||
          parsed.promoTitle === 'ហ៊ាវិន តន្រ្តី ក្រុងសៀមរាប' ||
          parsed.companyEn === 'VINN RICKY SOUND'
        ) {
          return {
            ...parsed,
            logoBadge: parsed.logoBadge === 'VIN' ? 'NIN' : parsed.logoBadge,
            companyKh: 'Nin',
            phone: '011 300 839',
            address: 'ភូមិវិហារចិន សង្កាត់ស្វាយដង្គំ ស្រុកសៀមរាប ខេត្តសៀមរាប',
            companyEn: 'NIN LIGHTING SOUND',
            promoTitle: 'Nin Lighting Sound',
          };
        }
        if (
          parsed.phone === '096 585 4902' ||
          parsed.companyKh === 'Nin Lighting Sound' ||
          parsed.bankAccount === '011 300 839' ||
          parsed.address?.includes('Banteaychuer')
        ) {
          return {
            ...parsed,
            phone: '011 300 839',
            companyKh: 'Nin',
            address: 'ភូមិវិហារចិន សង្កាត់ស្វាយដង្គំ ស្រុកសៀមរាប ខេត្តសៀមរាប',
            bankName: 'ABA',
            bankAccount: '009999230',
          };
        }
        return parsed;
      } catch {
        // ignore
      }
    }
    return defaultCompany;
  });

  const [qrImage, setQrImage] = useState<string | null>(() => {
    return localStorage.getItem('receipt_qr_image');
  });

  const [viewMode, setViewMode] = useState<'mobile' | 'a4'>('mobile');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const printRef = useRef<HTMLDivElement | null>(null);

  // Auto-save form data
  useEffect(() => {
    localStorage.setItem('receipt_form_data', JSON.stringify(form));
  }, [form]);

  // Auto-save company profile
  useEffect(() => {
    localStorage.setItem('receipt_company_profile', JSON.stringify(company));
  }, [company]);

  // Auto-save QR image
  useEffect(() => {
    if (qrImage) {
      localStorage.setItem('receipt_qr_image', qrImage);
    } else {
      localStorage.removeItem('receipt_qr_image');
    }
  }, [qrImage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveAsImage = async () => {
    if (!printRef.current) return;
    try {
      setIsSavingImage(true);
      showToast('កំពុងដំណើរការបង្កើតរូបភាព (Generating high-res image)...');

      const canvas = await html2canvas(printRef.current, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const image = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.href = image;
      link.download = `Invoice_${form.invoiceNo || 'Receipt'}_${form.customerName || 'NinLightingSound'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('✅ បានទាញយករូបភាពដោយជោគជ័យ! (Image Saved)');
    } catch (err) {
      console.error('Error saving image:', err);
      showToast('⚠️ មានបញ្ហាក្នុងការទាញយករូបភាព');
    } finally {
      setIsSavingImage(false);
    }
  };

  const handleLoadSample = () => {
    setForm(initialInvoiceData);
    setCompany(defaultCompany);
    showToast('✨ បានបញ្ចូលទិន្នន័យគំរូរួចរាល់! (Sample loaded)');
  };

  const handleClear = () => {
    if (window.confirm('តើអ្នកពិតជាចង់សម្អាតព័ត៌មានទាំងអស់មែនទេ? (Clear all fields?)')) {
      setForm({
        invoiceNo: String(Math.floor(100 + Math.random() * 900)),
        date: new Date().toISOString().split('T')[0],
        customerName: '',
        phoneNumber: '',
        businessType: '',
        eventLocation: '',
        paymentMethod: '',
        items: [
          {
            id: `item-${Date.now()}`,
            description: '',
            qty: 1,
            unitPrice: '',
            total: '',
          },
        ],
        discount: '',
        deposit: '',
        note: '',
        currency: 'USD',
        exchangeRate: 4100,
      });
      showToast('🧹 បានសម្អាតទិន្នន័យរួចរាល់ (Form cleared)');
    }
  };

  return (
    <div className="app-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="app-toast no-print" role="status">
          {toastMessage}
        </div>
      )}

      {/* Top Application Bar */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        onPrint={handlePrint}
        onSaveImage={handleSaveAsImage}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onLoadSample={handleLoadSample}
        onClear={handleClear}
        isSavingImage={isSavingImage}
      />

      {/* Main Workspace Layout */}
      <main className="app-wrapper">
        <FormEditor
          form={form}
          setForm={setForm}
          company={company}
          setCompany={setCompany}
          qrImage={qrImage}
          setQrImage={setQrImage}
          onPrint={handlePrint}
          onSaveImage={handleSaveAsImage}
          isSavingImage={isSavingImage}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <InvoicePreview
          form={form}
          company={company}
          qrImage={qrImage}
          viewMode={viewMode}
          printRef={printRef}
          onUploadQrClick={() => {
            const input = document.getElementById('qr-upload-input');
            input?.click();
          }}
        />
      </main>

      {/* Store Settings Modal */}
      <CompanySettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        company={company}
        onSave={(updated) => {
          setCompany(updated);
          showToast('💾 បានរក្សាទុកការកំណត់ហាងរួចរាល់! (Settings saved)');
        }}
      />
    </div>
  );
}
