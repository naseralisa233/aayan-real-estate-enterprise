import { 
  User, Property, Customer, Lead, FollowUp, Appointment, Viewing, 
  Deal, Contract, Invoice, Expense, MaintenanceRequest, Technician, 
  NotificationItem, ChatMessage, WorkflowRule, AuditLog, Branch, AIInsight 
} from '../types';

import { 
  INITIAL_USERS, INITIAL_PROPERTIES, INITIAL_CUSTOMERS, INITIAL_LEADS, 
  INITIAL_FOLLOW_UPS, INITIAL_APPOINTMENTS, INITIAL_VIEWINGS, INITIAL_DEALS, 
  INITIAL_CONTRACTS, INITIAL_INVOICES, INITIAL_EXPENSES, INITIAL_MAINTENANCE_REQUESTS, 
  INITIAL_TECHNICIANS, INITIAL_NOTIFICATIONS, INITIAL_CHAT_MESSAGES, 
  INITIAL_WORKFLOW_RULES, INITIAL_AUDIT_LOGS, INITIAL_BRANCHES, INITIAL_AI_INSIGHTS 
} from '../data/seedData';

// Helper to handle local persistence fallback if backend API is offline or responding
function getStored<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(`aayan_${key}`);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setStored<T>(key: string, val: T): void {
  try {
    localStorage.setItem(`aayan_${key}`, JSON.stringify(val));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

export class ApiService {
  // Local reactive cache
  static users: User[] = getStored('users', INITIAL_USERS) || INITIAL_USERS;
  static properties: Property[] = getStored('properties', INITIAL_PROPERTIES) || INITIAL_PROPERTIES;
  static customers: Customer[] = getStored('customers', INITIAL_CUSTOMERS) || INITIAL_CUSTOMERS;
  static leads: Lead[] = getStored('leads', INITIAL_LEADS) || INITIAL_LEADS;
  static followUps: FollowUp[] = getStored('followups', INITIAL_FOLLOW_UPS) || INITIAL_FOLLOW_UPS;
  static appointments: Appointment[] = getStored('appointments', INITIAL_APPOINTMENTS) || INITIAL_APPOINTMENTS;
  static viewings: Viewing[] = getStored('viewings', INITIAL_VIEWINGS) || INITIAL_VIEWINGS;
  static deals: Deal[] = getStored('deals', INITIAL_DEALS) || INITIAL_DEALS;
  static contracts: Contract[] = getStored('contracts', INITIAL_CONTRACTS) || INITIAL_CONTRACTS;
  static invoices: Invoice[] = getStored('invoices', INITIAL_INVOICES) || INITIAL_INVOICES;
  static expenses: Expense[] = getStored('expenses', INITIAL_EXPENSES) || INITIAL_EXPENSES;
  static maintenance: MaintenanceRequest[] = getStored('maintenance', INITIAL_MAINTENANCE_REQUESTS) || INITIAL_MAINTENANCE_REQUESTS;
  static technicians: Technician[] = getStored('technicians', INITIAL_TECHNICIANS) || INITIAL_TECHNICIANS;
  static notifications: NotificationItem[] = getStored('notifications', INITIAL_NOTIFICATIONS) || INITIAL_NOTIFICATIONS;
  static chatMessages: ChatMessage[] = getStored('chat', INITIAL_CHAT_MESSAGES) || INITIAL_CHAT_MESSAGES;
  static workflows: WorkflowRule[] = getStored('workflows', INITIAL_WORKFLOW_RULES) || INITIAL_WORKFLOW_RULES;
  static auditLogs: AuditLog[] = getStored('audit', INITIAL_AUDIT_LOGS) || INITIAL_AUDIT_LOGS;
  static branches: Branch[] = getStored('branches', INITIAL_BRANCHES) || INITIAL_BRANCHES;
  static aiInsights: AIInsight[] = getStored('ai', INITIAL_AI_INSIGHTS) || INITIAL_AI_INSIGHTS;
  static favorites: string[] = getStored('favorites', ['p1', 'p2']) || ['p1', 'p2'];

  static currentUser: User = ApiService.users[0]; // Default Super Admin for demo, changeable in UI

  // Generic fetch helper to try server endpoint first, fallback to state
  private static async request<T>(endpoint: string, options?: RequestInit, fallbackData?: T): Promise<T> {
    try {
      const res = await fetch(`/api${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer fake_jwt_token_${ApiService.currentUser.id}`
        },
        ...options
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn(`API /api${endpoint} call offline, using stateful fallback:`, e);
    }
    if (fallbackData !== undefined) return fallbackData;
    throw new Error(`Failed to fetch from ${endpoint}`);
  }

  // --- MODULE 1: AUTH & USER MANAGEMENT ---
  static async login(phoneOrEmail: string, pass: string): Promise<User> {
    const user = ApiService.users.find(u => u.email === phoneOrEmail || u.phone === phoneOrEmail) || ApiService.users[0];
    ApiService.currentUser = user;
    return user;
  }

  static async getUsers(): Promise<User[]> {
    return ApiService.request<User[]>('/users', undefined, ApiService.users);
  }

  static async createUser(userData: Partial<User>): Promise<User> {
    const newUser: User = {
      id: `u${Date.now()}`,
      fullName: userData.fullName || 'مستخدم جديد',
      email: userData.email || 'user@aayan.sa',
      phone: userData.phone || '+966500000000',
      role: userData.role || 'agent',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      branchId: userData.branchId || 'b1',
      branchName: userData.branchName || 'فرع الرياض الرئيسي',
      status: 'active',
      permissions: userData.permissions || ['standard'],
      lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16),
      createdAt: new Date().toISOString().substring(0, 10)
    };
    ApiService.users = [newUser, ...ApiService.users];
    setStored('users', ApiService.users);
    return newUser;
  }

  // --- MODULE 2 & 15: REAL ESTATE & MARKETPLACE ---
  static async getProperties(): Promise<Property[]> {
    return ApiService.request<Property[]>('/properties', undefined, ApiService.properties);
  }

  static async createProperty(prop: Partial<Property>): Promise<Property> {
    const newProp: Property = {
      id: `p${Date.now()}`,
      referenceNumber: `PROP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      title: prop.title || 'عقار جديد',
      type: prop.type || 'فيلا',
      purpose: prop.purpose || 'للبيع',
      description: prop.description || 'وصف العقار التفصيلي',
      price: prop.price || 1500000,
      currency: prop.currency || 'SAR',
      area: prop.area || 350,
      rooms: prop.rooms || 4,
      bathrooms: prop.bathrooms || 4,
      floors: prop.floors || 2,
      finishType: prop.finishType || 'سوبر ديلوكس',
      features: prop.features || ['مصعد', 'موقف خاص'],
      status: 'متاح',
      location: prop.location || {
        country: 'السعودية',
        city: 'الرياض',
        district: 'النرجس',
        street: 'طريق المطار',
        lat: 24.8000,
        lng: 46.6500
      },
      ownerName: prop.ownerName || 'مالك العقار',
      ownerPhone: prop.ownerPhone || '+966500000000',
      agentId: ApiService.currentUser.id,
      agentName: ApiService.currentUser.fullName,
      branchId: ApiService.currentUser.branchId || 'b1',
      media: prop.media || [{ id: `m_${Date.now()}`, type: 'image', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200', title: 'صورة رئيسية', isMain: true }],
      documents: prop.documents || [],
      viewsCount: 1,
      rating: 5.0,
      createdAt: new Date().toISOString().substring(0, 10),
      updatedAt: new Date().toISOString().substring(0, 10)
    };
    ApiService.properties = [newProp, ...ApiService.properties];
    setStored('properties', ApiService.properties);
    return newProp;
  }

  static toggleFavorite(propertyId: string): string[] {
    if (ApiService.favorites.includes(propertyId)) {
      ApiService.favorites = ApiService.favorites.filter(id => id !== propertyId);
    } else {
      ApiService.favorites = [...ApiService.favorites, propertyId];
    }
    setStored('favorites', ApiService.favorites);
    return ApiService.favorites;
  }

  // --- MODULE 3 & 4: CRM, LEADS, FOLLOW-UPS & APPOINTMENTS ---
  static async getCustomers(): Promise<Customer[]> {
    return ApiService.request<Customer[]>('/customers', undefined, ApiService.customers);
  }

  static async getLeads(): Promise<Lead[]> {
    return ApiService.request<Lead[]>('/leads', undefined, ApiService.leads);
  }

  static async createLead(leadData: Partial<Lead>): Promise<Lead> {
    const newLead: Lead = {
      id: `l${Date.now()}`,
      name: leadData.name || 'عميل محتمل جديد',
      phone: leadData.phone || '+966500000000',
      email: leadData.email || 'lead@aayan.sa',
      source: leadData.source || 'تطبيق الجوال',
      status: 'new_lead',
      budget: leadData.budget || 2000000,
      requirements: leadData.requirements || 'طلب عقار جديد',
      preferredCity: leadData.preferredCity || 'الرياض',
      assignedAgentId: ApiService.currentUser.id,
      assignedAgentName: ApiService.currentUser.fullName,
      score: 75,
      priority: 'عالية',
      notes: leadData.notes || '',
      createdAt: new Date().toISOString().substring(0, 10)
    };
    ApiService.leads = [newLead, ...ApiService.leads];
    setStored('leads', ApiService.leads);
    return newLead;
  }

  static async convertLeadToCustomer(leadId: string): Promise<Customer> {
    const lead = ApiService.leads.find(l => l.id === leadId);
    if (!lead) throw new Error('Lead not found');

    const newCustomer: Customer = {
      id: `c${Date.now()}`,
      fullName: lead.name,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      phone: lead.phone,
      email: lead.email,
      type: 'buyer',
      status: 'active',
      source: lead.source,
      address: lead.preferredCity,
      city: lead.preferredCity,
      assignedAgentId: lead.assignedAgentId,
      assignedAgentName: lead.assignedAgentName,
      tags: ['متحول من Lead'],
      preferences: {
        propertyType: 'فيلا',
        purpose: 'للبيع',
        city: lead.preferredCity,
        district: 'عام',
        maxBudget: lead.budget,
        minArea: 300,
        rooms: 4,
        features: []
      },
      activities: [{ id: `act_${Date.now()}`, type: 'note', employeeName: ApiService.currentUser.fullName, description: 'تم تحويل العميل من Lead إلى عميل دائم', result: 'تم بنجاح', date: new Date().toISOString().substring(0, 10) }],
      notes: [{ id: `n_${Date.now()}`, author: ApiService.currentUser.fullName, text: lead.notes, isPrivate: false, date: new Date().toISOString().substring(0, 10) }],
      createdAt: new Date().toISOString().substring(0, 10)
    };

    ApiService.leads = ApiService.leads.filter(l => l.id !== leadId);
    ApiService.customers = [newCustomer, ...ApiService.customers];
    setStored('leads', ApiService.leads);
    setStored('customers', ApiService.customers);
    return newCustomer;
  }

  // --- MODULE 5 & 6: DEALS, CONTRACTS & DIGITAL SIGNATURES ---
  static async getDeals(): Promise<Deal[]> {
    return ApiService.request<Deal[]>('/deals', undefined, ApiService.deals);
  }

  static async createDeal(dealData: Partial<Deal>): Promise<Deal> {
    const newDeal: Deal = {
      id: `d${Date.now()}`,
      dealNumber: `DEAL-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      type: dealData.type || 'sale',
      propertyTitle: dealData.propertyTitle || 'فيلا حطين المودرن',
      propertyPrice: dealData.propertyPrice || 4850000,
      customerName: dealData.customerName || 'عبد العزيز الراجحي',
      ownerName: dealData.ownerName || 'الشيخ عبد الله الدوسري',
      agentName: ApiService.currentUser.fullName,
      amount: dealData.amount || 4750000,
      currency: 'SAR',
      stage: 'negotiation',
      commissionPercentage: 2.5,
      commissionAmount: ((dealData.amount || 4750000) * 2.5) / 100,
      offers: [],
      notes: dealData.notes || '',
      createdAt: new Date().toISOString().substring(0, 10),
      updatedAt: new Date().toISOString().substring(0, 10)
    };
    ApiService.deals = [newDeal, ...ApiService.deals];
    setStored('deals', ApiService.deals);
    return newDeal;
  }

  static async getContracts(): Promise<Contract[]> {
    return ApiService.request<Contract[]>('/contracts', undefined, ApiService.contracts);
  }

  static async createContract(contractData: Partial<Contract>): Promise<Contract> {
    const newContract: Contract = {
      id: `cnt${Date.now()}`,
      contractNumber: `CNT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      type: contractData.type || 'عقد بيع',
      propertyTitle: contractData.propertyTitle || 'عقار رقم 1',
      customerName: contractData.customerName || 'العميل الفاضل',
      ownerName: contractData.ownerName || 'المالك المحترم',
      startDate: contractData.startDate || new Date().toISOString().substring(0, 10),
      endDate: contractData.endDate || new Date(Date.now() + 365 * 86400000).toISOString().substring(0, 10),
      amount: contractData.amount || 100000,
      status: 'بانتظار التوقيع',
      terms: contractData.terms || 'الشروط والأحكام القياسية للشركة المعتمـدة.',
      signatures: [],
      createdAt: new Date().toISOString().substring(0, 10)
    };
    ApiService.contracts = [newContract, ...ApiService.contracts];
    setStored('contracts', ApiService.contracts);
    return newContract;
  }

  static async signContract(contractId: string, partyName: string, signatureImage?: string): Promise<Contract> {
    const cnt = ApiService.contracts.find(c => c.id === contractId);
    if (!cnt) throw new Error('Contract not found');

    cnt.signatures.push({
      party: 'العميل',
      name: partyName,
      signedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      ipAddress: '185.120.14.88',
      signatureImage
    });
    cnt.status = 'موقع';
    setStored('contracts', ApiService.contracts);
    return cnt;
  }

  // --- MODULE 7 & 8: FINANCE & MAINTENANCE ---
  static async getInvoices(): Promise<Invoice[]> {
    return ApiService.request<Invoice[]>('/financial/invoices', undefined, ApiService.invoices);
  }

  static async getExpenses(): Promise<Expense[]> {
    return ApiService.request<Expense[]>('/financial/expenses', undefined, ApiService.expenses);
  }

  static async getMaintenanceRequests(): Promise<MaintenanceRequest[]> {
    return ApiService.request<MaintenanceRequest[]>('/maintenance', undefined, ApiService.maintenance);
  }

  static async createMaintenanceRequest(reqData: Partial<MaintenanceRequest>): Promise<MaintenanceRequest> {
    const newReq: MaintenanceRequest = {
      id: `mreq${Date.now()}`,
      requestNumber: `MAINT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      propertyTitle: reqData.propertyTitle || 'العقار المختار',
      customerName: reqData.customerName || ApiService.currentUser.fullName,
      type: reqData.type || 'تكييف',
      description: reqData.description || 'طلب صيانة جديد',
      priority: reqData.priority || 'متوسطة',
      status: 'جديد',
      cost: reqData.cost || 0,
      createdAt: new Date().toISOString().substring(0, 10)
    };
    ApiService.maintenance = [newReq, ...ApiService.maintenance];
    setStored('maintenance', ApiService.maintenance);
    return newReq;
  }

  static async getTechnicians(): Promise<Technician[]> {
    return ApiService.request<Technician[]>('/technicians', undefined, ApiService.technicians);
  }

  // --- MODULE 9: COMMUNICATION & NOTIFICATIONS ---
  static async getChatMessages(): Promise<ChatMessage[]> {
    return ApiService.request<ChatMessage[]>('/chat', undefined, ApiService.chatMessages);
  }

  static async getNotifications(): Promise<NotificationItem[]> {
    return ApiService.request<NotificationItem[]>('/notifications', undefined, ApiService.notifications);
  }

  static async sendChatMessage(content: string): Promise<ChatMessage> {
    const msg: ChatMessage = {
      id: `cm${Date.now()}`,
      senderId: ApiService.currentUser.id,
      senderName: ApiService.currentUser.fullName,
      senderRole: ApiService.currentUser.role === 'super_admin' ? 'مدير عام' : ApiService.currentUser.role === 'office_manager' ? 'مدير مكتب' : ApiService.currentUser.role === 'agent' ? 'وسيط عقاري' : 'عميل',
      content,
      status: 'sent',
      createdAt: new Date().toTimeString().substring(0, 5)
    };
    ApiService.chatMessages = [...ApiService.chatMessages, msg];
    setStored('chat', ApiService.chatMessages);
    return msg;
  }

  // --- MODULE 11: GEMINI AI ASSISTANT & INSIGHTS ---
  static async getAIInsights(): Promise<AIInsight[]> {
    return ApiService.request<AIInsight[]>('/ai/insights', undefined, ApiService.aiInsights);
  }

  // --- MODULE 12, 16 & 17: SETTINGS, BRANCHES & WORKFLOWS ---
  static async getBranches(): Promise<Branch[]> {
    return ApiService.request<Branch[]>('/branches', undefined, ApiService.branches);
  }

  static async getWorkflowRules(): Promise<WorkflowRule[]> {
    return ApiService.request<WorkflowRule[]>('/workflows', undefined, ApiService.workflows);
  }

  static async createWorkflowRule(rule: Partial<WorkflowRule>): Promise<WorkflowRule> {
    const newRule: WorkflowRule = {
      id: `wf_${Date.now()}`,
      title: rule.title || 'قاعدة جديدة',
      trigger: rule.trigger || 'lead_created',
      condition: rule.condition || 'المدينة = الرياض',
      action: rule.action || 'assign_agent',
      isActive: true
    };
    ApiService.workflows = [newRule, ...ApiService.workflows];
    setStored('workflows', ApiService.workflows);
    return newRule;
  }

  static async toggleWorkflowRule(ruleId: string, isActive: boolean): Promise<WorkflowRule[]> {
    const wf = ApiService.workflows.find(w => w.id === ruleId);
    if (wf) {
      wf.isActive = isActive;
      setStored('workflows', ApiService.workflows);
    }
    return ApiService.workflows;
  }

  static async getAuditLogs(): Promise<AuditLog[]> {
    return ApiService.request<AuditLog[]>('/audit', undefined, ApiService.auditLogs);
  }

  static async getMarketingCampaigns(): Promise<any[]> {
    return [
      { id: 'camp_1', title: 'حملة فلل حطين المودرن', platform: 'سناب شات و انستغرام', budget: 15000, clicks: 4200, conversions: 85, status: 'نشطة' },
      { id: 'camp_2', title: 'حملة أبراج جدة السكنية', platform: 'جوجل و تيك توك', budget: 25000, clicks: 8900, conversions: 140, status: 'نشطة' }
    ];
  }

  static async exportReportCSV(type: string): Promise<string> {
    if (type === 'properties') {
      const header = 'العنوان,المرجع,السعر,المساحة,المدينة,الغرض\n';
      const rows = ApiService.properties.map(p => `"${p.title}","${p.referenceNumber}",${p.price},${p.area},"${p.location?.city || ''}","${p.purpose}"`).join('\n');
      return header + rows;
    }
    if (type === 'deals') {
      const header = 'رقم الصفقة,العقار,العميل,المبلغ,العمولة\n';
      const rows = ApiService.deals.map(d => `"${d.dealNumber}","${d.propertyTitle}","${d.customerName}",${d.amount},${d.commissionAmount}`).join('\n');
      return header + rows;
    }
    const header = 'رقم الفاتورة,العميل,المبلغ,الإجمالي\n';
    const rows = ApiService.invoices.map(i => `"${i.invoiceNumber}","${i.customerName}",${i.amount},${i.total}`).join('\n');
    return header + rows;
  }

  // --- MODULE 11: GEMINI AI ASSISTANT & GENERATOR ---
  static async generateAIPropertyDescription(type: string, city: string, area: number, price: number, features: string[]): Promise<{ title: string; description: string; highlights: string[] }> {
    try {
      const res = await fetch('/api/ai/property-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, city, area, price, features })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('AI API call fallback:', e);
    }
    // High quality offline fallback generator
    return {
      title: `${type} فاخرة للبيع في موقع استراتيجي بـ ${city}`,
      description: `فرصة عقارية فريدة ومتميزة لامتلاك ${type} فاخرة بمساحة ${area} متر مربع في أفضل أحياء ${city}. يتميز العقار بتشطيبات راقية ونظام منزل ذكي وتصميم معماري يضمن أقصى درجات الراحة والرفاهية العائلية.`,
      highlights: [
        `مساحة شاسعة قدرها ${area} م²`,
        `سعر منافس قدره ${price.toLocaleString('ar-SA')} ريال سعودي`,
        `مميزات إضافية: ${features.join(' ، ')}`
      ]
    };
  }

  static async askAIAssistant(prompt: string): Promise<string> {
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (res.ok) {
        const data = await res.json();
        return data.reply;
      }
    } catch (e) {
      console.warn('AI Chat API offline fallback:', e);
    }
    return `مرحباً بك! أنا مساعد أعيان العقاري الذكي. بخصوص استفسارك حول "${prompt}"، يسعدني إفادتك بأن سوق العقار يشهد نمواً مستقراً وتوافر خيارات استثمارية ممتازة في الرياض وجدة والخبر. أستطيع مساعدتك في تحليل الصفقات، حساب تقييم العقارات، أو جلب تقارير العملاء.`;
  }
}
