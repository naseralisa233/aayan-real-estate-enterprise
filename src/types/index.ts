export type UserRole = 
  | 'super_admin' 
  | 'office_manager' 
  | 'agent' 
  | 'accountant' 
  | 'maintenance' 
  | 'customer';

export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  branchId: string;
  branchName: string;
  status: UserStatus;
  permissions: string[];
  lastLogin: string;
  createdAt: string;
}

export type PropertyType = 
  | 'شقة' 
  | 'فيلا' 
  | 'بيت' 
  | 'أرض' 
  | 'مكتب' 
  | 'محل تجاري' 
  | 'مستودع' 
  | 'عمارة' 
  | 'مجمع سكني' 
  | 'مزرعة' 
  | 'فندق';

export type PropertyPurpose = 'للبيع' | 'للإيجار' | 'للاستثمار' | 'للمزاد';

export type PropertyStatus = 'متاح' | 'محجوز' | 'مباع' | 'مؤجر' | 'غير نشط' | 'تحت الصيانة';

export interface PropertyLocation {
  country: string;
  city: string;
  district: string;
  street: string;
  lat: number;
  lng: number;
}

export interface PropertyMedia {
  id: string;
  type: 'image' | 'video' | 'pdf';
  url: string;
  title: string;
  isMain?: boolean;
}

export interface PropertyDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Property {
  id: string;
  referenceNumber: string;
  title: string;
  type: PropertyType;
  purpose: PropertyPurpose;
  description: string;
  price: number;
  currency: string;
  area: number; // m²
  rooms: number;
  bathrooms: number;
  floors: number;
  finishType: string;
  features: string[];
  status: PropertyStatus;
  location: PropertyLocation;
  ownerName: string;
  ownerPhone: string;
  agentId: string;
  agentName: string;
  branchId: string;
  media: PropertyMedia[];
  documents: PropertyDocument[];
  viewsCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
}

export type CustomerType = 'buyer' | 'tenant' | 'owner' | 'investor' | 'seller' | 'lead';
export type CustomerStatus = 'new' | 'active' | 'interested' | 'negotiating' | 'permanent' | 'inactive' | 'closed';

export interface CustomerPreferences {
  propertyType: PropertyType;
  purpose: PropertyPurpose;
  city: string;
  district: string;
  maxBudget: number;
  minArea: number;
  rooms: number;
  features: string[];
}

export interface CustomerActivity {
  id: string;
  type: 'call' | 'message' | 'email' | 'meeting' | 'viewing' | 'note';
  employeeName: string;
  description: string;
  result: string;
  date: string;
}

export interface CustomerNote {
  id: string;
  author: string;
  text: string;
  isPrivate: boolean;
  date: string;
}

export interface Customer {
  id: string;
  fullName: string;
  avatar: string;
  phone: string;
  email: string;
  type: CustomerType;
  status: CustomerStatus;
  source: string;
  address: string;
  city: string;
  assignedAgentId: string;
  assignedAgentName: string;
  tags: string[];
  preferences: CustomerPreferences;
  activities: CustomerActivity[];
  notes: CustomerNote[];
  createdAt: string;
}

export type LeadStage = 
  | 'new_lead' 
  | 'contacted' 
  | 'interested' 
  | 'property_viewing' 
  | 'negotiation' 
  | 'offer_sent' 
  | 'converted' 
  | 'lost';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  status: LeadStage;
  budget: number;
  requirements: string;
  preferredCity: string;
  assignedAgentId: string;
  assignedAgentName: string;
  score: number; // 0 - 100
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
  notes: string;
  createdAt: string;
}

export interface FollowUp {
  id: string;
  leadId?: string;
  customerId?: string;
  customerName: string;
  agentName: string;
  date: string;
  status: 'معلقة' | 'مكتملة' | 'ملغاة';
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
  notes: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  propertyTitle: string;
  agentName: string;
  date: string;
  time: string;
  location: string;
  status: 'مؤكد' | 'قيد الانتظار' | 'مكتمل' | 'ملغى';
  notes: string;
}

export interface Viewing {
  id: string;
  customerName: string;
  propertyTitle: string;
  agentName: string;
  date: string;
  result: 'مهتم جدًا' | 'يفكر' | 'غير مناسب' | 'تم تقديم عرض';
  feedback: string;
}

export type DealType = 'sale' | 'rental' | 'investment';
export type DealStage = 
  | 'new' 
  | 'qualification' 
  | 'property_selected' 
  | 'viewing_completed' 
  | 'negotiation' 
  | 'offer_submitted' 
  | 'approved' 
  | 'contract_pending' 
  | 'completed' 
  | 'cancelled';

