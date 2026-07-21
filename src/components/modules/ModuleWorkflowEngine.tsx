import React, { useState } from 'react';
import { Zap, Play, Plus, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';
import { WorkflowRule, User } from '../../types';
import { ApiService } from '../../services/api';

interface ModuleWorkflowEngineProps {
  currentUser: User;
  workflowRules: WorkflowRule[];
  onRefreshRules: () => void;
}

export const ModuleWorkflowEngine: React.FC<ModuleWorkflowEngineProps> = ({ currentUser, workflowRules, onRefreshRules }) => {
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);
  const [title, setTitle] = useState('');
  const [trigger, setTrigger] = useState('lead_created');
  const [action, setAction] = useState('assign_agent');

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    await ApiService.createWorkflowRule({
      title,
      trigger,
      condition: 'المدينة = الرياض',
      action
    });
    setTitle('');
    setShowAddRuleModal(false);
    onRefreshRules();
  };

  const handleToggleRule = async (id: string, active: boolean) => {
    await ApiService.toggleWorkflowRule(id, !active);
    onRefreshRules();
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border border-amber-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Zap className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 17: محرك الأتمتة وقواعد العمل الذكية (Automation Engine)</h1>
          </div>
          <p className="text-xs text-amber-200/80 mt-1">إنشاء قواعد التشغيل التلقائية (Trigger → Condition → Action) وتوزيع العملاء الذكي</p>
        </div>

        <button
          onClick={() => setShowAddRuleModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>قاعدة أتمتة جديدة</span>
        </button>
      </div>

      {/* Workflow Rules List */}
      <div className="space-y-4 text-right">
        {workflowRules.map(rule => (
          <div key={rule.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm text-white">{rule.title}</h3>
              </div>

              <button
                onClick={() => handleToggleRule(rule.id, rule.isActive)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                  rule.isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'
                }`}
              >
                {rule.isActive ? '✓ مفعلة تعمل الآن' : 'معطلة'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-800/60 p-3 rounded-2xl text-xs">
              <div><span className="text-slate-500 block">المُحَفِّز (Trigger):</span><span className="text-amber-400 font-bold">{rule.trigger}</span></div>
              <div><span className="text-slate-500 block">الشرط (Condition):</span><span className="text-white font-bold">{rule.condition}</span></div>
              <div><span className="text-slate-500 block">الإجراء (Action):</span><span className="text-emerald-400 font-bold">{rule.action}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md text-right shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">إضافة قاعدة أتمتة جديدة</h3>
              <button onClick={() => setShowAddRuleModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">عنوان القاعدة</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="مثال: إرسال واتساب ترحيبي عند تسجيل عميل جديد"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">الحدث المُحَفِّز Trigger</label>
                <select
                  value={trigger}
                  onChange={e => setTrigger(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                >
                  <option value="lead_created">تسجيل Lead جديد</option>
                  <option value="contract_signed">توقيع عقد جديد</option>
                  <option value="maintenance_submitted">طلب صيانة طارئ</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">الإجراء التلقائي Action</label>
                <select
                  value={action}
                  onChange={e => setAction(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                >
                  <option value="assign_agent">توزيع العميل تلقائياً لأسرع وسيط متاح</option>
                  <option value="send_whatsapp">إرسال رسالة واتساب آلية</option>
                  <option value="notify_manager">تنبيه مدير المكتب فوراً</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition"
                >
                  تفعيل القاعدة
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddRuleModal(false)}
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
