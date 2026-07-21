import React, { useState } from 'react';
import { Handshake, DollarSign, Percent, ArrowLeftRight, FileText, CheckCircle2, Plus, ArrowUpRight } from 'lucide-react';
import { Deal, Offer, User } from '../../types';
import { ApiService } from '../../services/api';

interface ModuleDealsProps {
  currentUser: User;
  deals: Deal[];
  onRefreshDeals: () => void;
}

export const ModuleDeals: React.FC<ModuleDealsProps> = ({ currentUser, deals, onRefreshDeals }) => {
  const [showAddDealModal, setShowAddModal] = useState(false);
  const [propertyTitle, setPropertyTitle] = useState('فيلا حطين الفاخرة');
  const [customerName, setCustomerName] = useState('عبد العزيز الراجحي');
  const [amount, setAmount] = useState(4750000);

  const handleCreateDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    await ApiService.createDeal({
      propertyTitle,
      customerName,
      amount: Number(amount)
    });
    setShowAddModal(false);
    onRefreshDeals();
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Handshake className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 5: إدارة الصفقات والمفاوضات والعمولات (Deals & Sales)</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">تتبع دورة البيع والإيجار كاملة، إدارة العروض المالية، حساب عمولات الوسطاء وسجل المفاوضات</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs transition shadow-lg shadow-purple-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء صفقة جديدة</span>
        </button>
      </div>

      {/* Deals Cards */}
      <div className="space-y-4">
        {deals.map(deal => (
          <div key={deal.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-right">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-purple-400 font-bold">{deal.dealNumber}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-[10px]">
                    مرحلة المفاوضات (Negotiation)
                  </span>
                </div>
                <h3 className="font-bold text-base text-white mt-1">{deal.propertyTitle}</h3>
              </div>

              <div className="text-left">
                <span className="text-xs text-slate-400 block">قيمة الصفقة</span>
                <span className="text-xl font-black text-emerald-400">
                  {deal.amount.toLocaleString('ar-SA')} {deal.currency}
                </span>
              </div>
            </div>

            {/* Participants Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
              <div><span className="text-slate-500 block">المشتري / المستأجر:</span><span className="font-bold text-white">{deal.customerName}</span></div>
              <div><span className="text-slate-500 block">المالك / البائع:</span><span className="font-bold text-white">{deal.ownerName}</span></div>
              <div><span className="text-slate-500 block">الوسيط المسؤول:</span><span className="font-bold text-white">{deal.agentName}</span></div>
              <div>
                <span className="text-slate-500 block">عمولة السعي ({deal.commissionPercentage}%):</span>
                <span className="font-bold text-purple-400">{deal.commissionAmount.toLocaleString('ar-SA')} SAR</span>
              </div>
            </div>

            {/* Offers Sub-table */}
            <div className="space-y-2">
              <span className="font-bold text-xs text-slate-300 block">سجل العروض المقدمة والتفاوض:</span>
              <div className="space-y-2">
                {deal.offers.map(off => (
                  <div key={off.id} className="p-3 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-emerald-400 ml-2">{off.amount.toLocaleString('ar-SA')} SAR</span>
                      <span className="text-slate-400">{off.conditions}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      off.status === 'مقبول' ? 'bg-emerald-500/20 text-emerald-300' : off.status === 'مرفوض' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {off.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Modal */}
      {showAddDealModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md text-right shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">إنشاء صفقة جديدة</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">اسم العقار</label>
                <input
                  type="text"
                  required
                  value={propertyTitle}
                  onChange={e => setPropertyTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">اسم العميل</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">المبلغ المتفق عليه (SAR)</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs transition"
                >
                  حفظ الصفقة
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
