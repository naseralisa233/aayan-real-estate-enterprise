import React, { useState } from 'react';
import { Wallet, DollarSign, ArrowDownRight, ArrowUpRight, FileText, CheckCircle, Plus, CreditCard, PieChart } from 'lucide-react';
import { Invoice, Expense, User } from '../../types';
import { StatCard } from '../common/StatCard';

interface ModuleFinanceProps {
  currentUser: User;
  invoices: Invoice[];
  expenses: Expense[];
  onRefreshData: () => void;
}

export const ModuleFinance: React.FC<ModuleFinanceProps> = ({ currentUser, invoices, expenses, onRefreshData }) => {
  const [activeSubTab, setActiveSubTab] = useState<'invoices' | 'expenses' | 'installments'>('invoices');

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const netRevenue = totalInvoiced - totalExpenses;

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Wallet className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 7: النظام المالي والفواتير والمصروفات (Financial Management)</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">متابعة الفواتير الإلكترونية، جدولة الأقساط، العمولات المستحقة، المصروفات التشغيلية والتقارير المالية</p>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="إجمالي الفواتير والعمولات الصادرة"
          value={`${totalInvoiced.toLocaleString('ar-SA')} SAR`}
          icon={Wallet}
          color="purple"
          trend="+18%"
        />
        <StatCard
          title="إجمالي المصروفات التشغيلية"
          value={`${totalExpenses.toLocaleString('ar-SA')} SAR`}
          icon={ArrowDownRight}
          color="rose"
        />
        <StatCard
          title="صافي الأرباح والإيرادات"
          value={`${netRevenue.toLocaleString('ar-SA')} SAR`}
          icon={ArrowUpRight}
          color="emerald"
          trend="+22%"
        />
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 w-fit text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('invoices')}
          className={`px-4 py-2 rounded-xl transition ${activeSubTab === 'invoices' ? 'bg-purple-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          الفواتير والعمولات ({invoices.length})
        </button>
        <button
          onClick={() => setActiveSubTab('expenses')}
          className={`px-4 py-2 rounded-xl transition ${activeSubTab === 'expenses' ? 'bg-purple-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          المصروفات التشغيلية ({expenses.length})
        </button>
      </div>

      {/* Invoices List */}
      {activeSubTab === 'invoices' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-right">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-slate-300">
              <thead className="bg-slate-800/60 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">رقم الفاتورة</th>
                  <th className="p-3">النوع</th>
                  <th className="p-3">العميل</th>
                  <th className="p-3">العقار</th>
                  <th className="p-3">المبلغ الصافي</th>
                  <th className="p-3">الضريبة 15%</th>
                  <th className="p-3">الإجمالي (VAT Inc)</th>
                  <th className="p-3">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3 font-mono font-bold text-purple-400">{inv.invoiceNumber}</td>
                    <td className="p-3 font-bold text-white">{inv.type}</td>
                    <td className="p-3 text-slate-300">{inv.customerName}</td>
                    <td className="p-3 text-slate-400">{inv.propertyTitle}</td>
                    <td className="p-3">{inv.amount.toLocaleString('ar-SA')} SAR</td>
                    <td className="p-3 text-slate-500">{inv.tax.toLocaleString('ar-SA')} SAR</td>
                    <td className="p-3 font-bold text-emerald-400">{inv.total.toLocaleString('ar-SA')} SAR</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Expenses List */}
      {activeSubTab === 'expenses' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-right">
          <div className="space-y-3">
            {expenses.map(exp => (
              <div key={exp.id} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs">
                <div>
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-bold text-[10px] ml-2">
                    {exp.category}
                  </span>
                  <span className="text-white font-bold">{exp.description}</span>
                </div>
                <div className="text-left">
                  <span className="text-rose-400 font-bold text-sm block">-{exp.amount.toLocaleString('ar-SA')} SAR</span>
                  <span className="text-[10px] text-slate-500">{exp.date} • بواسطة: {exp.createdBy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
