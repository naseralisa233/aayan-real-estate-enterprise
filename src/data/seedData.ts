import { 
  User, Property, Customer, Lead, FollowUp, Appointment, Viewing, 
  Deal, Contract, Invoice, Expense, MaintenanceRequest, Technician, 
  NotificationItem, ChatMessage, WorkflowRule, AuditLog, Branch, AIInsight 
} from '../types';

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: 'b1',
    name: 'فرع الرياض الرئيسي - العليا',
    city: 'الرياض',
    managerName: 'أحمد بن سلمان المنصور',
    employeeCount: 18,
    propertiesCount: 42,
    revenue: 4850000,
    status: 'نشط'
  },
  {
    id: 'b2',
    name: 'فرع جدة - الكورنيش',
    city: 'جدة',
    managerName: 'خالد الهاشمي',
    employeeCount: 12,
    propertiesCount: 28,
    revenue: 3200000,
    status: 'نشط'
  },
  {
    id: 'b3',
    name: 'فرع الخبر - الحزام الذهبي',
    city: 'الخبر',
    managerName: 'فهد العتيبي',
    employeeCount: 8,
    propertiesCount: 19,
    revenue: 1950000,
    status: 'نشط'
  },
  {
    id: 'b4',
    name: 'فرع دبي - وسط المدينة',
    city: 'دبي',
    managerName: 'سارة آل مكتوم',
    employeeCount: 10,
    propertiesCount: 15,
    revenue: 6100000,
    status: 'نشط'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    fullName: 'سليمان بن عبد الله القحطاني',
    email: 'admin@aayan.sa',
    phone: '+966501112222',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    branchId: 'b1',
    branchName: 'فرع الرياض الرئيسي',
    status: 'active',
    permissions: ['all'],
    lastLogin: '2026-07-21 11:30',
    createdAt: '2025-01-01'
  },
  {
    id: 'u2',
    fullName: 'أحمد بن سلمان المنصور',
    email: 'ahmed.m@aayan.sa',
    phone: '+966502223333',
    role: 'office_manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    branchId: 'b1',
    branchName: 'فرع الرياض الرئيسي',
    status: 'active',
    permissions: ['manage_branch', 'manage_properties', 'manage_agents', 'view_reports'],
    lastLogin: '2026-07-21 10:15',
    createdAt: '2025-01-10'
  },
  {
    id: 'u3',
    fullName: 'محمد بن علي الشهري',
    email: 'mohammed.s@aayan.sa',
    phone: '+966503334444',
    role: 'agent',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    branchId: 'b1',
    branchName: 'فرع الرياض الرئيسي',
    status: 'active',
    permissions: ['agent_properties', 'agent_leads', 'agent_deals'],
    lastLogin: '2026-07-21 12:05',
    createdAt: '2025-02-01'
  },
  {
    id: 'u4',
    fullName: 'فيصل السبيعي',
    email: 'faisal.acc@aayan.sa',
    phone: '+966504445555',
    role: 'accountant',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
    branchId: 'b1',
    branchName: 'فرع الرياض الرئيسي',
    status: 'active',
    permissions: ['financial_read', 'financial_write', 'invoices', 'expenses'],
    lastLogin: '2026-07-21 09:40',
    createdAt: '2025-02-15'
  },
  {
    id: 'u5',
    fullName: 'مهندس طارق الزهراني',
    email: 'tariq.maint@aayan.sa',
    phone: '+966505556666',
    role: 'maintenance',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    branchId: 'b1',
    branchName: 'فرع الرياض الرئيسي',
    status: 'active',
    permissions: ['maintenance_requests', 'update_status'],
    lastLogin: '2026-07-21 08:30',
    createdAt: '2025-03-01'
  },
  {
    id: 'u6',
    fullName: 'عبد العزيز بن إبراهيم الراجحي',
    email: 'abdulaziz.customer@gmail.com',
    phone: '+966506667777',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    branchId: 'b1',
    branchName: 'فرع الرياض الرئيسي',
    status: 'active',
    permissions: ['view_properties', 'request_viewing', 'chat_office'],
    lastLogin: '2026-07-21 11:50',
    createdAt: '2025-03-12'
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'p1',
    referenceNumber: 'PROP-2026-001',
    title: 'فيلا مودرن فاخرة مع مسبح خاص وحديقة',
    type: 'فيلا',
    purpose: 'للبيع',
    description: 'فيلا فاخرة بتصميم معماري حديث في حطين الرياض، تحتوي على 6 أجنحة نوم، مجلس مفتوح، مسبح خاص، مصعد بانورامي، ونظام منزل ذكي بالكامل.',
    price: 4850000,
    currency: 'SAR',
    area: 550,
    rooms: 6,
    bathrooms: 8,
    floors: 3,
    finishType: 'سوبر ديلوكس',
    features: ['مسبح خاص', 'مصعد', 'حديقة كبيرة', 'تكييف مركزي', 'نظام سمارت هوم', 'كاميرات مراقبة', 'كراج سيارتين', 'غرفة خادمة'],
    status: 'متاح',
    location: {
      country: 'السعودية',
      city: 'الرياض',
      district: 'حطين',
      street: 'طريق الأبراج',
      lat: 24.774265,
      lng: 46.623812
    },
    ownerName: 'الشيخ عبد الله الدوسري',
    ownerPhone: '+966509990001',
    agentId: 'u3',
    agentName: 'محمد بن علي الشهري',
    branchId: 'b1',
    media: [
      { id: 'm1', type: 'image', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200', title: 'الواجهة الخارجية', isMain: true },
      { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200', title: 'الصالة الرئيسية' },
      { id: 'm3', type: 'image', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200', title: 'المسبح والحديقة' },
      { id: 'm4', type: 'image', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', title: 'المطبخ المودرن' }
    ],
    documents: [
      { id: 'doc1', name: 'صك ملكية إلكتروني.pdf', type: 'صك ملكية', url: '#', uploadedAt: '2026-01-15' },
      { id: 'doc2', name: 'رخصة البناء والهندسية.pdf', type: 'ترخيص', url: '#', uploadedAt: '2026-01-15' }
    ],
    viewsCount: 342,
    rating: 4.9,
    createdAt: '2026-01-10',
    updatedAt: '2026-07-20',
    featured: true
  },
  {
    id: 'p2',
    referenceNumber: 'PROP-2026-002',
    title: 'شقة فاخرة مطلة على البحر بالكامل',
    type: 'شقة',
    purpose: 'للإيجار',
    description: 'شقة سكنية راقية في برج الكورنيش بجدة، تتميز بإطلالة بانورامية مباشرة على البحر الأحمـر، تشطيبات فندقية وأثاث كامل فاخر.',
    price: 120000,
    currency: 'SAR',
    area: 210,
    rooms: 3,
    bathrooms: 3,
    floors: 14,
    finishType: 'فرنشر فاخر',
    features: ['إطلالة بحرية', 'مفروشة بالكامل', 'نادي صحي', 'أمن 24/7', 'موقف خاص'],
    status: 'متاح',
    location: {
      country: 'السعودية',
      city: 'جدة',
      district: 'الشاطئ',
      street: 'طريق الكورنيش',
      lat: 21.543333,
      lng: 39.172778
    },
    ownerName: 'م. خالد العمودي',
    ownerPhone: '+966509990002',
    agentId: 'u3',
    agentName: 'محمد بن علي الشهري',
    branchId: 'b2',
    media: [
      { id: 'm5', type: 'image', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200', title: 'الصالة المطلة على البحر', isMain: true },
      { id: 'm6', type: 'image', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200', title: 'غرفة النوم الرئيسية' }
    ],
    documents: [
      { id: 'doc3', name: 'عقد صيانة البرج.pdf', type: 'عقد', url: '#', uploadedAt: '2026-02-01' }
    ],
    viewsCount: 189,
    rating: 4.8,
    createdAt: '2026-02-01',
    updatedAt: '2026-07-18',
    featured: true
  },
  {
    id: 'p3',
    referenceNumber: 'PROP-2026-003',
    title: 'مجمع تجاري ومكاتب إدارية في حي العليا',
    type: 'محل تجاري',
    purpose: 'للاستثمار',
    description: 'مبنى تجاري واستثماري مميز على طريق الملك فهد في قلب العاصمة الرياض، بدخل سنوي ممتاز ونسبة إشغال تتجاوز 90%.',
    price: 18500000,
    currency: 'SAR',
    area: 1200,
    rooms: 12,
    bathrooms: 10,
    floors: 5,
    finishType: 'ديلوكس تجاري',
    features: ['موقع حيوي', 'مصاعد هيدروليكية', 'مواقف قبو', 'نظام حريق ذكي'],
    status: 'متاح',
    location: {
      country: 'السعودية',
      city: 'الرياض',
      district: 'العليا',
      street: 'طريق الملك فهد',
      lat: 24.690000,
      lng: 46.685000
    },
    ownerName: 'شركة الإعمار السعودية',
    ownerPhone: '+966509990003',
    agentId: 'u3',
    agentName: 'محمد بن علي الشهري',
    branchId: 'b1',
    media: [
      { id: 'm7', type: 'image', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200', title: 'المبنى التجاري', isMain: true }
    ],
    documents: [],
    viewsCount: 512,
    rating: 5.0,
    createdAt: '2026-03-05',
    updatedAt: '2026-07-21',
    featured: false
  },
  {
    id: 'p4',
    referenceNumber: 'PROP-2026-004',
    title: 'أرض تجارية سكنية برأس زاوية في الخبر',
    type: 'أرض',
    purpose: 'للبيع',
    description: 'أرض مميزة على شارعين رئيسيين في حي الحزام الذهبي بالخبر، جاهزة للبناء المباشر ومناسبة لتشييد كمبوند سكتي أو مجمع فلل.',
    price: 6200000,
    currency: 'SAR',
    area: 950,
    rooms: 0,
    bathrooms: 0,
    floors: 0,
    finishType: 'خام',
    features: ['موقع زاوية', 'شارع 30م', 'مكتملة الخدمات', 'مخطط معتمد'],
    status: 'متاح',
    location: {
      country: 'السعودية',
      city: 'الخبر',
      district: 'الحزام الذهبي',
      street: 'شارع الأمراء',
      lat: 26.280000,
      lng: 50.210000
    },
    ownerName: 'د. يوسف التميمي',
    ownerPhone: '+966509990004',
    agentId: 'u3',
    agentName: 'محمد بن علي الشهري',
    branchId: 'b3',
    media: [
      { id: 'm8', type: 'image', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200', title: 'موقع الأرض', isMain: true }
    ],
    documents: [],
    viewsCount: 145,
    rating: 4.7,
    createdAt: '2026-04-10',
    updatedAt: '2026-07-15',
    featured: false
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    fullName: 'عبد العزيز بن إبراهيم الراجحي',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    phone: '+966506667777',
    email: 'abdulaziz.customer@gmail.com',
    type: 'buyer',
    status: 'active',
    source: 'تطبيق الجوال',
    address: 'حي الياسمين، الرياض',
    city: 'الرياض',
    assignedAgentId: 'u3',
    assignedAgentName: 'محمد بن علي الشهري',
    tags: ['عميل VIP', 'مشتري جاد', 'كاش'],
    preferences: {
      propertyType: 'فيلا',
      purpose: 'للبيع',
      city: 'الرياض',
      district: 'حطين',
      maxBudget: 5000000,
      minArea: 500,
      rooms: 5,
      features: ['مسبح خاص', 'مصعد', 'سمارت هوم']
    },
    activities: [
      { id: 'act1', type: 'viewing', employeeName: 'محمد الشهري', description: 'معاينة فيلا حطين المودرن', result: 'إعجاب شديد وطلب تقديم عرض', date: '2026-07-20' },
      { id: 'act2', type: 'call', employeeName: 'محمد الشهري', description: 'مكالمة لتأكيد الميزانية وطريقة الدفع', result: 'تم تأكيد التمويل الذاتي', date: '2026-07-18' }
    ],
    notes: [
      { id: 'n1', author: 'محمد الشهري', text: 'العميل يفضل الفيلا مع مسبح وغرفة سائق مستقلة.', isPrivate: false, date: '2026-07-18' }
    ],
    createdAt: '2026-03-12'
  },
  {
    id: 'c2',
    fullName: 'د. نورة بنت منصور الماجد',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    phone: '+966508889999',
    email: 'noura.majed@kfupm.edu.sa',
    type: 'tenant',
    status: 'interested',
    source: 'الموقع الإلكتروني',
    address: 'حي الشاطئ، جدة',
    city: 'جدة',
    assignedAgentId: 'u3',
    assignedAgentName: 'محمد بن علي الشهري',
    tags: ['مستأجر دائم', 'طبيبة'],
    preferences: {
      propertyType: 'شقة',
      purpose: 'للإيجار',
      city: 'جدة',
      district: 'الشاطئ',
      maxBudget: 130000,
      minArea: 200,
      rooms: 3,
      features: ['إطلالة بحرية', 'مفروشة']
    },
    activities: [
      { id: 'act3', type: 'message', employeeName: 'محمد الشهري', description: 'استفسار عن الشقة البحرية في جدة', result: 'تم إرسال الصور والتفاصيل', date: '2026-07-19' }
    ],
    notes: [],
    createdAt: '2026-05-01'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'l1',
    name: 'سعود بن طلال العتيبي',
    phone: '+966501234567',
    email: 'saud.t@gmail.com',
    source: 'WhatsApp',
    status: 'interested',
    budget: 3500000,
    requirements: 'يبحث عن فيلا صغيرة أو دوبلكس جديد بالرياض الشمالية',
    preferredCity: 'الرياض',
    assignedAgentId: 'u3',
    assignedAgentName: 'محمد بن علي الشهري',
    score: 88,
    priority: 'عالية',
    notes: 'مستعد للشراء خلال شهر بعد معاينة الخيارات',
    createdAt: '2026-07-15'
  },
  {
    id: 'l2',
    name: 'المهندس ياسر الغامدي',
    phone: '+966502345678',
    email: 'yasser.g@yahoo.com',
    source: 'إعلانات إنستغرام',
    status: 'contacted',
    budget: 150000,
    requirements: 'مكتب تجاري مساحة 150م في العليا أو طريق الملك فهد',
    preferredCity: 'الرياض',
    assignedAgentId: 'u3',
    assignedAgentName: 'محمد بن علي الشهري',
    score: 65,
    priority: 'متوسطة',
    notes: 'يرغب بإرسال العروض عبر الإيميل أولاً',
    createdAt: '2026-07-18'
  }
];

export const INITIAL_FOLLOW_UPS: FollowUp[] = [
  {
    id: 'f1',
    leadId: 'l1',
    customerName: 'سعود بن طلال العتيبي',
    agentName: 'محمد بن علي الشهري',
    date: '2026-07-22',
    status: 'معلقة',
    priority: 'عالية',
    notes: 'متابعة نية الحجز لفيلا حطين وتحديد موعد اجتماع التفاوض'
  },
  {
    id: 'f2',
    leadId: 'l2',
    customerName: 'المهندس ياسر الغامدي',
    agentName: 'محمد بن علي الشهري',
    date: '2026-07-23',
    status: 'معلقة',
    priority: 'متوسطة',
    notes: 'التأكد من استلام العرض المالي للمكتب التجاري'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'app1',
    customerName: 'عبد العزيز بن إبراهيم الراجحي',
    propertyTitle: 'فيلا مودرن فاخرة مع مسبح خاص وحديقة',
    agentName: 'محمد بن علي الشهري',
    date: '2026-07-22',
    time: '17:00',
    location: 'حي حطين - موقع الفيلا',
    status: 'مؤكد',
    notes: 'اجتماع لتوقيع نموذج تقديم العرض المالي الشامل'
  }
];

export const INITIAL_VIEWINGS: Viewing[] = [
  {
    id: 'v1',
    customerName: 'عبد العزيز بن إبراهيم الراجحي',
    propertyTitle: 'فيلا مودرن فاخرة مع مسبح خاص وحديقة',
    agentName: 'محمد بن علي الشهري',
    date: '2026-07-20',
    result: 'تم تقديم عرض',
    feedback: 'المكان ممتاز جداً والتصاميم جودة عالية'
  }
];

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'd1',
    dealNumber: 'DEAL-2026-088',
    type: 'sale',
    propertyTitle: 'فيلا مودرن فاخرة مع مسبح خاص وحديقة',
    propertyPrice: 4850000,
    customerName: 'عبد العزيز بن إبراهيم الراجحي',
    ownerName: 'الشيخ عبد الله الدوسري',
    agentName: 'محمد بن علي الشهري',
    amount: 4750000,
    currency: 'SAR',
    stage: 'negotiation',
    commissionPercentage: 2.5,
    commissionAmount: 118750,
    offers: [
      { id: 'off1', dealId: 'd1', amount: 4600000, conditions: 'الدفع كاش خلال 14 يوم', status: 'مرفوض', expiryDate: '2026-07-18' },
      { id: 'off2', dealId: 'd1', amount: 4750000, conditions: 'تسليم فور التوثيق', status: 'قيد النظر', expiryDate: '2026-07-25' }
    ],
    notes: 'تم تقديم العرض المحدث بمبلغ 4.75 مليون ريال وبانتظار موافقة المالك النهائية.',
    createdAt: '2026-07-15',
    updatedAt: '2026-07-21'
  }
];

export const INITIAL_CONTRACTS: Contract[] = [
  {
    id: 'cnt1',
    contractNumber: 'CNT-2026-0041',
    type: 'عقد بيع',
    dealId: 'd1',
    propertyTitle: 'فيلا مودرن فاخرة مع مسبح خاص وحديقة',
    customerName: 'عبد العزيز بن إبراهيم الراجحي',
    ownerName: 'الشيخ عبد الله الدوسري',
    startDate: '2026-08-01',
    endDate: '2026-08-01',
    amount: 4750000,
    status: 'بانتظار التوقيع',
    terms: 'يتعهد الطرف الثاني بدفع المبلغ كاملاً فور توثيق صك الإفراز الإلكتروني عبر بوابة ناجز وزارة العدل.',
    signatures: [
      { party: 'المالك', name: 'عبد الله الدوسري', signedAt: '2026-07-20 14:00', ipAddress: '185.120.10.4' }
    ],
    createdAt: '2026-07-20'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv1',
    invoiceNumber: 'INV-2026-0102',
    type: 'فاتورة عمولة',
    customerName: 'عبد العزيز بن إبراهيم الراجحي',
    propertyTitle: 'فيلا مودرن فاخرة مع مسبح خاص وحديقة',
    amount: 118750,
    discount: 0,
    tax: 17812.5,
    total: 136562.5,
    status: 'معلقة',
    date: '2026-07-20',
    dueDate: '2026-08-05',
    payments: [],
    installments: [
      { id: 'inst1', invoiceId: 'inv1', amount: 68281.25, dueDate: '2026-08-01', status: 'معلق' },
      { id: 'inst2', invoiceId: 'inv1', amount: 68281.25, dueDate: '2026-08-15', status: 'معلق' }
    ]
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  { id: 'exp1', category: 'تسويق', amount: 12000, description: 'حملات إعلانية ممتازة على جوجل ومنصات التواصل', date: '2026-07-01', createdBy: 'فيصل السبيعي' },
  { id: 'exp2', category: 'إيجار مكتب', amount: 45000, description: 'إيجار فرع العليا الدفعة النصف سنوية', date: '2026-07-05', createdBy: 'فيصل السبيعي' }
];

export const INITIAL_MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
  {
    id: 'mreq1',
    requestNumber: 'MAINT-2026-019',
    propertyTitle: 'شقة فاخرة مطلة على البحر بالكامل',
    customerName: 'د. نورة بنت منصور الماجد',
    type: 'تكييف',
    description: 'فحص التكييف المركزي بالصالة وإجراء صيانة دورية للفلاتر',
    priority: 'متوسطة',
    status: 'قيد التنفيذ',
    technicianName: 'م. إبراهيم الفني',
    cost: 450,
    createdAt: '2026-07-19'
  }
];

export const INITIAL_TECHNICIANS: Technician[] = [
  { id: 'tech1', name: 'م. إبراهيم الفني', phone: '+966507778888', specialization: 'تكييف وتبريد', rating: 4.9, status: 'مشغول' },
  { id: 'tech2', name: 'أحمد الكهربائي', phone: '+966508880000', specialization: 'كهرباء ومباني', rating: 4.8, status: 'متاح' }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'not1', title: 'عرض جديد على صفقة', message: 'تم استلام تقديم عرض بقيمة 4.75 مليون ريال لفيلا حطين', type: 'deal', isRead: false, createdAt: '2026-07-21 10:30' },
  { id: 'not2', title: 'طلب معاينة قريب', message: 'لديك موعد معاينة مؤكد الساعة 05:00 م مع العميل عبد العزيز الراجحي', type: 'customer', isRead: false, createdAt: '2026-07-21 08:00' }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'cm1', senderId: 'u3', senderName: 'محمد بن علي الشهري', senderRole: 'وسيط عقاري', content: 'السلام عليكم ورحمة الله وبركاته، تم إرسال ملف عرض السعر المحدث للمشتري.', status: 'read', createdAt: '10:15' },
  { id: 'cm2', senderId: 'u2', senderName: 'أحمد المنصور', senderRole: 'مدير المكتب', content: 'ممتاز جداً يا محمد، وافني أولاً بأول فور موافقة المالك.', status: 'read', createdAt: '10:18' }
];

export const INITIAL_WORKFLOW_RULES: WorkflowRule[] = [
  {
    id: 'wf1',
    name: 'توزيع العملاء VIP تلقائياً',
    title: 'توزيع العملاء VIP تلقائياً',
    event: 'عميل جديد',
    trigger: 'lead_created',
    condition: 'الميزانية > 4,000,000 ريال',
    action: 'تعيين لأفضل وسيط وإرسال إشعار عاجل',
    enabled: true,
    isActive: true,
    executionCount: 28,
    lastRun: '2026-07-20 16:40'
  },
  {
    id: 'wf2',
    name: 'تذكير متابعة الصفقات المتأخرة',
    title: 'تذكير متابعة الصفقات المتأخرة',
    event: 'صفقة بدون تحديث لـ 5 أيام',
    trigger: 'deal_idle',
    condition: 'مرحلة التفاوض',
    action: 'إنشاء مهمة متابعة تلقائية وتنبيه المدير',
    enabled: true,
    isActive: true,
    executionCount: 14,
    lastRun: '2026-07-21 09:00'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 'al1', userName: 'سليمان القحطاني', action: 'تغيير صلاحية مستخدم', module: 'الأمان والإعدادات', details: 'تحديث صلاحية الوسيط محمد الشهري', ip: '197.220.14.2', device: 'Chrome / Windows', createdAt: '2026-07-21 11:32' },
  { id: 'al2', userName: 'محمد الشهري', action: 'إضافة عقار جديد', module: 'إدارة العقارات', details: 'إضافة فيلا مودرن حطين PROP-2026-001', ip: '185.120.10.4', device: 'Expo Mobile App', createdAt: '2026-07-20 14:10' }
];

export const INITIAL_AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ai1',
    title: 'توقع ارتفاع الطلب على الشقق في شاطئ جدة',
    message: 'يشير تحليل السوق إلى ارتفاع مؤشرات البحث بنسبة 24% للشقق المفروشة في جدة. ينصح بزيادة العروض في هذه المنطقة.',
    type: 'pricing',
    priority: 'عالية',
    createdAt: '2026-07-21'
  },
  {
    id: 'ai2',
    title: 'فرصة إغلاق عالية لصفقة فيلا حطين (92%)',
    message: 'استناداً إلى سلوك المشتري وتطابق السعر مع الميزانية، احتمال حسم الصفقة يتجاوز 90% خلال الـ 48 ساعة القادمة.',
    type: 'sales',
    priority: 'عالية',
    createdAt: '2026-07-21'
  }
];
