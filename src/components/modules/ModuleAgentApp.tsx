import React from 'react';
import { Smartphone, CheckCircle2, User, Building2, MapPin, Target, Wallet, Clock, Plus } from 'lucide-react';
import { User as UserType, Property, Lead, Deal } from '../../types';

interface ModuleAgentAppProps {
  currentUser: UserType;
  properties: Property[];
  leads: Lead[];
  deals: Deal[];
}

export const ModuleAgentApp: React.FC<ModuleAgentAppProps> = ({ currentUser, properties, leads, deals }) => {
  const myProperties = properties.filter(p => p.agentName === currentUser.fullName || currentUser.role === 'super_admin');
  const myDeals = deals.filter(d => d.agentName === currentUser.fullName || currentUser.role === 'super_admin');
  const totalMyCommissions = myDeals.reduce((sum, d) => sum + d.commissionAmount, 0);

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border border-amber-800/50 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Smartphone className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 14: تطبيق الجوال الميداني للوسطاء (Agent Mobile Workspace)</h1>
          </div>
          <p className="text-xs text-amber-200/80 mt-1">تطبيق ميداني مخصص للوسطاء: إضافة عقارات ميدانية، متابعة العمولات المستحقة، وإدارة المعاينات</p>
        </div>
      </div>

      {/* Mobile Agent Workspace Container */}
      <div className="max-w-md mx-auto bg-slate-900 border-4 border-slate-800 rounded-[40px] overflow-hidden shadow-2xl text-right">
        
        {/* Status bar */}
        <div className="bg-slate-950 px-6 py-3 flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800">
          <span>10:15 AM</span>
          <span className="text-emerald-400 font-bold">● متصل أونلاين</span>
          <span>98% ⚡</span>
        </div>

        {/* Profile Card */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={currentUser.avatar} alt="Agent" className="w-10 h-10 rounded-2xl object-cover border border-amber-500" />
            <div>
              <h3 className="font-bold text-xs text-white">{currentUser.fullName}</h3>
              <span className="text-[10px] text-amber-400 font-semibold">وسيط عقاري معتمد</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-300 font-bold text-[10px] border border-amber-500/20">
            {myProperties.length} عقارات
          </span>
        </div>

        {/* Commissions Banner */}
        <div className="p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/10 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block">إجمالي عمولاتي المكتسبة هذا الشهر</span>
            <span className="text-base font-black text-amber-400">{totalMyCommissions.toLocaleString('ar-SA')} SAR</span>
          </div>
          <Wallet className="w-6 h-6 text-amber-400" />
        </div>

        {/* Agent Assigned Properties */}
        <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
          <span className="font-bold text-xs text-slate-300 block">عقاراتي المسندة للتعقيب والبيع:</span>
          {myProperties.map(p => (
            <div key={p.id} className="p-3 rounded-2xl bg-slate-800 border border-slate-700/60 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white block line-clamp-1">{p.title}</span>
                <span className="text-slate-400 text-[10px]">{p.location?.city || ''} - {p.location?.district || ''}</span>
              </div>
              <span className="text-emerald-400 font-bold">{p.price.toLocaleString('ar-SA')} SAR</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
