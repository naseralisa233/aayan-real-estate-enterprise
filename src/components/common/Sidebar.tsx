import React from 'react';
import { 
  LayoutDashboard, Building2, Users, Target, Handshake, FileText, 
  Wallet, Wrench, MessageSquare, Sparkles, Shield, Store, GitMerge, 
  Workflow, WifiOff, FileSpreadsheet, Rocket, Smartphone, UserCheck, Lock
} from 'lucide-react';
import { User } from '../../types';

interface SidebarProps {
  currentUser: User;
  activeModule?: string;
  onSelectModule?: (mod: string) => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentUser, 
  activeModule, 
  onSelectModule, 
  activeTab, 
  setActiveTab 
}) => {
  const currentActive = activeModule || activeTab || 'mod_2';

  const handleSelect = (id: string) => {
    if (onSelectModule) onSelectModule(id);
    if (setActiveTab) setActiveTab(id);
  };

  const menuItems = [
    { id: 'mod_10', alias: 'dashboard', label: 'لوحة التحكم والـ KPIs', icon: LayoutDashboard, roles: ['super_admin', 'office_manager', 'agent', 'accountant'] },
    { id: 'mod_2', alias: 'properties', label: 'إدارة العقارات والوحدات', icon: Building2, roles: ['super_admin', 'office_manager', 'agent', 'customer'] },
    { id: 'mod_3', alias: 'crm', label: 'إدارة العملاء الـ CRM', icon: Users, roles: ['super_admin', 'office_manager', 'agent'] },
    { id: 'mod_4', alias: 'leads', label: 'العملاء المحتملين والزيارات', icon: Target, roles: ['super_admin', 'office_manager', 'agent'] },
    { id: 'mod_5', alias: 'deals', label: 'الصفقات والعروض والتفاوض', icon: Handshake, roles: ['super_admin', 'office_manager', 'agent'] },
    { id: 'mod_6', alias: 'contracts', label: 'العقود والتوقيع الرقمي', icon: FileText, roles: ['super_admin', 'office_manager', 'agent', 'accountant'] },
    { id: 'mod_7', alias: 'finance', label: 'الإدارة المالية والفواتير', icon: Wallet, roles: ['super_admin', 'office_manager', 'accountant'] },
    { id: 'mod_8', alias: 'maintenance', label: 'إدارة الصيانة والخدمات', icon: Wrench, roles: ['super_admin', 'office_manager', 'maintenance'] },
    { id: 'mod_9', alias: 'communication', label: 'المحادثات والتنبيهات', icon: MessageSquare, roles: ['super_admin', 'office_manager', 'agent', 'accountant', 'maintenance', 'customer'] },
    { id: 'mod_11', alias: 'ai_assistant', label: 'مساعد الذكاء الاصطناعي', icon: Sparkles, roles: ['super_admin', 'office_manager', 'agent'] },
    { id: 'mod_13', alias: 'customer_app', label: 'تطبيق العميل السكني', icon: Smartphone, roles: ['super_admin', 'office_manager', 'customer'] },
    { id: 'mod_14', alias: 'agent_app', label: 'تطبيق الوسيط الميداني', icon: UserCheck, roles: ['super_admin', 'office_manager', 'agent'] },
    { id: 'mod_15', alias: 'marketplace', label: 'السوق العقاري والحملات', icon: Store, roles: ['super_admin', 'office_manager', 'agent', 'customer'] },
    { id: 'mod_16', alias: 'enterprise', label: 'إدارة الفروع والمؤسسة', icon: GitMerge, roles: ['super_admin'] },
    { id: 'mod_17', alias: 'workflow', label: 'محرك الأتمتة الذكي', icon: Workflow, roles: ['super_admin', 'office_manager'] },
    { id: 'mod_18', alias: 'offline', label: 'العمل بدون إنترنت Sync', icon: WifiOff, roles: ['super_admin', 'office_manager', 'agent'] },
    { id: 'mod_19', alias: 'bi_reports', label: 'مركز التقارير وذكاء الأعمال', icon: FileSpreadsheet, roles: ['super_admin', 'office_manager', 'accountant'] },
    { id: 'mod_12', alias: 'settings', label: 'إعدادات النظام والأمان', icon: Shield, roles: ['super_admin'] },
    { id: 'mod_1', alias: 'auth', label: 'المستخدمين والصلاحيات RBAC', icon: Lock, roles: ['super_admin'] },
    { id: 'mod_20', alias: 'release', label: 'فحص جاهزية الإنتاج', icon: Rocket, roles: ['super_admin'] }
  ];

  // Filter allowed menu items based on current role
  const allowedItems = menuItems.filter(item => item.roles.includes(currentUser.role));

  return (
    <aside className="w-64 bg-slate-900 border-l border-slate-800 text-slate-300 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          الوحدات البرمجية Modules (20)
        </div>
        
        {allowedItems.map(item => {
          const Icon = item.icon;
          const isActive = currentActive === item.id || currentActive === item.alias;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs text-right transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md shadow-emerald-500/20 translate-x-1'
                  : 'hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Branch & System Footer Info */}
      <div className="pt-4 border-t border-slate-800/80 mt-6">
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
            <span>الفرع الحالي:</span>
            <span className="text-emerald-400">نشط</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5 truncate">{currentUser.branchName}</p>
          <div className="mt-2 text-[10px] text-slate-500 flex justify-between">
            <span>إصدار Expo SDK 54</span>
            <span className="text-emerald-400">جاهز للإنتاج</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
