import React from 'react';
import { Network, Building, Users, GitFork, ShieldCheck, ArrowRightLeft } from 'lucide-react';
import { Branch, User } from '../../types';

interface ModuleEnterpriseProps {
  currentUser: User;
  branches: Branch[];
}

export const ModuleEnterprise: React.FC<ModuleEnterpriseProps> = ({ currentUser, branches }) => {
  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Network className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 16: الهيكل المؤسسي المتقدم والفروع (Enterprise & Branches)</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">إدارة متعددة الشركات والشركات التابعة، نقل الموظفين بين الفروع، وعزل قاعدة البيانات Multi-Tenant</p>
        </div>
      </div>

      {/* Branches List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
        {branches.map(br => (
          <div key={br.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-base text-white">{br.name}</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                {br.status}
              </span>
            </div>

            <div className="space-y-1 text-xs text-slate-400">
              <p>المدينة: <strong className="text-white">{br.city}</strong></p>
              <p>مدير الفرع: <strong className="text-white">{br.managerName}</strong></p>
              <p>عدد الموظفين: <strong className="text-purple-400">{br.employeesCount} موظف</strong></p>
              <p>الهاتف: <span className="dir-ltr text-slate-300">{br.phone}</span></p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
