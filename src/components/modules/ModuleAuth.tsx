import React, { useState } from 'react';
import { User, Shield, Key, Mail, Phone, UserCheck, Plus, CheckCircle2, Lock, UserCog } from 'lucide-react';
import { User as UserType, UserRole } from '../../types';
import { ApiService } from '../../services/api';

interface ModuleAuthProps {
  currentUser: UserType;
  users: UserType[];
  onRefreshUsers: () => void;
}

export const ModuleAuth: React.FC<ModuleAuthProps> = ({ currentUser, users, onRefreshUsers }) => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('agent');

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    await ApiService.createUser({
      fullName,
      email,
      phone,
      role
    });
    setFullName('');
    setEmail('');
    setPhone('');
    setShowAddUserModal(false);
    onRefreshUsers();
  };

  const rolesConfig: Record<UserRole, { title: string; color: string; bg: string }> = {
    super_admin: { title: 'المدير العام (Super Admin)', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
    office_manager: { title: 'مدير المكتب (Office Manager)', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
    agent: { title: 'وسيط عقاري (Agent)', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
    accountant: { title: 'محاسب (Accountant)', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' },
    maintenance: { title: 'موظف صيانة (Maintenance)', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' },
    customer: { title: 'عميل (Customer)', color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/30' }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Shield className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 1: إدارة المستخدمين والصلاحيات (Auth & RBAC)</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">نظام دخول آمن بدعم JWT وتوثيق الأدوار والمستويات الـ 6 كاملة</p>
        </div>

        {currentUser.role === 'super_admin' && (
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مستخدم جديد</span>
          </button>
        )}
      </div>

      {/* Role Matrix Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(rolesConfig).map(([key, cfg]) => {
          const count = users.filter(u => u.role === key).length;
          return (
            <div key={key} className={`p-4 rounded-2xl border ${cfg.bg} flex items-center justify-between`}>
              <div>
                <span className={`text-xs font-bold ${cfg.color}`}>{cfg.title}</span>
                <p className="text-lg font-black text-white mt-1">{count} مستخدمين</p>
              </div>
              <UserCog className={`w-8 h-8 opacity-40 ${cfg.color}`} />
            </div>
          );
        })}
      </div>

      {/* Users Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>قائمة المستخدمين المسجلين في النظام ({users.length})</span>
          </h2>
          <span className="text-xs text-slate-400">حماية تشفير Bcrypt + JWT Refresh Tokens</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="p-3">المستخدم</th>
                <th className="p-3">البريد الإلكتروني</th>
                <th className="p-3">الهاتف</th>
                <th className="p-3">الدور</th>
                <th className="p-3">الفرع</th>
                <th className="p-3">الحالة</th>
                <th className="p-3">آخر تسجيل دخول</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 flex items-center gap-2.5">
                    <img src={u.avatar} alt={u.fullName} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                    <span className="font-bold text-white">{u.fullName}</span>
                  </td>
                  <td className="p-3 text-slate-400">{u.email}</td>
                  <td className="p-3 dir-ltr text-right">{u.phone}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${rolesConfig[u.role].bg} ${rolesConfig[u.role].color}`}>
                      {rolesConfig[u.role].title.split('(')[0]}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{u.branchName}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>نشط</span>
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{u.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 text-right shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">إضافة مستخدم جديد</h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="مثال: عبد الله بن حمد"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="user@aayan.sa"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">رقم الهاتف</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+966500000000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">الدور والصلاحيات</label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value as UserRole)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                >
                  <option value="super_admin">المدير العام (Super Admin)</option>
                  <option value="office_manager">مدير المكتب (Office Manager)</option>
                  <option value="agent">وسيط عقاري (Agent)</option>
                  <option value="accountant">محاسب (Accountant)</option>
                  <option value="maintenance">موظف صيانة (Maintenance)</option>
                  <option value="customer">عميل (Customer)</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition"
                >
                  حفظ المستخدم
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
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
