import React, { useState } from 'react';
import { FileText, Download, CheckCircle, PenTool, RefreshCw, FileCheck, ShieldCheck, Eye, Plus } from 'lucide-react';
import { Contract, User } from '../../types';
import { ApiService } from '../../services/api';
import { SignaturePad } from '../common/SignaturePad';

interface ModuleContractsProps {
  currentUser: User;
  contracts: Contract[];
  onRefreshContracts: () => void;
}

export const ModuleContracts: React.FC<ModuleContractsProps> = ({ currentUser, contracts, onRefreshContracts }) => {
  const [selectedContractForSig, setSelectedContractForSig] = useState<Contract | null>(null);
  const [previewContract, setPreviewContract] = useState<Contract | null>(null);
  const [signerName, setSignerName] = useState('عبد العزيز الراجحي');

  const handleSaveSignature = async (sigDataUrl: string) => {
    if (!selectedContractForSig) return;
    await ApiService.signContract(selectedContractForSig.id, signerName, sigDataUrl);
    setSelectedContractForSig(null);
    onRefreshContracts();
  };

  const handleDownloadPDF = (contract: Contract) => {
    // Generate simple printable text document for demonstration
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html dir="rtl">
          <head>
            <title>عقد عقاري رسمـي - ${contract.contractNumber}</title>
            <style>
              body { font-family: 'Cairo', sans-serif; padding: 40px; line-height: 1.8; color: #1e293b; }
              .header { text-align: center; border-bottom: 3px double #0f766e; padding-bottom: 20px; margin-bottom: 30px; }
              .section { margin-bottom: 20px; background: #f8fafc; padding: 20px; border-radius: 12px; }
              .footer { margin-top: 50px; display: flex; justify-content: space-between; text-align: center; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>شركة أعيان العقارية للمؤسسات</h1>
              <h3>${contract.type} إلكتروني معتمد</h3>
              <p>رقم العقد: <strong>${contract.contractNumber}</strong></p>
            </div>
            <div class="section">
              <p><strong>العقار:</strong> ${contract.propertyTitle}</p>
              <p><strong>الطرف الأول (المالك):</strong> ${contract.ownerName}</p>
              <p><strong>الطرف الثاني (العميل):</strong> ${contract.customerName}</p>
              <p><strong>القيمة الإجمالية:</strong> ${contract.amount.toLocaleString('ar-SA')} ريال سعودي</p>
              <p><strong>تاريخ السريان:</strong> من ${contract.startDate} إلى ${contract.endDate}</p>
            </div>
            <div class="section">
              <h4>الشروط والأحكام:</h4>
              <p>${contract.terms}</p>
            </div>
            <div class="footer">
              <div><p>توقيع المالك</p><p>✍️ ${contract.ownerName}</p></div>
              <div><p>توقيع العميل الإلكتروني</p><p>✍️ ${contract.customerName}</p></div>
              <div><p>ختم الشركة الرقمي</p><p>🛡️ شركة أعيان</p></div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <FileText className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 6: العقود الرسمية والمستندات والتوقيع الرقمي (Contracts & Signatures)</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">توليد العقود PDF تلقائياً، التوقيع الإلكتروني الحي المعزز بـ IP و الأرشفة الرقمية</p>
        </div>
      </div>

      {/* Contracts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {contracts.map(cnt => (
          <div key={cnt.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-right flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-mono text-xs font-bold text-blue-400">{cnt.contractNumber}</span>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  cnt.status === 'موقع' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {cnt.status}
                </span>
              </div>

              <h3 className="font-bold text-sm text-white">{cnt.propertyTitle}</h3>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 bg-slate-800/60 p-3 rounded-2xl">
                <div><span className="text-slate-500 block">النوع:</span>{cnt.type}</div>
                <div><span className="text-slate-500 block">المبلغ:</span><span className="text-emerald-400 font-bold">{cnt.amount.toLocaleString('ar-SA')} SAR</span></div>
                <div><span className="text-slate-500 block">الطرف الأول:</span>{cnt.ownerName}</div>
                <div><span className="text-slate-500 block">الطرف الثاني:</span>{cnt.customerName}</div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                "{cnt.terms}"
              </p>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => handleDownloadPDF(cnt)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>طباعة / PDF</span>
              </button>

              {cnt.status !== 'موقع' ? (
                <button
                  onClick={() => setSelectedContractForSig(cnt)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-slate-950 text-xs font-bold transition"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>توقيع إلكتروني</span>
                </button>
              ) : (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>موقع إلكترونياً</span>
                </span>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Signature Modal */}
      {selectedContractForSig && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg text-right shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-base text-white">التوقيع الرقمي المعتمد</h3>
                <p className="text-xs text-slate-400">{selectedContractForSig.contractNumber} - {selectedContractForSig.propertyTitle}</p>
              </div>
              <button onClick={() => setSelectedContractForSig(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">اسم الموقع</label>
              <input
                type="text"
                value={signerName}
                onChange={e => setSignerName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs mb-3"
              />
            </div>

            <SignaturePad onSave={handleSaveSignature} />
          </div>
        </div>
      )}

    </div>
  );
};
