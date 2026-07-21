import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  trend?: string;
  isPositive?: boolean;
  color?: 'emerald' | 'amber' | 'blue' | 'purple' | 'rose' | 'teal';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  icon: Icon,
  trend,
  isPositive = true,
  color = 'emerald'
}) => {
  const colorsMap = {
    emerald: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
    blue: 'from-blue-500/20 to-cyan-500/10 text-blue-400 border-blue-500/30',
    purple: 'from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30',
    rose: 'from-rose-500/20 to-pink-500/10 text-rose-400 border-rose-500/30',
    teal: 'from-teal-500/20 to-emerald-500/10 text-teal-400 border-teal-500/30'
  };

  const iconBgMap = {
    emerald: 'bg-emerald-500/20 text-emerald-400',
    amber: 'bg-amber-500/20 text-amber-400',
    blue: 'bg-blue-500/20 text-blue-400',
    purple: 'bg-purple-500/20 text-purple-400',
    rose: 'bg-rose-500/20 text-rose-400',
    teal: 'bg-teal-500/20 text-teal-400'
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorsMap[color]} border backdrop-blur-sm shadow-md transition hover:scale-[1.01]`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-400">{title}</p>
          <h3 className="text-2xl font-black text-white mt-1 tracking-tight">{value}</h3>
          {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-xl ${iconBgMap[color]} shadow-inner`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-3 pt-3 border-t border-slate-700/40 flex items-center gap-1.5 text-xs font-semibold">
          <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
            {isPositive ? '↑' : '↓'} {trend}
          </span>
          <span className="text-slate-500">مقارنة بالشهر الماضي</span>
        </div>
      )}
    </div>
  );
};
