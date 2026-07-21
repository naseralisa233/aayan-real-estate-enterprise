import React, { useState } from 'react';
import { Wrench, Phone, AlertTriangle, CheckCircle2, User, Plus, Clock, ShieldCheck } from 'lucide-react';
import { MaintenanceRequest, Technician, User as UserType } from '../../types';
import { ApiService } from '../../services/api';

interface ModuleMaintenanceProps {
  currentUser: UserType;
  maintenanceRequests: MaintenanceRequest[];
  technicians: Technician[];
  onRefreshData: () => void;
}

export const ModuleMaintenance: React.FC<ModuleMaintenanceProps> = ({
  currentUser,
  maintenanceRequests,
  technicians,
  onRefreshData
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [type, setType] = useState<'كهرباء' | 'سباكة' | 'تكييف' | 'أجهزة' | 'دهان' | 'تنظيف' | 'أمن' | 'عامة'>('تكييف');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'منخفضة' | 'متوسطة' | 'عالية' | 'طارئة'>('متوسطة');
  const [propertyTitle, setPropertyTitle] = useState('شقة الكورنيش بجدة');

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;
    await ApiService.createMaintenanceRequest({
      type,
      description,
      priority,
      propertyTitle,
      customerName: currentUser.fullName
    });
    setDescription('');
    setShowAddModal(false);
    onRefreshData();
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Wrench className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 8: إدارة الصيانة والخدمات العقارية (Maintenance Services)</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">تسجيل الطلبات الطارئة والدورية، تعيين الفنيين المعتمدين، متابعة التكاليف والربط المالي</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition shadow-lg shadow-rose-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>طلب صيانة جديد</span>
        </button>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
        {maintenanceRequests.map(req => (
          <div key={req.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-mono text-xs font-bold text-rose-400">{req.requestNumber}</span>
              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                req.priority === 'طارئة' ? 'bg-rose-500/20 text-rose-400 animate-pulse' : 'bg-amber-500/20 text-amber-300'
              }`}>
                أولوية: {req.priority}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-white">{req.propertyTitle}</h3>
              <p className="text-xs text-slate-400 mt-1">{req.description}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/60 text-xs flex justify-between items-center text-slate-300">
              <span>الفني المسند: <strong className="text-white">{req.technicianName || 'غير معين'}</strong></span>
              <span>التكلفة: <strong className="text-emerald-400">{req.cost} SAR</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Technicians List */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-right">
        <h3 className="font-bold text-sm text-white">شبكة الفنيين المعتمدين والمقاولين</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {technicians.map(tech => (
            <div key={tech.id} className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white block">{tech.name}</span>
                <span className="text-slate-400">{tech.specialization} • ⭐ {tech.rating}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-lg font-bold text-[10px] ${tech.status === 'متاح' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                {tech.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Request Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md text-right shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">إضافة طلب صيانة جديد</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">اسم العقار</label>
                <input
                  type="text"
                  value={propertyTitle}
                  onChange={e => setPropertyTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">نوع الصيانة</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                >
                  <option value="تكييف">تكييف وتبريد</option>
                  <option value="سباكة">سباكة ومياه</option>
                  <option value="كهرباء">كهرباء وإضاءة</option>
                  <option value="دهان">دهان وتشطيب</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">الأولوية</label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                >
                  <option value="منخفضة">منخفضة</option>
                  <option value="متوسطة">متوسطة</option>
                  <option value="عالية">عالية</option>
                  <option value="طارئة">🚨 طارئة جداً</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">وصف المشكلة</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="اصف عطل التكييف أو السباكة..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition"
                >
                  إرسال الطلب
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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
