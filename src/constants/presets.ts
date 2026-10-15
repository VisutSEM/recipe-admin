import type { CompanyProfile, InvoiceData } from '../types/receipt';

export const defaultCompany: CompanyProfile = {
  logoBadge: 'NIN',
  companyKh: 'Nin',
  companyEn: 'NIN LIGHTING SOUND',
  phone: '011 300 839',
  address: 'ភូមិវិហារចិន សង្កាត់ស្វាយដង្គំ ស្រុកសៀមរាប ខេត្តសៀមរាប',
  bankName: 'ABA',
  bankAccount: '009999230',
  accountName: '',
  showPromoBanner: true,
  promoTitle: 'Nin Lighting Sound',
  promoTagline: 'យើងខ្ញុំមានទទួលរៀបចំដូចជា',
  promoPriceTag: '✨ តម្លៃសមរម្យ ✨',
  services: [
    '🎤 មេក្រូធុងបាស',
    '🎹 អកកេះ',
    '🎸 អកកាដង់',
    '🎧 ឌឺជេ',
    '💨 ផ្សែងពពក',
    '💡 ភ្លើងពណ៌',
    '🎪 ឆាក',
    '⚡ ម៉ាស៊ីនភ្លើង',
  ],
  footerNotice: '* សូមអរគុណ! ព្រោះការទូទាត់ប្រាក់រួចហើយ ទំនិញមិនអាចផ្លាស់ប្ដូរបានទេ។',
};

export const initialInvoiceData: InvoiceData = {
  invoiceNo: '056',
  date: new Date().toISOString().split('T')[0],
  customerName: 'សុខ វិបុល',
  phoneNumber: '096 9999 230',
  businessType: 'ពិធីមង្គលការ (Wedding Reception)',
  eventLocation: 'ភូមិបន្ទាយចាស់ ក្រុងសៀមរាប',
  paymentMethod: 'ABA Transfer',
  items: [
    {
      id: 'item-1',
      description: 'ឈុតមេក្រូធុងបាស JBL Line Array (Sound Set)',
      qty: 1,
      unitPrice: 280,
      total: 280,
    },
    {
      id: 'item-2',
      description: 'ភ្លើងពណ៌ឆាក និងអំពូល Beam 380W Moving Head',
      qty: 1,
      unitPrice: 120,
      total: 120,
    },
    {
      id: 'item-3',
      description: 'ផ្សែងពពក Dry Ice Low Fog Effect',
      qty: 2,
      unitPrice: 35,
      total: 70,
    },
  ],
  discount: 20,
  deposit: 150,
  note: 'ឧបករណ៍រៀបចំម៉ោង 13:00 រសៀល។ រួមបញ្ចូលទាំងបុគ្គលិកបច្ចេកទេសសំឡេង និងភ្លើង 2 នាក់។',
  currency: 'USD',
  exchangeRate: 4100,
};

export const commonItemsSuggestions = [
  { name: 'ឈុតមេក្រូធុងបាស Sound System', price: 250 },
  { name: 'ភ្លើងពណ៌ Beam & Par LED', price: 120 },
  { name: 'ផ្សែងពពក Low Fog Smoke', price: 50 },
  { name: 'តន្រ្តីអកកេះ Live Band', price: 350 },
  { name: 'ម៉ាស៊ីនភ្លើង Generator 50kVA', price: 80 },
  { name: 'មេក្រូឥតខ្សែ Wireless Mic Shure', price: 25 },
  { name: 'ឆាកតន្ត្រី Truss Stage 6x4m', price: 150 },
  { name: 'អេក្រង់ LED Screen P3 3x4m', price: 400 },
];
