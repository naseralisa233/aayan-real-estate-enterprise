import React, { useState } from 'react';
import { 
  Building2, Bell, ChevronDown, UserCheck, Shield, Sparkles, 
  Search, X, Check, Globe, SlidersHorizontal, Moon, Sun
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { ApiService } from '../../services/api';

interface MobileHeaderProps {
  currentUser: User;
  onUserChange: (user: User) => void;
  notificationsCount: number;
  onOpenNotifications?: () => void;
  onSearchClick?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  currentUser,
  onUserChange,
  notificationsCount,
  onOpenNotifications,
  onSearchClick
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const roles: { role: UserRole; title: string; desc: string; color: string }[] = [
    { role: 'super_admin', title: 'المدير العام (Super Admin)', desc: 'إدارة كاملة لكافة العمليات والفروع', color: 'bg-emerald-500' },
    { role: 'office_manager', title: 'مدير المكتب (Office Manager)', desc: 'إدارة المبيعات والعملاء والفريق', color: 'bg-blue-500' },
    { role: 'agent', title: 'الوسيط العقاري (Agent)', desc: 'المعاينة الميدانية والصفقات والعملاء', color: 'bg-amber-500' },
    { role: 'accountant', title: 'المحاسب المالي (Accountant)', desc: 'الفواتير، الإيرادات والضرائب', color: 'bg-purple-500' },
    { role: 'maintenance', title: 'مسؤول الصيانة (Maintenance)', desc: 'إدارة الطلبات وبلاغات الصيانة', color: 'bg-rose-500' },
    { role: 'customer', title: 'العميل العقاري (Customer)', desc: 'تصفح العقارات وحجز المعاينات', color: 'bg-teal-500' }
  ];

  const handleSelectRole = (role: UserRole) => {
    const user = ApiService.users.find(u => u.role === role) || ApiService.users[0];
    onUserChange(user);
    setShowRoleMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md transition-all">
      <div className="max-w-md mx-auto sm:max-w-7xl px-4 py-3 flex items-center justify-between gap-3">
        
        {/* Brand & Identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-950/40 shrink-0">
            <Building2 className="w-5 h-5 text-slate-950 font-black" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white">
                أعـيـان العقارية
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30">
                Lux
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">المنصة العقارية الموحدة</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* Quick Search Launcher */}
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              className="p-2.5 rounded-2xl bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60 active:scale-95 transition"
              title="البحث المباشر"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                if (onOpenNotifications) {
                  onOpenNotifications();
                } else {
                  setShowNotifications(!showNotifications);
                }
              }}
              className="relative p-2.5 rounded-2xl bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60 active:scale-95 transition"
              title="التنبيهات"
            >
              <Bell className="w-4 h-4" />
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                  {notificationsCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute left-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-4 z-50 text-right">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-bold text-xs text-white">التنبيهات المباشرة</span>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
                  <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/50 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">عرض جديد لفيلا حطين</span>
                      <span className="text-[9px] text-emerald-400 font-bold">جديد</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">قدم العميل عبد العزيز عرض شراء جديد</p>
                    <span className="text-[9px] text-slate-500 block">منذ 10 دقائق</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/50 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">معاينة مؤكدة</span>
                      <span className="text-[9px] text-amber-400 font-bold">اليوم</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">معاينة شقة الكورنيش - 05:00 م</p>
                    <span className="text-[9px] text-slate-500 block">منذ ساعة</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 p-1.5 pl-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 active:scale-95 transition"
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.fullName} 
                className="w-7 h-7 rounded-xl object-cover border border-emerald-500/40"
              />
              <span className="text-[11px] font-bold text-slate-200 hidden xs:inline max-w-[80px] truncate">
                {currentUser.fullName.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute left-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-3 z-50 text-right">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 mb-2">
                  <span className="text-xs font-bold text-slate-300">مبدل الأدوار (RBAC)</span>
                  <button onClick={() => setShowRoleMenu(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1.5">
                  {roles.map(r => (
                    <button
                      key={r.role}
                      onClick={() => handleSelectRole(r.role)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-right transition ${
                        currentUser.role === r.role 
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-white font-bold' 
                          : 'hover:bg-slate-800/80 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${r.color}`} />
                        <div>
                          <p className="text-xs font-bold text-slate-100">{r.title.split('(')[0]}</p>
                          <p className="text-[10px] text-slate-400">{r.desc}</p>
                        </div>
                      </div>
                      {currentUser.role === r.role && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
