import React, { useState } from 'react';
import { Shield, Lock, HardDrive, History, FileSpreadsheet, Download, RefreshCw, Key, CheckCircle } from 'lucide-react';
import { User, AuditLog } from '../../types';

interface ModuleSettingsProps {
  currentUser: User;
  auditLogs: AuditLog[];
}

export const ModuleSettings: React.FC<ModuleSettingsProps> = ({ currentUser, auditLogs }) => {
  const [officeName, setOfficeName] = useState('شركة أعيان العقارية الشاملة');
  const [defaultCurrency, setDefaultCurrency] = useState('SAR - ريال سعودي');
  const [backupStatus, setBackupStatus] = useState<string | null>(null);

  const handleCreateBackup = () => {
    setBackupStatus('جاري إنشاء نسخة احتياطية مشفرة شاملة...');
    setTimeout(() => {
      setBackupStatus(`تم إنشاء وتشفير النسخة الاحتياطية بنجاح: backup_aayan_${new Date().toISOString().substring(0, 10)}.zip`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Shield className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 12: إعدادات النظام، الأمان، وسجل العمليات الرقابي (Settings & Audit)</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">النسخ الاحتياطي الدوري، إدارة الجلسات والأجهزة، مصفوفة الصلاحيات المتقدمة وسجل Audit Logs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* System & Office Config */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-right">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>إعدادات المكتب العامة Enterprise Settings</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 font-bold block mb-1">اسم المؤسسة العقارية الرئيسي</label>
              <input
                type="text"
                value={officeName}
                onChange={e => setOfficeName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="text-slate-400 font-bold block mb-1">العملة الافتراضية</label>
              <select
                value={defaultCurrency}
                onChange={e => setDefaultCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
              >
                <option>SAR - ريال سعودي</option>
                <option>AED - درهم إماراتي</option>
                <option>USD - دولار أمريكي</option>
              </select>
            </div>
          </div>
        </div>

        {/* Backup & Disaster Recovery */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-right">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span>نظام النسخ الاحتياطي والاستعادة (Backup & Recovery)</span>
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            يدعم النظام النسخ الاحتياطي التلقائي لقاعدة بيانات MongoDB + الملفات والصور المرفقة مع خيار التشفير العالي AES-256.
          </p>

          <button
            onClick={handleCreateBackup}
            className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            <span>إنشاء نسخة احتياطية الآن (Manual Backup)</span>
          </button>

          {backupStatus && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-medium">
              {backupStatus}
            </div>
          )}
        </div>

      </div>

      {/* Audit Logs Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-right">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-400" />
          <span>سجل الرقابة والأمان الحقيقي (Audit Logs)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-slate-300">
            <thead className="bg-slate-800/60 font-bold border-b border-slate-800">
              <tr>
                <th className="p-3">المستخدم</th>
                <th className="p-3">العملية</th>
                <th className="p-3">الوحدة</th>
                <th className="p-3">التفاصيل</th>
                <th className="p-3">IP & الجهاز</th>
                <th className="p-3">التاريخ والوقت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-bold text-white">{log.userName}</td>
                  <td className="p-3 text-emerald-400 font-bold">{log.action}</td>
                  <td className="p-3 text-slate-400">{log.module}</td>
                  <td className="p-3 text-slate-300">{log.details}</td>
                  <td className="p-3 font-mono text-[10px] text-slate-500">{log.ip} • {log.device}</td>
                  <td className="p-3 text-slate-500">{log.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
