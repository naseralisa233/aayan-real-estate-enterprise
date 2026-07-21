import React, { useState } from 'react';
import { 
  User, Shield, Grid, ChevronLeft, Building2, Phone, Mail, 
  MapPin, CheckCircle2, Sparkles, FileText, Wallet, Wrench, 
  Store, GitMerge, FileSpreadsheet, Lock, Wifi, LogOut, Check
} from 'lucide-react';
import { User as UserType, UserRole } from '../../types';
import { ApiService } from '../../services/api';

interface ModuleProfileHubProps {
  currentUser: UserType;
  onUserChange: (user: UserType) => void;
  onOpenEnterpriseHub: () => void;
  onNavigateToModule: (modId: string) => void;
}

export const ModuleProfileHub: React.FC<ModuleProfileHubProps> = ({
  currentUser,
  onUserChange,
  onOpenEnterpriseHub,
  onNavigateToModule
}) => {
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const roles: { role: UserRole; title: string; desc: string; color: string }[] = [
    { role: 'super_admin', title: 'المدير العام (Super Admin)', desc: 'إدارة كاملة لكافة العمليات والفروع', color: 'bg-emerald-500' },
    { role: 'office_manager', title: 'مدير المكتب (Office Manager)', desc: 'إدارة المبيعات والعملاء والفريق', color: 'bg-blue-500' },
    { role: 'agent', title: 'الوسيط العقاري (Agent)', desc: 'المعاينة الميدانية والصفقات والعملاء', color: 'bg-amber-500' },
    { role: 'accountant', title: 'المحاسب المالي (Accountant)', desc: 'الفواتير، الإيرادات والضرائب', color: 'bg-purple-500' },
    { role: 'maintenance', title: 'مسؤول الصيانة (Maintenance)', desc: 'إدارة الطلبات وبلاغات الصيانة', color: 'bg-rose-500' },
    { role: 'customer', title: 'العميل العقاري (Customer)', desc: 'تصفح العقارات وحجز المعاينات', color: 'bg-teal-500' }
  ];

  const handleRoleSelect = (role: UserRole) => {
    const u = ApiService.users.find(x => x.role === role) || ApiService.users[0];
    onUserChange(u);
    setShowRoleSelector(false);
  };

  return (
    <div className="space-y-5 pb-24 text-right dir-rtl max-w-lg mx-auto">
      
      {/* Profile Card */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.fullName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-lg"
          />
          <div className="space-y-1">
            <h1 className="text-lg font-black text-white">{currentUser.fullName}</h1>
            <p className="text-xs text-emerald-400 font-bold">{currentUser.email}</p>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold text-[10px] border border-slate-700">
              {currentUser.branchName || 'الفرع الرئيسي - الرياض'}
            </span>
          </div>
        </div>

        {/* Contact info list */}
        <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">رقم الجوال:</span>
            <span className="font-bold text-white font-mono">{currentUser.phone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">أخر تسجيل دخول:</span>
            <span className="font-bold text-emerald-400">{currentUser.lastLogin}</span>
          </div>
        </div>
      </div>

      {/* Role Switcher Section */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-black text-white flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>مبدل الأدوار والصلاحيات (RBAC)</span>
            </h2>
            <p className="text-[10px] text-slate-400">بدّل حسابك لمعاينة تجربة المستخدمين والأدوار</p>
          </div>

          <button
            onClick={() => setShowRoleSelector(!showRoleSelector)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
          >
            تغيير الدور
          </button>
        </div>

        {showRoleSelector && (
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            {roles.map(r => (
              <button
                key={r.role}
                onClick={() => handleRoleSelect(r.role)}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-right transition ${
                  currentUser.role === r.role
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-white font-bold'
                    : 'hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${r.color}`} />
                  <div>
                    <p className="text-xs font-bold text-slate-100">{r.title.split('(')[0]}</p>
                    <p className="text-[10px] text-slate-400">{r.desc}</p>
                  </div>
                </div>
                {currentUser.role === r.role && <Check className="w-4 h-4 text-emerald-400" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Enterprise Hub Launcher Button */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
              <Grid className="w-4 h-4 text-emerald-400" />
              <span>المركز العقاري المؤسسي (20 Module)</span>
            </h3>
            <p className="text-[10px] text-slate-400">إدارة العقود، المالية، الصيانة، الذكاء الاصطناعي</p>
          </div>

          <button
            onClick={onOpenEnterpriseHub}
            className="px-4 py-2 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs shadow-md active:scale-95 transition"
          >
            فتح المركز
          </button>
        </div>

        {/* Quick Enterprise Cards */}
        <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
          <button
            onClick={() => onNavigateToModule('mod_6')}
            className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-emerald-500/40 text-right space-y-1"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <p className="font-bold text-white text-xs">العقود والتوقيع</p>
            <p className="text-[9px] text-slate-400">العقود الإلكترونية الرقمية</p>
          </button>

          <button
            onClick={() => onNavigateToModule('mod_7')}
            className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-emerald-500/40 text-right space-y-1"
          >
            <Wallet className="w-4 h-4 text-emerald-400" />
            <p className="font-bold text-white text-xs">المالية والفواتير</p>
            <p className="text-[9px] text-slate-400">إدارة الإيرادات والضريبة</p>
          </button>

          <button
            onClick={() => onNavigateToModule('mod_8')}
            className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-emerald-500/40 text-right space-y-1"
          >
            <Wrench className="w-4 h-4 text-rose-400" />
            <p className="font-bold text-white text-xs">الصيانة والخدمات</p>
            <p className="text-[9px] text-slate-400">إدارة الطلبات والفنيين</p>
          </button>

          <button
            onClick={() => onNavigateToModule('mod_11')}
            className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-emerald-500/40 text-right space-y-1"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <p className="font-bold text-white text-xs">المساعد الذكي Gemini</p>
            <p className="text-[9px] text-slate-400">تحليل الصفقات والتنبؤات</p>
          </button>
        </div>
      </div>

      {/* System Information */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-md text-center space-y-1 text-slate-400 text-xs">
        <p className="font-bold text-white">نظام أعيان العقاري المؤسسي v1.0.0</p>
        <p className="text-[10px] text-slate-500">مشغّل بواسطة Gemini 3.6 & Expo Mobile Engine</p>
      </div>

    </div>
  );
};
