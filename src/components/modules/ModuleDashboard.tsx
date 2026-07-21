import React from 'react';
import { LayoutDashboard, TrendingUp, Building2, Users, Handshake, DollarSign, BarChart3, Activity } from 'lucide-react';
import { User, Property, Deal, Customer, Lead } from '../../types';
import { StatCard } from '../common/StatCard';

interface ModuleDashboardProps {
  currentUser: User;
  properties: Property[];
  deals: Deal[];
  customers: Customer[];
  leads: Lead[];
}

export const ModuleDashboard: React.FC<ModuleDashboardProps> = ({
  currentUser,
  properties,
  deals,
  customers,
  leads
}) => {
  const totalVolume = properties.reduce((sum, p) => sum + p.price, 0);
  const totalDealsAmount = deals.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <LayoutDashboard className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 10: لوحات التحكم والتحليلات الـ BI القيادية</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            عرض مخصص حسب الدور الحالي: <strong className="text-emerald-400">{currentUser.fullName} ({currentUser.role})</strong>
          </p>
        </div>
      </div>

      {/* Main Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="إجمالي القيمة السوقية للعقارات"
          value={`${(totalVolume / 1000000).toFixed(1)} مليون SAR`}
          icon={Building2}
          color="emerald"
          trend="+15%"
        />
        <StatCard
          title="قيمة الصفقات النشطة"
          value={`${(totalDealsAmount / 1000000).toFixed(1)} مليون SAR`}
          icon={Handshake}
          color="purple"
          trend="+28%"
        />
        <StatCard
          title="إجمالي قاعدة العملاء الـ CRM"
          value={customers.length}
          icon={Users}
          color="teal"
          trend="+8%"
        />
        <StatCard
          title="العملاء المحتملين Leads"
          value={leads.length}
          icon={TrendingUp}
          color="amber"
          trend="+12%"
        />
      </div>

      {/* Analytics Chart & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SVG Performance Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-right">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>مؤشر المبيعات والنمو الشهري 2026 (SAR)</span>
            </h3>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              تحديث مباشر
            </span>
          </div>

          <div className="h-56 w-full flex items-end justify-between gap-2 pt-8 pb-2 px-2 border-b border-slate-800">
            {[
              { month: 'يناير', val: 45, color: 'bg-emerald-500' },
              { month: 'فبراير', val: 60, color: 'bg-emerald-500' },
              { month: 'مارس', val: 75, color: 'bg-emerald-500' },
              { month: 'أبريل', val: 50, color: 'bg-emerald-500' },
              { month: 'مايو', val: 85, color: 'bg-emerald-400' },
              { month: 'يونيو', val: 95, color: 'bg-teal-400' },
              { month: 'يوليو', val: 110, color: 'bg-emerald-300' }
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] text-emerald-400 font-mono font-bold opacity-0 group-hover:opacity-100 transition">
                  {bar.val * 100}k
                </span>
                <div 
                  style={{ height: `${bar.val}%` }} 
                  className={`w-full rounded-t-xl ${bar.color} opacity-80 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-emerald-950`}
                />
                <span className="text-[10px] text-slate-400 font-bold mt-1">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Branch / Property Type Breakdown */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-right">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-400" />
            <span>توزيع العقارات حسب المدينة</span>
          </h3>

          <div className="space-y-3 pt-2 text-xs">
            {[
              { city: 'الرياض', count: 42, pct: 45, color: 'bg-emerald-500' },
              { city: 'جدة', count: 28, pct: 30, color: 'bg-teal-500' },
              { city: 'الخبر', count: 19, pct: 15, color: 'bg-amber-500' },
              { city: 'دبي', count: 15, pct: 10, color: 'bg-purple-500' }
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-slate-300 font-bold">
                  <span>{item.city}</span>
                  <span className="text-slate-400">{item.count} عقار ({item.pct}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div style={{ width: `${item.pct}%` }} className={`h-full ${item.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
