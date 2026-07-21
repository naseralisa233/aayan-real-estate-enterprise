import React, { useState } from 'react';
import { Sparkles, Bot, Send, Brain, TrendingUp, Lightbulb, CheckCircle2, RefreshCw, FileText } from 'lucide-react';
import { User, AIInsight } from '../../types';
import { ApiService } from '../../services/api';

interface ModuleAIAssistantProps {
  currentUser: User;
  aiInsights: AIInsight[];
}

export const ModuleAIAssistant: React.FC<ModuleAIAssistantProps> = ({ currentUser, aiInsights }) => {
  const [activeTab, setActiveTab] = useState<'desc_gen' | 'chat' | 'insights'>('desc_gen');

  // Generator inputs
  const [type, setType] = useState('فيلا');
  const [city, setCity] = useState('الرياض');
  const [area, setArea] = useState(450);
  const [price, setPrice] = useState(3800000);
  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<{ title: string; description: string; highlights: string[] } | null>(null);

  // Chat input
  const [chatPrompt, setChatPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'مرحباً! أنا مساعد أعيان للذكاء الاصطناعي مدعوم بنموذج Gemini 3.6 Flash. كيف يمكنني مساعدتك اليوم في التحليلات العقارية أو تقييم الصفقات؟' }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleGenerateDescription = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await ApiService.generateAIPropertyDescription(type, city, area, price, ['مسبح خاص', 'نظام سمارت هوم', 'تكييف مركزي']);
      setGeneratedResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatPrompt.trim() || chatLoading) return;

    const userText = chatPrompt;
    setChatPrompt('');
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatLoading(true);

    try {
      const reply = await ApiService.askAIAssistant(userText);
      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    } catch (err) {
      console.error(err);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-900/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 11: المساعد العقاري الذكي Gemini 3.6 Flash</h1>
          </div>
          <p className="text-xs text-purple-200/80 mt-1">توليد الأوصاف التسويقية تلقائياً، التنبؤ بالصفقات الناجحة، وتقييم الأسعار الذكي</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 w-fit text-xs font-bold">
        <button
          onClick={() => setActiveTab('desc_gen')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'desc_gen' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
        >
          مولد الوصف العقاري AI Generator
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'chat' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
        >
          المساعد الشات الذكي AI Chat Assistant
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'insights' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
        >
          التوصيات ورادارات الذكاء الاصطناعي ({aiInsights.length})
        </button>
      </div>

      {/* DESCRIPTION GENERATOR */}
      {activeTab === 'desc_gen' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <form onSubmit={handleGenerateDescription} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-right">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <span>إدخال مواصفات العقار</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">نوع العقار</label>
                <input
                  type="text"
                  value={type}
                  onChange={e => setType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">المدينة</label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">المساحة (م²)</label>
                <input
                  type="number"
                  value={area}
                  onChange={e => setArea(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">السعر (SAR)</label>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>توليد العنوان والوصف بالذكاء الاصطناعي</span>
            </button>
          </form>

          {/* Generated Result */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-right">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>النتيجة المولدة بواسطة Gemini 3.6 Flash</span>
            </h3>

            {generatedResult ? (
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
                <h4 className="font-bold text-emerald-400 text-sm">{generatedResult.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{generatedResult.description}</p>
                <div className="pt-2 border-t border-slate-700/60 space-y-1">
                  {generatedResult.highlights.map((h, idx) => (
                    <p key={idx} className="text-[11px] text-purple-300 font-semibold">✦ {h}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 border border-dashed border-slate-800 rounded-2xl text-xs">
                أدخل المواصفات واضغط على زر التوليد لمعاينة النتيجة الذكية.
              </div>
            )}
          </div>

        </div>
      )}

      {/* AI CHAT ASSISTANT */}
      {activeTab === 'chat' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto space-y-3 p-2">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-start' : 'items-end'}`}>
                <div className={`max-w-xl p-4 rounded-2xl text-xs space-y-1 ${
                  msg.sender === 'user' 
                    ? 'bg-purple-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="pt-3 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={chatPrompt}
              onChange={e => setChatPrompt(e.target.value)}
              placeholder="اسأل المساعد الذكي عن متوسط أسعار العقارات، أو اقتراح أفضل توقيت للإغلاق..."
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-purple-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={chatLoading}
              className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition"
            >
              {chatLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>إرسال</span>
            </button>
          </form>
        </div>
      )}

      {/* AI INSIGHTS */}
      {activeTab === 'insights' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-right">
          {aiInsights.map(insight => (
            <div key={insight.id} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-white">{insight.title}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                    أولوية: {insight.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{insight.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
