import React, { useState } from 'react';
import { MessageSquare, Send, Bell, CheckCheck, Smartphone, CheckCircle, Wifi } from 'lucide-react';
import { ChatMessage, NotificationItem, User } from '../../types';
import { ApiService } from '../../services/api';

interface ModuleCommunicationProps {
  currentUser: User;
  chatMessages: ChatMessage[];
  notifications: NotificationItem[];
  onRefreshChat: () => void;
}

export const ModuleCommunication: React.FC<ModuleCommunicationProps> = ({
  currentUser,
  chatMessages,
  notifications,
  onRefreshChat
}) => {
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'notifications'>('chat');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    await ApiService.sendChatMessage(inputText);
    setInputText('');
    onRefreshChat();
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <MessageSquare className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-white">Module 9: نظام التواصل والمحادثات المباشرة والإشعارات الذكية</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">محادثات فورية بتقنية Socket.IO، تتبع حالات القراءة، وإشعارات FCM اللحظية</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
          <Wifi className="w-4 h-4 animate-pulse" />
          <span>Socket.IO متصل حي</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 w-fit text-xs font-bold">
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'chat' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
        >
          المحادثة المباشرة Direct Chat
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-xl transition ${activeTab === 'notifications' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
        >
          مركز الإشعارات Notification Feed ({notifications.length})
        </button>
      </div>

      {/* CHAT VIEW */}
      {activeTab === 'chat' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col h-[500px]">
          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto space-y-3 p-2">
            {chatMessages.map(msg => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-start' : 'items-end'}`}>
                  <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                    isMe 
                      ? 'bg-teal-500 text-slate-950 font-medium rounded-tr-none' 
                      : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-none'
                  }`}>
                    <div className="flex items-center justify-between gap-3 text-[10px] opacity-75 font-bold">
                      <span>{msg.senderName} ({msg.senderRole})</span>
                      <span>{msg.createdAt}</span>
                    </div>
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="اكتب رسالتك وسيتفاعل معها الموظفون أو المساعد الذكي..."
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-teal-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Send className="w-4 h-4" />
              <span>إرسال</span>
            </button>
          </form>
        </div>
      )}

      {/* NOTIFICATIONS VIEW */}
      {activeTab === 'notifications' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 text-right">
          {notifications.map(not => (
            <div key={not.id} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-white block">{not.title}</span>
                <p className="text-slate-400">{not.message}</p>
              </div>
              <span className="text-[10px] text-teal-400 font-mono">{not.createdAt}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
