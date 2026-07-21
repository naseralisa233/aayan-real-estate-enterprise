import React, { useState } from 'react';
import { 
  Building2, Users, Handshake, Wallet, ArrowUpRight, ArrowDownRight, 
  Search, Sparkles, MapPin, Heart, Phone, MessageCircle, Calendar, 
  ChevronLeft, Plus, Clock, ShieldCheck, CheckCircle2, SlidersHorizontal, Store
} from 'lucide-react';
import { Property, Customer, Lead, Deal, User } from '../../types';

interface ModuleHomeProps {
  currentUser: User;
  properties: Property[];
  deals: Deal[];
  customers: Customer[];
  leads: Lead[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onNavigateToModule: (modId: string) => void;
  onSelectPropertyDetails?: (property: Property) => void;
}

export const ModuleHome: React.FC<ModuleHomeProps> = ({
  currentUser,
  properties,
  deals,
  customers,
  leads,
  favorites,
  onToggleFavorite,
  onNavigateToModule,
  onSelectPropertyDetails
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  // Stats Calculations
  const availableCount = properties.filter(p => p.status === 'متاح').length;
  const rentedCount = properties.filter(p => p.status === 'مؤجر').length;
  const soldCount = properties.filter(p => p.status === 'مباع').length;

  const totalRevenue = deals.reduce((acc, d) => acc + (d.commissionAmount || 0), 0);
  const activeLeads = leads.filter(l => l.status !== 'unqualified').length;

  const filteredProperties = properties.filter(p => {
    const matchSearch = p.title.includes(searchQuery) || (p.location?.city || '').includes(searchQuery);
    const matchCat = selectedCategory === 'الكل' || p.type === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 pb-24 text-right dir-rtl">
      
      {/* Welcome & User Hero Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.fullName}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <CheckCircle2 className="w-2.5 h-2.5 text-slate-950 font-bold" />
              </span>
            </div>
            <div>
              <p className="text-[11px] font-medium text-emerald-400">أهلاً بك مجدداً 👋</p>

              <h1 className="text-base font-black text-white">{currentUser.fullName}</h1>
            </div>
          </div>

          <div className="text-left">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-extrabold text-[10px] border border-emerald-500/30">
              {currentUser.branchName || 'فرع الرياض'}
            </span>
            <p className="text-[10px] text-slate-400 mt-1">21 يوليو 2026</p>
          </div>
        </div>

        {/* Quick Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن عقار، موقع، مرجع..."
            className="w-full pr-10 pl-12 py-3 rounded-2xl bg-slate-800/90 border border-slate-700/70 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-inner"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          <button 
            onClick={() => onNavigateToModule('mod_2')}
            className="absolute left-2 top-2 p-1.5 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold text-xs flex items-center gap-1 transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Stats Scrollable Mobile Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>مؤشرات الأداء والسوق (KPIs)</span>
          </h2>
          <button onClick={() => onNavigateToModule('mod_10')} className="text-emerald-400 text-xs font-bold flex items-center gap-0.5">
            <span>التفاصيل</span>
            <ChevronLeft className="w-3 h-3" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          
          <div className="min-w-[160px] p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg snap-start space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400">العقارات المتاحة</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-white">{availableCount}</p>
            <p className="text-[10px] text-emerald-400 font-medium">من إجمالي {properties.length} عقار</p>
          </div>

          <div className="min-w-[160px] p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg snap-start space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400">المباعة والمؤجرة</span>
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <Handshake className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-white">{soldCount + rentedCount}</p>
            <p className="text-[10px] text-blue-400 font-medium">{soldCount} مباع • {rentedCount} مؤجر</p>
          </div>

          <div className="min-w-[160px] p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg snap-start space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400">إجمالي السعي والعمولات</span>
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <p className="text-lg font-black text-white">{totalRevenue.toLocaleString('ar-SA')} SAR</p>
            <p className="text-[10px] text-purple-400 font-medium">صافي الإيرادات المحصلة</p>
          </div>

          <div className="min-w-[160px] p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg snap-start space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400">العملاء النشطين</span>
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-white">{customers.length}</p>
            <p className="text-[10px] text-teal-400 font-medium">{activeLeads} عميل محتمل جاري</p>
          </div>

        </div>
      </div>

      {/* Category Pills Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
        {['الكل', 'فلل', 'شقق', 'أراضي', 'مكاتب', 'أبراج'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl whitespace-nowrap transition-all ${
              selectedCategory === cat 
                ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20' 
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Properties Feed (Airbnb / Property Finder Luxury Cards) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-sm font-extrabold text-white">العقارات والفرص المتاحة</h2>
            <p className="text-[10px] text-slate-400">استعرض أحدث العروض والفرص المتاحة حصرياً</p>
          </div>
          <button onClick={() => onNavigateToModule('mod_2')} className="text-emerald-400 text-xs font-bold flex items-center gap-0.5">
            <span>الكل ({properties.length})</span>
            <ChevronLeft className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-4">
          {filteredProperties.slice(0, 4).map(prop => {
            const mainImg = prop.media?.[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800';
            const isFav = favorites.includes(prop.id);

            return (
              <div
                key={prop.id}
                className="p-3.5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl hover:border-slate-700 transition space-y-3 active:scale-[0.99]"
              >
                {/* Photo Header */}
                <div className="relative h-48 rounded-2xl overflow-hidden group">
                  <img 
                    src={mainImg} 
                    alt={prop.title}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105" 
                  />

                  {/* Status Badge */}
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black border shadow-md ${
                    prop.status === 'متاح' 
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400' 
                      : 'bg-amber-500 text-slate-950 border-amber-400'
                  }`}>
                    {prop.status}
                  </span>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(prop.id);
                    }}
                    className={`absolute top-3 left-3 p-2 rounded-2xl backdrop-blur-md transition ${
                      isFav ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-950/60 text-slate-200 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  {/* Location Chip */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-slate-200 text-[10px] font-bold flex items-center gap-1 border border-slate-800">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{prop.location?.city || ''} - {prop.location?.district || ''}</span>
                  </div>
                </div>

                {/* Property Specs */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-white line-clamp-1">{prop.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{prop.type} • {prop.purpose}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-base font-black text-emerald-400">{prop.price.toLocaleString('ar-SA')} SAR</p>
                    <p className="text-[9px] text-slate-500 font-mono">#{prop.referenceNumber}</p>
                  </div>
                </div>

                {/* Specs Pill Grid */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300 font-semibold">
                  <div className="flex items-center gap-3">
                    <span>{prop.specs?.bedrooms || 3} غرف</span>
                    <span>•</span>
                    <span>{prop.specs?.bathrooms || 3} حمام</span>
                    <span>•</span>
                    <span>{prop.area} م²</span>
                  </div>

                  <button
                    onClick={() => {
                      if (onSelectPropertyDetails) {
                        onSelectPropertyDetails(prop);
                      } else {
                        onNavigateToModule('mod_2');
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-bold text-xs transition"
                  >
                    التفاصيل
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Shortcuts Grid */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <h3 className="font-extrabold text-xs text-white">الأدوات العقارية السريعة</h3>
        <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
          <button 
            onClick={() => onNavigateToModule('mod_11')}
            className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/50 hover:border-purple-500/40 text-slate-200 flex flex-col items-center gap-1.5 transition"
          >
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>المساعد الذكي</span>
          </button>

          <button 
            onClick={() => onNavigateToModule('mod_6')}
            className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/50 hover:border-blue-500/40 text-slate-200 flex flex-col items-center gap-1.5 transition"
          >
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <Handshake className="w-4 h-4" />
            </div>
            <span>العقود والتوقيع</span>
          </button>

          <button 
            onClick={() => onNavigateToModule('mod_15')}
            className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/50 hover:border-amber-500/40 text-slate-200 flex flex-col items-center gap-1.5 transition"
          >
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Store className="w-4 h-4" />
            </div>
            <span>السوق والحملات</span>
          </button>

          <button 
            onClick={() => onNavigateToModule('mod_19')}
            className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/50 hover:border-emerald-500/40 text-slate-200 flex flex-col items-center gap-1.5 transition"
          >
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
            <span>التقارير المالية</span>
          </button>
        </div>
      </div>

    </div>
  );
};
