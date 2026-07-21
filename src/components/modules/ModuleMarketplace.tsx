import React, { useState } from 'react';
import { Store, QrCode, Megaphone, Star, Share2, Eye, Building2, CheckCircle2 } from 'lucide-react';
import { Property, MarketingCampaign } from '../../types';

interface ModuleMarketplaceProps {
  properties: Property[];
  marketingCampaigns: MarketingCampaign[];
}

export const ModuleMarketplace: React.FC<ModuleMarketplaceProps> = ({ properties, marketingCampaigns }) => {
  const [selectedPropQr, setSelectedPropQr] = useState<Property | null>(null);

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Store className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 15: السوق العقاري العام والحملات التسويقية (Marketplace & Marketing)</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">نشر العقارات في البوابة العامة، توليد باركود QR لكل عقار، وإدارة الحملات الإعلانية</p>
        </div>
      </div>

      {/* Campaigns Overview */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-right">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-amber-400" />
          <span>الحملات الإعلانية النشطة (Social Media & Portals)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketingCampaigns.map(camp => (
            <div key={camp.id} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{camp.title}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  {camp.platform}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-xl text-center text-slate-300">
                <div><span className="text-[10px] text-slate-500 block">الميزانية:</span>{camp.budget.toLocaleString('ar-SA')} SAR</div>
                <div><span className="text-[10px] text-slate-500 block">النقرات:</span>{camp.clicks}</div>
                <div><span className="text-[10px] text-slate-500 block">التحويلات:</span>{camp.conversions}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Property QR Codes Generator List */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-right">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <QrCode className="w-4 h-4 text-teal-400" />
          <span>توليد باركود QR العقاري المعتمد</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.slice(0, 6).map(p => (
            <div key={p.id} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white block line-clamp-1">{p.title}</span>
                <span className="text-slate-400 text-[10px]">{p.referenceNumber}</span>
              </div>
              <button
                onClick={() => setSelectedPropQr(p)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QR</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* QR Modal */}
      {selectedPropQr && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-white">{selectedPropQr.title}</h3>
            <p className="text-xs text-slate-400">{selectedPropQr.referenceNumber}</p>

            <div className="p-4 bg-white rounded-2xl w-48 h-48 mx-auto flex items-center justify-center shadow-lg">
              {/* Generated QR visual */}
              <div className="grid grid-cols-5 gap-1.5 w-full h-full bg-slate-950 p-2 rounded-xl">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className={`rounded-sm ${i % 2 === 0 ? 'bg-white' : 'bg-teal-500'}`} />
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-400">امسح الباركود بالكاميرا للانتقال لصفحة العقار التفاعلية</p>

            <button
              onClick={() => setSelectedPropQr(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
