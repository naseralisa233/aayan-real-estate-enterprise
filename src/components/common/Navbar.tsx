import React, { useState } from 'react';
import { 
  Building2, UserCheck, Shield, Bell, MessageSquare, Sparkles, 
  Search, Globe, Smartphone, UserCog, CheckCircle, ChevronDown, Layers
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { ApiService } from '../../services/api';

interface NavbarProps {
  currentUser: User;
  onUserChange: (user: User) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  unreadCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onUserChange,
  activeView,
  setActiveView,
  unreadCount
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const roles: { role: UserRole; title: string; desc: string; color: string }[] = [
    { role: 'super_admin', title: 'المدير العام (Super Admin)', desc: 'صلاحيات كاملة على كل الفروع', color: 'bg-emerald-600' },
    { role: 'office_manager', title: 'مدير المكتب (Office Manager)', desc: 'إدارة الفرع، الموظفين والمبيعات', color: 'bg-blue-600' },
    { role: 'agent', title: 'الوسيط العقاري (Agent)', desc: 'إدارة العقارات، Leads والتواصل', color: 'bg-amber-600' },
    { role: 'accountant', title: 'المحاسب (Accountant)', desc: 'الفواتير، العمولات، والمالية', color: 'bg-purple-600' },
    { role: 'maintenance', title: 'موظف الصيانة (Maintenance)', desc: 'طلبات الصيانة والفنيين', color: 'bg-rose-600' },
    { role: 'customer', title: 'العميل العقاري (Customer)', desc: 'تطبيق الجوال، البحث والطلبات', color: 'bg-teal-600' }
  ];

  const handleSelectRole = (role: UserRole) => {
    const user = ApiService.users.find(u => u.role === role) || ApiService.users[0];
    onUserChange(user);
    setShowRoleMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & System Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-900/40">
              <Building2 className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-200 to-white">
                  أعـيـان العقارية
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-400">المنصة الموحدة لإدارة المكتب والعقارات</p>
            </div>
          </div>

          {/* Quick Experience View Switcher */}
          <div className="hidden md:flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs font-semibold">
            <button
              onClick={() => setActiveView('erp')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'erp' 
                  ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>لوحة الإدارة ERP</span>
            </button>

            <button
              onClick={() => setActiveView('agent_app')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'agent_app' 
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>تطبيق الوسيط</span>
            </button>

            <button
              onClick={() => setActiveView('customer_app')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'customer_app' 
                  ? 'bg-teal-400 text-slate-950 shadow-sm font-bold' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>تطبيق العميل</span>
            </button>

            <button
              onClick={() => setActiveView('ai_studio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'ai_studio' 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm font-bold' 
                  : 'text-purple-300 hover:text-purple-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>المساعد الذكي Gemini</span>
            </button>
          </div>

          {/* User Role Switcher & Notifications */}
          <div className="flex items-center gap-3">
            
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotificationMenu(!showNotificationMenu)}
                className="relative p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                title="التنبيهات"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotificationMenu && (
                <div className="absolute left-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 text-right">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="font-bold text-sm text-white">مركز الإشعارات والتنبيهات</span>
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium">
                      مباشر
                    </span>
                  </div>
                  <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 text-xs">
                      <p className="font-bold text-slate-200">عرض مالي جديد لفيلا حطين</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">تم تقديم عرض بقيمة 4,750,000 ريال من عبد العزيز الراجحي</p>
                      <span className="text-[10px] text-emerald-400 mt-1 block">قبل 10 دقائق</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 text-xs">
                      <p className="font-bold text-slate-200">موعد معاينة مؤكد اليوم</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">معاينة شقة الكورنيش - الساعة 05:00 مساءً</p>
                      <span className="text-[10px] text-amber-400 mt-1 block">قبل ساعة</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher Menu */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.fullName} 
                  className="w-7 h-7 rounded-full object-cover border border-emerald-500/40"
                />
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-white line-clamp-1">{currentUser.fullName}</p>
                  <p className="text-[10px] text-emerald-400 font-medium">
                    {roles.find(r => r.role === currentUser.role)?.title.split('(')[0]}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {showRoleMenu && (
                <div className="absolute left-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 text-right">
                  <div className="p-2.5 border-b border-slate-800 mb-1">
                    <p className="text-xs font-bold text-slate-400">مبدل الصلاحيات التجريبي (RBAC Testing):</p>
                    <p className="text-[11px] text-slate-500">اختر دوراً لمعاينة الشاشات والتصاريح الخاصة به</p>
                  </div>
                  <div className="space-y-1">
                    {roles.map(r => (
                      <button
                        key={r.role}
                        onClick={() => handleSelectRole(r.role)}
                        className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-right transition ${
                          currentUser.role === r.role 
                            ? 'bg-emerald-500/15 border border-emerald-500/30 text-white' 
                            : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${r.color}`} />
                        <div>
                          <p className="text-xs font-bold text-slate-200">{r.title}</p>
                          <p className="text-[10px] text-slate-400">{r.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
