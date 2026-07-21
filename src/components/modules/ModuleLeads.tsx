import React, { useState } from 'react';
import { Target, Calendar, Clock, CheckCircle2, PhoneCall, Plus, ArrowLeftRight, UserCheck, Star, MapPin } from 'lucide-react';
import { Lead, FollowUp, Appointment, Viewing, User, LeadStage } from '../../types';
import { ApiService } from '../../services/api';

interface ModuleLeadsProps {
  currentUser: User;
  leads: Lead[];
  followUps: FollowUp[];
  appointments: Appointment[];
  viewings: Viewing[];
  onRefreshData: () => void;
}

export const ModuleLeads: React.FC<ModuleLeadsProps> = ({
  currentUser,
  leads,
  followUps,
  appointments,
  viewings,
  onRefreshData
}) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'followups' | 'calendar' | 'viewings'>('pipeline');
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadBudget, setLeadBudget] = useState(2500000);
  const [leadNotes, setLeadNotes] = useState('');

  const stages: { stage: LeadStage; title: string; color: string }[] = [
    { stage: 'new_lead', title: 'جديد (New)', color: 'bg-blue-500' },
    { stage: 'contacted', title: 'تم التواصل (Contacted)', color: 'bg-amber-500' },
    { stage: 'interested', title: 'مهتم (Interested)', color: 'bg-emerald-500' },
    { stage: 'property_viewing', title: 'معاينة عقار (Viewing)', color: 'bg-purple-500' },
    { stage: 'negotiation', title: 'تفاوض (Negotiation)', color: 'bg-rose-500' }
  ];

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName) return;
    await ApiService.createLead({
      name: leadName,
      phone: leadPhone,
      budget: Number(leadBudget),
      notes: leadNotes
    });
    setLeadName('');
    setLeadPhone('');
    setShowAddLeadModal(false);
    onRefreshData();
  };

  const handleConvertLead = async (leadId: string) => {
    await ApiService.convertLeadToCustomer(leadId);
    onRefreshData();
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Target className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 4: العملاء المحتملين والمتابعات والمواعيد (Leads & Appointments)</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">نظام تتبع المراحل Kanban، التقييم الذكي Lead Scoring، جدولة المعاينات والتقويم</p>
        </div>

        <button
          onClick={() => setShowAddLeadModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة Lead جديد</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 w-fit text-xs font-bold">
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'pipeline' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
        >
          مراحل العملاء Kanban ({leads.length})
        </button>
        <button
          onClick={() => setActiveTab('followups')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'followups' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
        >
          المتابعات اليومية ({followUps.length})
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'calendar' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
        >
          تقويم المواعيد ({appointments.length})
        </button>
        <button
          onClick={() => setActiveTab('viewings')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'viewings' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
        >
          زيارات المعاينة ({viewings.length})
        </button>
      </div>

      {/* KANBAN PIPELINE VIEW */}
      {activeTab === 'pipeline' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto">
          {stages.map(st => {
            const stageLeads = leads.filter(l => l.status === st.stage || (st.stage === 'interested' && l.status === 'interested'));
            return (
              <div key={st.stage} className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 min-w-[220px]">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${st.color}`} />
                    <span className="font-bold text-xs text-white">{st.title}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 rounded-full bg-slate-800">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {stageLeads.map(lead => (
                    <div key={lead.id} className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-md space-y-2 text-right">
                      <div className="flex items-start justify-between">
                        <span className="font-bold text-xs text-white">{lead.name}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                          Score: {lead.score}%
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 line-clamp-2">{lead.requirements}</p>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-700/40">
                        <span>💰 {lead.budget.toLocaleString('ar-SA')} SAR</span>
                        <button
                          onClick={() => handleConvertLead(lead.id)}
                          className="flex items-center gap-1 text-emerald-400 font-bold hover:underline"
                          title="تحويل لعميل دائم"
                        >
                          <UserCheck className="w-3 h-3" />
                          <span>تحويل لعميل</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FOLLOW UPS VIEW */}
      {activeTab === 'followups' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>جدول المتابعات التلقائية المستحقة</span>
          </h3>

          <div className="space-y-2">
            {followUps.map(f => (
              <div key={f.id} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-bold text-white text-sm block">{f.customerName}</span>
                  <p className="text-slate-400 mt-0.5">{f.notes}</p>
                </div>
                <div className="text-left">
                  <span className="text-amber-400 font-bold block">{f.date}</span>
                  <span className="text-[10px] text-slate-500">المسؤول: {f.agentName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* APPOINTMENTS CALENDAR VIEW */}
      {activeTab === 'calendar' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>تقويم المواعيد والاجتماعات العقارية المؤكدة</span>
          </h3>

          <div className="space-y-3">
            {appointments.map(app => (
              <div key={app.id} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{app.customerName}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                      {app.status}
                    </span>
                  </div>
                  <p className="text-slate-400">العقار: {app.propertyTitle}</p>
                  <p className="text-slate-500 flex items-center gap-1 text-[11px]">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{app.location}</span>
                  </p>
                </div>

                <div className="text-left font-mono font-bold text-amber-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                  {app.date} • {app.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEWINGS */}
      {activeTab === 'viewings' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white">سجل المعاينات الميدانية والتقييمات</h3>
          <div className="space-y-3">
            {viewings.map(v => (
              <div key={v.id} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">{v.customerName} - {v.propertyTitle}</span>
                  <span className="text-amber-400 font-bold">{v.result}</span>
                </div>
                <p className="text-slate-400">{v.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md text-right shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">إضافة Lead جديد</h3>
              <button onClick={() => setShowAddLeadModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">اسم العميل المحتمل</label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={e => setLeadName(e.target.value)}
                  placeholder="مثال: سعود بن طلال"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">رقم الهاتف</label>
                <input
                  type="text"
                  value={leadPhone}
                  onChange={e => setLeadPhone(e.target.value)}
                  placeholder="+966500000000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">الميزانية التقديرية (SAR)</label>
                <input
                  type="number"
                  value={leadBudget}
                  onChange={e => setLeadBudget(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">متطلبات العميل والملاحظات</label>
                <textarea
                  rows={3}
                  value={leadNotes}
                  onChange={e => setLeadNotes(e.target.value)}
                  placeholder="فيلا جديدة في شمال الرياض..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition"
                >
                  حفظ
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