export interface Offer {
  id: string;
  dealId: string;
  amount: number;
  conditions: string;
  status: 'مقبول' | 'مرفوض' | 'قيد النظر';
  expiryDate: string;
}

export interface Deal {
  id: string;
  dealNumber: string;
  type: DealType;
  propertyTitle: string;
  propertyPrice: number;
  customerName: string;
  ownerName: string;
  agentName: string;
  amount: number;
  currency: string;
  stage: DealStage;
  commissionPercentage: number;
  commissionAmount: number;
  offers: Offer[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type ContractType = 'عقد بيع' | 'عقد إيجار' | 'عقد استثمار' | 'عقد إدارة عقار';
export type ContractStatus = 'مسودة' | 'قيد المراجعة' | 'موافق عليه' | 'بانتظار التوقيع' | 'موقع' | 'نشط' | 'منتهي' | 'ملغى';

export interface ContractSignature {
  party: 'المالك' | 'العميل' | 'الوسيط';
  name: string;
  signedAt: string;
  ipAddress: string;
  signatureImage?: string;
}

export interface Contract {
  id: string;
  contractNumber: string;
  type: ContractType;
  dealId?: string;
  propertyTitle: string;
  customerName: string;
  ownerName: string;
  startDate: string;
  endDate: string;
  amount: number;
  status: ContractStatus;
  terms: string;
  signatures: ContractSignature[];
  pdfUrl?: string;
  createdAt: string;
}

export type InvoiceStatus = 'مسودة' | 'معلقة' | 'مدفوعة' | 'مدفوعة جزئياً' | 'متأخرة' | 'ملغاة';
export type InvoiceType = 'فاتورة بيع' | 'فاتورة إيجار' | 'فاتورة عمولة' | 'فاتورة صيانة' | 'فاتورة خدمات' | 'فاتورة مصروف';

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: 'نقدي' | 'تحويل بنكي' | 'بطاقة' | 'شيك';
  reference: string;
  date: string;
  status: 'مكتمل' | 'معلق';
}

export interface Installment {
  id: string;
  invoiceId: string;
  amount: number;
  dueDate: string;
  status: 'مدفوع' | 'معلق' | 'متأخر';
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  type: InvoiceType;
  customerName: string;
  propertyTitle: string;
  amount: number;
  discount: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  date: string;
  dueDate: string;
  payments: Payment[];
  installments: Installment[];
}

export interface Expense {
  id: string;
  category: 'رواتب' | 'إيجار مكتب' | 'تسويق' | 'صيانة' | 'خدمات' | 'مصاريف تشغيلية';
  amount: number;
  description: string;
  date: string;
  createdBy: string;
}

export type MaintenancePriority = 'منخفضة' | 'متوسطة' | 'عالية' | 'طارئة';
export type MaintenanceStatus = 'جديد' | 'معين' | 'قيد التنفيذ' | 'بانتظار قطع' | 'مكتمل' | 'مرفوض';

export interface Technician {
  id: string;
  name: string;
  phone: string;
  specialization: string;
  rating: number;
  status: 'متاح' | 'مشغول' | 'غير نشط';
}

export interface MaintenanceRequest {
  id: string;
  requestNumber: string;
  propertyTitle: string;
  customerName: string;
  type: 'كهرباء' | 'سباكة' | 'تكييف' | 'أجهزة' | 'دهان' | 'تنظيف' | 'أمن' | 'عامة';
  description: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  technicianName?: string;
  cost: number;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type: 'property' | 'customer' | 'deal' | 'contract' | 'payment' | 'maintenance' | 'system';
  isRead: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  attachments?: string[];
  status: 'sending' | 'sent' | 'delivered' | 'read';
  createdAt: string;
}

export interface WorkflowRule {
  id: string;
  name?: string;
  title: string;
  event?: string;
  trigger: string;
  condition: string;
  action: string;
  enabled?: boolean;
  isActive: boolean;
  executionCount?: number;
  lastRun?: string;
}

export interface AuditLog {
  id: string;
  userName: string;
  action: string;
  module: string;
  details: string;
  ip: string;
  device: string;
  createdAt: string;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  managerName: string;
  employeeCount?: number;
  employeesCount?: number;
  propertiesCount?: number;
  revenue?: number;
  status: 'نشط' | 'مغلق';
  phone?: string;
}

export interface MarketingCampaign {
  id: string;
  title: string;
  platform: string;
  budget: number;
  clicks: number;
  conversions: number;
  status: string;
}

export interface AIInsight {
  id: string;
  title: string;
  message: string;
  type: 'sales' | 'pricing' | 'recommendation' | 'alert';
  priority: 'عالية' | 'متوسطة' | 'عادية';
  createdAt: string;
}
