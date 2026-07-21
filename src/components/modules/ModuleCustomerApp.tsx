import React, { useState } from 'react';
import { Smartphone, Search, Heart, MapPin, Eye, Building2, Filter, ArrowLeftRight, MessageSquare, CheckCircle } from 'lucide-react';
import { Property, User } from '../../types';

interface ModuleCustomerAppProps {
  currentUser: User;
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const ModuleCustomerApp: React.FC<ModuleCustomerAppProps> = ({
  currentUser,
  properties,
  favorites,
  onToggleFavorite
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const handleToggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(item => item !== id));
    } else {
      if (compareList.length >= 3) {
        alert('يمكنك مقارنة 3 عقارات كحد أقصى في وقت واحد');
        return;
      }
      setCompareList([...compareList, id]);
    }
  };

  const comparedProperties = properties.filter(p => compareList.includes(p.id));

  return (
    <div className="space-y-6">
      
      {/* Mobile Simulator Frame */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-slate-900 border border-teal-800/50 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Smartphone className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 13: تطبيق جوال العملاء المستقل (Customer Mobile App)</h1>
          </div>
          <p className="text-xs text-teal-200/80 mt-1">تجربة جوال فاخرة فائقة السرعة للعملاء: تصفح حقيقي، مقارنة عقارات، حجز معاينات ومفضلة</p>
        </div>

        {compareList.length > 0 && (
          <button
            onClick={() => setShowCompareModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs transition shadow-lg shadow-teal-500/20"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>مقارنة العقارات المحددة ({compareList.length})</span>
          </button>
        )}
      </div>

      {/* Customer Mobile Layout Container */}
      <div className="max-w-md mx-auto bg-slate-900 border-4 border-slate-800 rounded-[40px] overflow-hidden shadow-2xl text-right">
        
        {/* Top Status Bar Simulator */}
        <div className="bg-slate-950 px-6 py-3 flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800">
          <span>9:41 AM</span>
          <div className="w-16 h-3 bg-slate-800 rounded-full" />
          <span>100% ⚡</span>
        </div>

        {/* Mobile Header */}
        <div className="p-4 bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400">مرحباً بك مجدداً 👋</span>
              <h2 className="font-bold text-sm text-white">{currentUser.fullName}</h2>
            </div>
            <img src={currentUser.avatar} alt="User" className="w-8 h-8 rounded-full border border-teal-500" />
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="ابحث عن منزل أحلامك..."
              className="w-full pr-9 pl-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
            />
          </div>
        </div>

        {/* Mobile Feed */}
        <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
          {properties.map(p => {
            const isFav = favorites.includes(p.id);
            const isComp = compareList.includes(p.id);

            return (
              <div key={p.id} className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-2">
                <div className="relative h-40 rounded-xl overflow-hidden">
                  <img src={p.media?.[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'} alt={p.title} className="w-full h-full object-cover" />
                  <button
                    onClick={() => onToggleFavorite(p.id)}
                    className="absolute top-2 left-2 p-1.5 rounded-xl bg-slate-950/80 text-white"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 text-emerald-400 text-[10px] font-bold">
                    {p.purpose}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-xs text-white line-clamp-1">{p.title}</h3>
                  <p className="text-[10px] text-slate-400">{p.location.city} - {p.location.district}</p>
                  <p className="text-sm font-black text-emerald-400 mt-1">{p.price.toLocaleString('ar-SA')} SAR</p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-700/50 text-[11px]">
                  <button
                    onClick={() => handleToggleCompare(p.id)}
                    className={`px-2.5 py-1 rounded-lg font-bold border ${isComp ? 'bg-teal-500 text-slate-950 border-teal-500' : 'bg-slate-700 text-slate-300 border-slate-600'}`}
                  >
                    {isComp ? '✓ محدد للمقارنة' : '+ قارن العقار'}
                  </button>

                  <button className="text-xs font-bold text-teal-400 hover:underline">
                    طلب معاينة 📅
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-3xl text-right shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">جدول مقارنة العقارات المحددة</h3>
              <button onClick={() => setShowCompareModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {comparedProperties.map(p => (
                <div key={p.id} className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
                  <h4 className="font-bold text-white line-clamp-1">{p.title}</h4>
                  <p className="text-emerald-400 font-bold">{p.price.toLocaleString('ar-SA')} SAR</p>
                  <p className="text-slate-400">المساحة: {p.area} م²</p>
                  <p className="text-slate-400">الغرف: {p.rooms}</p>
                  <p className="text-slate-400">النوع: {p.type}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button onClick={() => setShowCompareModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs">
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
