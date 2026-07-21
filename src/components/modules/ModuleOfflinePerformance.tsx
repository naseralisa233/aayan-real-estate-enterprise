import React, { useState } from 'react';
import { Wifi, WifiOff, HardDrive, RefreshCw, CheckCircle2, Zap, Cpu, Database } from 'lucide-react';
import { User } from '../../types';

interface ModuleOfflinePerformanceProps {
  currentUser: User;
}

export const ModuleOfflinePerformance: React.FC<ModuleOfflinePerformanceProps> = ({ currentUser }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [syncQueueCount, setSyncQueueCount] = useState(0);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const handleSimulateSync = () => {
    setSyncStatus('جاري مزامنة بيانات الأوفلاين مع خادم MongoDB الرئيسي...');
    setTimeout(() => {
      setSyncStatus('تمت المزامنة بنجاح! جميع البيانات محدثة 100%');
      setSyncQueueCount(0);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Zap className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 18: العمل بدون انترنت الميداني والأداء المتقدم (Offline First)</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">تخزين محلي مؤقت IndexedDB / LocalStorage، طابور مزامنة الميدانيين Sync Queue، وسرعة استجابة فائقة</p>
        </div>

        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            isOnline ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
          }`}
        >
          {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          <span>{isOnline ? 'الحالة: أونلاين (Online)' : 'الحالة: أوفلاين (Offline Simulation)'}</span>
        </button>
      </div>

      {/* Sync Queue Inspector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
        
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-teal-400" />
            <span>حالة ذاكرة التخزين المحلية (Local Storage Inspector)</span>
          </h3>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-800 flex justify-between">
              <span>قاعدة البيانات المحلية:</span>
              <span className="font-mono text-emerald-400 font-bold">AAYAN_LOCAL_ERP_DB</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800 flex justify-between">
              <span>حجم البيانات المخزنة:</span>
              <span className="font-mono text-teal-300 font-bold">2.8 MB / 50 MB</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800 flex justify-between">
              <span>العملاء والعقارات المحفوظة:</span>
              <span className="font-bold text-white">متاحة بدون إنترنت</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-teal-400" />
            <span>طابور المزامنة التلقائية (Background Sync Queue)</span>
          </h3>

          <p className="text-xs text-slate-400">
            عند العمل بدون إنترنت، يتم حفظ التعديلات في طابور محلي ومزامنتها تلقائياً فور عودة الاتصال بدون فقدان أي بيانات.
          </p>

          <button
            onClick={handleSimulateSync}
            className="w-full py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span>بدء المزامنة اليدوية الآن</span>
          </button>

          {syncStatus && (
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-300 font-medium">
              {syncStatus}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
