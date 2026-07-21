import React from 'react';
import { FileSpreadsheet, Download, FileText, BarChart3, Printer, CheckCircle2 } from 'lucide-react';
import { Property, Deal, Customer, Invoice } from '../../types';
import { ApiService } from '../../services/api';

interface ModuleBIReportsProps {
  properties: Property[];
  deals: Deal[];
  customers: Customer[];
  invoices: Invoice[];
}

export const ModuleBIReports: React.FC<ModuleBIReportsProps> = ({ properties, deals, customers, invoices }) => {
  
  const handleExportCSV = async (type: string) => {
    try {
      const csvContent = await ApiService.exportReportCSV(type);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `aayan_report_${type}_${new Date().toISOString().substring(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FileSpreadsheet className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 19: مركز التقارير المتقدمة والتصدير (BI & Exports)</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">توليد تقارير الأداء المالي والتسويقي المعتمدة، تصدير ملفات Excel/CSV وجدولة التقارير التلقائية</p>
        </div>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
        
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-white">تقرير مبيعات العقارات والفرز</h3>
          <p className="text-xs text-slate-400">تصدير شامل لجميع العقارات المتاحة والمباعة مع بيانات المساحات والأسعار.</p>
          <button
            onClick={() => handleExportCSV('properties')}
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            <span>تصدير CSV / Excel</span>
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 w-fit">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-white">تقرير الصفقات والعمولات</h3>
          <p className="text-xs text-slate-400">سجل الصفقات المغلقة وقيمة السعي المحصل والمستحق لكل وسيط.</p>
          <button
            onClick={() => handleExportCSV('deals')}
            className="w-full py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            <span>تصدير CSV / Excel</span>
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 w-fit">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-white">تقرير الفواتير والإيرادات</h3>
          <p className="text-xs text-slate-400">تصدير الفواتير الضريبية والإقرار الضريبي لضريبة القيمة المضافة 15%.</p>
          <button
            onClick={() => handleExportCSV('invoices')}
            className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            <span>تصدير CSV / Excel</span>
          </button>
        </div>

      </div>

    </div>
  );
};
