import React from 'react';
import { 
  Home, Building2, Users, MessageSquare, User, Grid3X3, Sparkles
} from 'lucide-react';

interface MobileBottomTabProps {
  activeTab: string; // 'tab_home' | 'mod_2' | 'mod_3' | 'mod_9' | 'tab_profile'
  onSelectTab: (tabId: string) => void;
  onOpenEnterpriseHub: () => void;
  unreadCount?: number;
}

export const MobileBottomTab: React.FC<MobileBottomTabProps> = ({
  activeTab,
  onSelectTab,
  onOpenEnterpriseHub,
  unreadCount = 0
}) => {
  const tabs = [
    { id: 'tab_home', label: 'الرئيسية', icon: Home },
    { id: 'mod_2', label: 'العقارات', icon: Building2 },
    { id: 'mod_3', label: 'العملاء والصفقات', icon: Users },
    { id: 'mod_9', label: 'المحادثات', icon: MessageSquare, badge: unreadCount },
    { id: 'tab_profile', label: 'حسابي والمزيد', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl safe-area-pb">
      <div className="max-w-md mx-auto sm:max-w-2xl px-3 py-2 flex items-center justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id || 
            (tab.id === 'mod_3' && (activeTab === 'mod_4' || activeTab === 'mod_5')) ||
            (tab.id === 'tab_home' && activeTab === 'mod_10');

          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'tab_profile') {
                  onSelectTab('tab_profile');
                } else {
                  onSelectTab(tab.id);
                }
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 active:scale-95 ${
                isActive 
                  ? 'text-emerald-400 font-bold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Active Pill Indicator */}
              {isActive && (
                <span className="absolute -top-2 w-6 h-1 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
              )}

              <div className="relative p-1">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-emerald-400' : ''}`} />
                
                {/* Optional Badge */}
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                ) : null}
              </div>

              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-extrabold text-emerald-400' : 'font-medium text-slate-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
