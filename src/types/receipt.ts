export interface InvoiceItem {
  id: string;
  description: string;
  qty: number | string;
  unitPrice: number | string;
  total: number | string;
}

export interface CompanyProfile {
  logoBadge: string;
  companyKh: string;
  companyEn: string;
  phone: string;
  address: string;
  bankName: string;
  bankAccount: string;
  accountName: string;
  showPromoBanner: boolean;
  promoTitle: string;
  promoTagline: string;
  promoPriceTag: string;
  services: string[];
  footerNotice: string;
}

export interface InvoiceData {
  invoiceNo: string;
  date: string;
  customerName: string;
  phoneNumber: string;
  businessType: string;
  eventLocation: string;
  paymentMethod: string;
  items: InvoiceItem[];
  discount: number | string;
  deposit: number | string;
  note: string;
  currency: 'USD' | 'KHR';
  exchangeRate: number; // e.g. 4100
}
