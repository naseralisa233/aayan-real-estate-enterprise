import React, { useState } from 'react';
import { Users, Phone, Mail, MapPin, Tag, Calendar, FileText, Plus, Search, Eye, MessageSquare, Star, CheckCircle } from 'lucide-react';
import { Customer, User } from '../../types';

interface ModuleCRMProps {
  currentUser: User;
  customers: Customer[];
  onRefreshCustomers: () => void;
}

export const ModuleCRM: React.FC<ModuleCRMProps> = ({ currentUser, customers, onRefreshCustomers }) => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'buyer' | 'tenant' | 'owner' | 'investor'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filtered = customers.filter(c => {
    const matchType = activeSubTab === 'all' || c.type === activeSubTab;
    const matchSearch = c.fullName.includes(searchTerm) || c.phone.includes(searchTerm) || c.email.includes(searchTerm);
    return matchType && matchSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 3: إدارة العملاء و الـ CRM العقاري (Customer 360)</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">ملف شامل لكل عميل يحتوي التفضيلات، الأنشطة، الملاحظات وعلاقته بالصفقات والمستندات</p>
        </div>
      </div>

      {/* Filter Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex gap-1.5 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-3.5 py-2 rounded-xl transition ${activeSubTab === 'all' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            جميع العملاء ({customers.length})
          </button>
          <button
            onClick={() => setActiveSubTab('buyer')}
            className={`px-3.5 py-2 rounded-xl transition ${activeSubTab === 'buyer' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            المشترين (Buyers)
          </button>
          <button
            onClick={() => setActiveSubTab('tenant')}
            className={`px-3.5 py-2 rounded-xl transition ${activeSubTab === 'tenant' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            المستأجرين (Tenants)
          </button>
          <button
            onClick={() => setActiveSubTab('owner')}
            className={`px-3.5 py-2 rounded-xl transition ${activeSubTab === 'owner' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            الملاك (Owners)
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="بحث بالاسم أو رقم الجوال..."
            className="w-full pr-9 pl-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
          />
        </div>
      </div>

      {/* Customer List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(cust => (
          <div key={cust.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 hover:border-slate-700 transition">
            
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img src={cust.avatar} alt={cust.fullName} className="w-12 h-12 rounded-2xl object-cover border border-teal-500/30" />
                <div>
                  <h3 className="font-bold text-sm text-white">{cust.fullName}</h3>
                  <span className="text-[11px] text-teal-400 font-medium">{cust.city || ''} • {cust.source || ''}</span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20 text-[10px] font-bold">
                {cust.type === 'buyer' ? 'مشتري' : cust.type === 'tenant' ? 'مستأجر' : 'مالك'}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-400 border-y border-slate-800 py-3">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span className="dir-ltr text-right">{cust.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                <span>{cust.email}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {(cust.tags || []).map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-medium">
                  #{t}
                </span>
              ))}
            </div>

            {/* Action 360 View */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
              <span className="text-[10px] text-slate-500">المسؤول: {cust.assignedAgentName}</span>
              <button
                onClick={() => setSelectedCustomer(cust)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs transition"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>ملف 360°</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Customer 360 Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-right shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img src={selectedCustomer.avatar} alt={selectedCustomer.fullName} className="w-12 h-12 rounded-2xl object-cover border border-teal-500" />
                <div>
                  <h3 className="font-bold text-base text-white">{selectedCustomer.fullName}</h3>
                  <p className="text-xs text-teal-400">{selectedCustomer.phone} • {selectedCustomer.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-slate-400 hover:text-white text-lg">✕</button>
            </div>

            {/* Customer Preferences */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-2 text-xs">
              <h4 className="font-bold text-teal-400">تفضيلات وسلوك العميل المطلوبة:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-300">
                <div><span className="text-slate-500 block">نوع العقار:</span>{selectedCustomer.preferences?.propertyType || '-'}</div>
                <div><span className="text-slate-500 block">الغرض:</span>{selectedCustomer.preferences?.purpose || '-'}</div>
                <div><span className="text-slate-500 block">الحد الأقصى للميزانية:</span>{selectedCustomer.preferences?.maxBudget ? selectedCustomer.preferences.maxBudget.toLocaleString('ar-SA') : '0'} SAR</div>
                <div><span className="text-slate-500 block">المدينة:</span>{selectedCustomer.preferences?.city || '-'}</div>
                <div><span className="text-slate-500 block">الحد الأدنى للمساحة:</span>{selectedCustomer.preferences?.minArea || '0'} م²</div>
              </div>
            </div>

            {/* Customer Activity Timeline */}
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-white">سجل أنشطة وتفاعلات العميل Timeline:</h4>
              <div className="space-y-2">
                {(selectedCustomer.activities || []).map(act => (
                  <div key={act.id} className="p-3 rounded-xl bg-slate-800 border border-slate-700/60 text-xs flex justify-between items-start">
                    <div>
                      <span className="font-bold text-white block">{act.description}</span>
                      <span className="text-slate-400 text-[11px]">{act.result}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{act.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
