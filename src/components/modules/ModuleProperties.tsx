import React, { useState } from 'react';
import { 
  Building2, Search, Filter, Plus, MapPin, Eye, Heart, Camera, 
  Upload, FileText, Check, Star, DollarSign, Layers, CheckCircle,
  Phone, MessageCircle, Calendar, Share2, ChevronLeft, SlidersHorizontal, X, Map
} from 'lucide-react';
import { Property, PropertyType, PropertyPurpose, User } from '../../types';
import { ApiService } from '../../services/api';

interface ModulePropertiesProps {
  currentUser: User;
  properties: Property[];
  favorites: string[];
  onRefreshProperties: () => void;
  onToggleFavorite: (id: string) => void;
}

export const ModuleProperties: React.FC<ModulePropertiesProps> = ({
  currentUser,
  properties,
  favorites,
  onRefreshProperties,
  onToggleFavorite
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('الكل');
  const [selectedType, setSelectedType] = useState('الكل');
  const [selectedPurpose, setSelectedPurpose] = useState('الكل');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [selectedPropDetails, setSelectedPropDetails] = useState<Property | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [type, setType] = useState<PropertyType>('فيلا');
  const [purpose, setPurpose] = useState<PropertyPurpose>('للبيع');
  const [price, setPrice] = useState(2500000);
  const [city, setCity] = useState('الرياض');
  const [district, setDistrict] = useState('حطين');
  const [area, setArea] = useState(450);
  const [rooms, setRooms] = useState(5);
  const [bathrooms, setBathrooms] = useState(5);
  const [description, setDescription] = useState('');

  const filtered = properties.filter(p => {
    const matchSearch = p.title.includes(searchTerm) || p.referenceNumber.includes(searchTerm) || p.description.includes(searchTerm);
    const matchCity = selectedCity === 'الكل' || p.location?.city === selectedCity;
    const matchType = selectedType === 'الكل' || p.type === selectedType;
    const matchPurpose = selectedPurpose === 'الكل' || p.purpose === selectedPurpose;
    return matchSearch && matchCity && matchType && matchPurpose;
  });

  const handleCreateProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    await ApiService.createProperty({
      title,
      type,
      purpose,
      price: Number(price),
      area: Number(area),
      rooms: Number(rooms),
      bathrooms: Number(bathrooms),
      description,
      location: {
        country: 'السعودية',
        city,
        district,
        street: 'شارع عام',
        lat: 24.7700,
        lng: 46.6200
      }
    });
    setTitle('');
    setShowAddModal(false);
    onRefreshProperties();
  };

  return (
    <div className="space-y-5 pb-20 text-right dir-rtl">
      
      {/* Mobile Top Controls & Header */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div>
          <h1 className="text-base font-black text-white flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Building2 className="w-4 h-4" />
            </span>
            <span>العقارات والفرص الحصرية</span>
          </h1>
          <p className="text-[10px] text-slate-400">تصفح وقارن أفضل العقارات في المملكة</p>
        </div>

        {['super_admin', 'office_manager', 'agent'].includes(currentUser.role) && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition shadow-md shadow-emerald-500/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة عقار</span>
          </button>
        )}
      </div>

      {/* Floating Search & Filter Bar */}
      <div className="p-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="ابحث باسم العقار، الحي، المرجع..."
            className="w-full pr-9 pl-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-white text-xs focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <button
          onClick={() => setShowFilterSheet(true)}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1 border border-slate-700 transition active:scale-95"
        >
          <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">الفلاتر</span>
        </button>
      </div>

      {/* Filter Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
        {['الكل', 'الرياض', 'جدة', 'الخبر', 'فيلا', 'شقة', 'أرض'].map(chip => {
          const isActive = selectedCity === chip || selectedType === chip || (chip === 'الكل' && selectedCity === 'الكل' && selectedType === 'الكل');
          return (
            <button
              key={chip}
              onClick={() => {
                if (chip === 'الكل') {
                  setSelectedCity('الكل');
                  setSelectedType('الكل');
                } else if (['الرياض', 'جدة', 'الخبر'].includes(chip)) {
                  setSelectedCity(chip);
                } else {
                  setSelectedType(chip);
                }
              }}
              className={`px-3.5 py-1.5 rounded-2xl whitespace-nowrap transition ${
                isActive 
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-sm' 
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* Properties List Feed (Airbnb Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(prop => {
          const mainImg = prop.media?.find(m => m.isMain)?.url || prop.media?.[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800';
          const isFav = favorites.includes(prop.id);

          return (
            <div 
              key={prop.id}
              className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl hover:border-slate-700 transition space-y-3 p-3.5"
            >
              {/* Image Banner */}
              <div className="relative h-52 bg-slate-800 rounded-2xl overflow-hidden group">
                <img 
                  src={mainImg} 
                  alt={prop.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                
                {/* Status Badges */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 font-extrabold text-[10px]">
                    {prop.purpose}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30 font-extrabold text-[10px]">
                    {prop.type}
                  </span>
                </div>

                <button
                  onClick={() => onToggleFavorite(prop.id)}
                  className={`absolute top-3 left-3 p-2 rounded-2xl backdrop-blur-md transition ${
                    isFav ? 'bg-rose-500 text-white shadow-md' : 'bg-slate-950/70 text-slate-200 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>

                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-slate-200 text-[10px] font-bold flex items-center gap-1 border border-slate-800">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{prop.location?.city || ''} - {prop.location?.district || ''}</span>
                </div>
              </div>

              {/* Property Specs & Price */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono text-emerald-400 font-bold">#{prop.referenceNumber}</span>
                  <span>{prop.viewsCount || 120} مشاهدة</span>
                </div>

                <h3 className="font-extrabold text-sm text-white line-clamp-1">{prop.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{prop.description}</p>
              </div>

              {/* Specs & CTA */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-slate-500 block">السعر المطلوب</span>
                  <span className="text-base font-black text-emerald-400">
                    {prop.price.toLocaleString('ar-SA')} <span className="text-xs font-medium text-slate-400">SAR</span>
                  </span>
                </div>

                <button
                  onClick={() => setSelectedPropDetails(prop)}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-xs font-black transition active:scale-95"
                >
                  تأكيد المعاينة
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Filter Bottom Sheet */}
      {showFilterSheet && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end justify-center p-0 sm:p-4 animate-fade-in">
          <div className="absolute inset-0" onClick={() => setShowFilterSheet(false)} />

          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 text-right dir-rtl z-10">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-extrabold text-sm text-white">تصفية العقارات والنتائج</h3>
              <button onClick={() => setShowFilterSheet(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-400 block mb-1">المدينة</label>
                <select
                  value={selectedCity}
                  onChange={e => setSelectedCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  <option value="الكل">كل المدن</option>
                  <option value="الرياض">الرياض</option>
                  <option value="جدة">جدة</option>
                  <option value="الخبر">الخبر</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-400 block mb-1">نوع العقار</label>
                <select
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  <option value="الكل">جميع أنواع العقارات</option>
                  <option value="فيلا">فيلا</option>
                  <option value="شقة">شقة</option>
                  <option value="أرض">أرض</option>
                  <option value="محل تجاري">محل تجاري</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-400 block mb-1">الغرض</label>
                <select
                  value={selectedPurpose}
                  onChange={e => setSelectedPurpose(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  <option value="الكل">الكل</option>
                  <option value="للبيع">للبيع</option>
                  <option value="للإيجار">للإيجار</option>
                  <option value="للاستثمار">للاستثمار</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowFilterSheet(false)}
              className="w-full py-3 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs shadow-md"
            >
              عرض النتائج ({filtered.length})
            </button>
          </div>
        </div>
      )}

      {/* Property Full Mobile Detail Modal with Sticky Bottom Action Bar */}
      {selectedPropDetails && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-between overflow-y-auto">
          
          {/* Top Bar */}
          <div className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md p-4 border-b border-slate-800 flex items-center justify-between text-white">
            <button onClick={() => setSelectedPropDetails(null)} className="p-2 rounded-xl bg-slate-800 text-slate-300">
              <ChevronLeft className="w-5 h-5 rotate-180" />
            </button>
            <span className="font-extrabold text-sm truncate max-w-[200px]">{selectedPropDetails.title}</span>
            <button onClick={() => onToggleFavorite(selectedPropDetails.id)} className="p-2 rounded-xl bg-slate-800 text-rose-400">
              <Heart className={`w-5 h-5 ${favorites.includes(selectedPropDetails.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Details Body */}
          <div className="p-4 space-y-4 max-w-lg mx-auto w-full text-right dir-rtl">
            
            {/* Gallery Images Slider */}
            <div className="space-y-2">
              <img 
                src={selectedPropDetails.media?.[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'} 
                alt={selectedPropDetails.title} 
                className="w-full h-64 object-cover rounded-3xl border border-slate-800 shadow-xl"
              />
              <div className="grid grid-cols-3 gap-2">
                {(selectedPropDetails.media || []).slice(1, 4).map((m, idx) => (
                  <img key={m.id || idx} src={m.url} alt={m.title} className="w-full h-20 object-cover rounded-2xl border border-slate-800" />
                ))}
              </div>
            </div>

            {/* Price & Title */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-extrabold text-xs">
                  {selectedPropDetails.purpose} • {selectedPropDetails.type}
                </span>
                <span className="text-xl font-black text-emerald-400">{selectedPropDetails.price.toLocaleString('ar-SA')} SAR</span>
              </div>
              <h2 className="text-base font-black text-white">{selectedPropDetails.title}</h2>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{selectedPropDetails.location?.city || ''} - {selectedPropDetails.location?.district || ''}</span>
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-2.5 rounded-2xl bg-slate-800/60">
                <span className="text-slate-400 block text-[10px]">المساحة</span>
                <span className="font-extrabold text-white text-sm">{selectedPropDetails.area} م²</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-800/60">
                <span className="text-slate-400 block text-[10px]">الغرف</span>
                <span className="font-extrabold text-white text-sm">{selectedPropDetails.rooms}</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-800/60">
                <span className="text-slate-400 block text-[10px]">الحمامات</span>
                <span className="font-extrabold text-white text-sm">{selectedPropDetails.bathrooms}</span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-2">
              <h3 className="font-bold text-xs text-slate-300">وصف العقار</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{selectedPropDetails.description}</p>
            </div>

            {/* Features List */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-2">
              <h3 className="font-bold text-xs text-slate-300">مميزات وتجهيزات العقار</h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedPropDetails.features.map((f, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20">
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Bottom Bar for Actions */}
          <div className="sticky bottom-0 z-30 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 p-4 shadow-2xl">
            <div className="max-w-lg mx-auto flex items-center gap-2">
              <a
                href="tel:+966501112233"
                className="flex-1 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                <Phone className="w-4 h-4" />
                <span>اتصال مباشر</span>
              </a>

              <a
                href="https://wa.me/966501112233"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-2xl bg-teal-600 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-teal-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب</span>
              </a>

              <button
                onClick={() => {
                  alert('تم إرسال طلب حجز المعاينة بنجاح إلى الوسيط العقاري المسجل');
                  setSelectedPropDetails(null);
                }}
                className="p-3 rounded-2xl bg-slate-800 text-amber-400 hover:text-white font-bold text-xs border border-slate-700"
                title="حجز معاينة"
              >
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 w-full max-w-lg max-h-[90vh] overflow-y-auto text-right shadow-2xl space-y-4 dir-rtl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-extrabold text-sm text-white">إضافة عقار جديد</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateProperty} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-400 block mb-1">عنوان العقار</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="مثال: فيلا مودرن مع مسبح خاص"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-400 block mb-1">نوع العقار</label>
                  <select value={type} onChange={e => setType(e.target.value as PropertyType)} className="w-full p-2 rounded-xl bg-slate-800 text-white">
                    <option value="فيلا">فيلا</option>
                    <option value="شقة">شقة</option>
                    <option value="أرض">أرض</option>
                    <option value="محل تجاري">محل تجاري</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-400 block mb-1">الغرض</label>
                  <select value={purpose} onChange={e => setPurpose(e.target.value as PropertyPurpose)} className="w-full p-2 rounded-xl bg-slate-800 text-white">
                    <option value="للبيع">للبيع</option>
                    <option value="للإيجار">للإيجار</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-400 block mb-1">السعر (SAR)</label>
                  <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full p-2 rounded-xl bg-slate-800 text-white" />
                </div>
                <div>
                  <label className="font-bold text-slate-400 block mb-1">المساحة (م²)</label>
                  <input type="number" value={area} onChange={e => setArea(Number(e.target.value))} className="w-full p-2 rounded-xl bg-slate-800 text-white" />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black">حفظ العقار</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
