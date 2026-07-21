import React from 'react';
import { 
  X, FileText, Wallet, Wrench, Sparkles, Store, GitMerge, 
  Workflow, WifiOff, FileSpreadsheet, Shield, Lock, Rocket, 
  Target, Handshake, Users, Building2, ChevronLeft
} from 'lucide-react';
import { User } from '../../types';

interface MoreModulesSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSelectModule: (modId: string) => void;
}

export const MoreModulesSheet: React.FC<MoreModulesSheetProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectModule
}) => {
  if (!isOpen) return null;

  const moduleItems = [
    { id: 'mod_6', title: 'العقود والتوقيع الرقمي', desc: 'صياغة العقود والتوقع الرقمي المعتمد', icon: FileText, color: 'text-blue-400 bg-blue-500/15 border-blue-500/30' },
    { id: 'mod_7', title: 'الإدارة المالية والفواتير', desc: 'سجل السعي والإيرادات وضريبة 15%', icon: Wallet, color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' },
    { id: 'mod_8', title: 'إدارة الصيانة والخدمات', desc: 'بلاغات الصيانة والمقاولين والفنيين', icon: Wrench, color: 'text-rose-400 bg-rose-500/15 border-rose-500/30' },
    { id: 'mod_11', title: 'مساعد الذكاء الاصطناعي', desc: 'توليد الوصف وتحليل الصفقات والتنبؤات', icon: Sparkles, color: 'text-purple-400 bg-purple-500/15 border-purple-500/30' },
    { id: 'mod_15', title: 'السوق العقاري والحملات', desc: 'إدارة الإعلانات الممتازة وتوليد QR', icon: Store, color: 'text-amber-400 bg-amber-500/15 border-amber-500/30' },
    { id: 'mod_16', title: 'إدارة الفروع والمؤسسة', desc: 'ربط الفروع والصلاحيات الإقليمية', icon: GitMerge, color: 'text-teal-400 bg-teal-500/15 border-teal-500/30' },
    { id: 'mod_17', title: 'محرك الأتمتة الذكي', desc: 'قواعد الإسناد والتذكيرات التلقائية', icon: Workflow, color: 'text-indigo-400 bg-indigo-500/15 border-indigo-500/30' },
    { id: 'mod_18', title: 'المزامنة بدون إنترنت', desc: 'العمل الميداني وإدارة الكاش المحلي', icon: WifiOff, color: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30' },
    { id: 'mod_19', title: 'مركز التقارير والتصدير', desc: 'تقارير Excel/CSV والإحصائيات', icon: FileSpreadsheet, color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30' },
    { id: 'mod_12', title: 'إعدادات الأمان والتدقيق', desc: 'سجل الأنشطة والمفاتيح والتراخيص', icon: Shield, color: 'text-slate-300 bg-slate-800 border-slate-700' },
    { id: 'mod_1', title: 'المستخدمين والصلاحيات', desc: 'أدوار الفريق وإدارة الحسابات', icon: Lock, color: 'text-yellow-400 bg-yellow-500/15 border-yellow-500/30' },
    { id: 'mod_20', title: 'فحص جاهزية الإنتاج', desc: 'تدقيق الخادم وقواعد البيانات v1.0', icon: Rocket, color: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end justify-center p-0 sm:p-4 animate-fade-in">
      
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sheet Modal */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto z-10 text-right dir-rtl">
        
        {/* Handle Bar & Header */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-1.5 rounded-full bg-slate-700" />
          <div className="w-full flex items-center justify-between pt-1 pb-2 border-b border-slate-800">
            <div>
              <h2 className="text-base font-black text-white">المركز العقاري المؤسسي</h2>
              <p className="text-[11px] text-slate-400">إدارة الأدوات والوحدات المتقدمة</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {moduleItems.map(item => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectModule(item.id);
                  onClose();
                }}
                className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition text-right flex items-start gap-3 active:scale-[0.98]"
              >
                <div className={`p-2.5 rounded-2xl border ${item.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-100 truncate">{item.title}</h3>
                    <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
};
