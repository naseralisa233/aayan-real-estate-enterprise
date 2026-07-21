import React, { useState, useEffect } from 'react';
import { 
  User, Property, Customer, Lead, Deal, Contract, Invoice, 
  Expense, MaintenanceRequest, Technician, ChatMessage, 
  NotificationItem, AIInsight, Branch, WorkflowRule, AuditLog, MarketingCampaign
} from './types';
import { ApiService } from './services/api';
import { MobileHeader } from './components/common/MobileHeader';
import { MobileBottomTab } from './components/common/MobileBottomTab';
import { MoreModulesSheet } from './components/common/MoreModulesSheet';

// Import All 20 Modules & Mobile Hubs
import { ModuleHome } from './components/modules/ModuleHome';
import { ModuleProperties } from './components/modules/ModuleProperties';
import { ModuleCRM } from './components/modules/ModuleCRM';
import { ModuleLeads } from './components/modules/ModuleLeads';
import { ModuleDeals } from './components/modules/ModuleDeals';
import { ModuleContracts } from './components/modules/ModuleContracts';
import { ModuleFinance } from './components/modules/ModuleFinance';
import { ModuleMaintenance } from './components/modules/ModuleMaintenance';
import { ModuleCommunication } from './components/modules/ModuleCommunication';
import { ModuleDashboard } from './components/modules/ModuleDashboard';
import { ModuleAIAssistant } from './components/modules/ModuleAIAssistant';
import { ModuleSettings } from './components/modules/ModuleSettings';
import { ModuleCustomerApp } from './components/modules/ModuleCustomerApp';
import { ModuleAgentApp } from './components/modules/ModuleAgentApp';
import { ModuleMarketplace } from './components/modules/ModuleMarketplace';
import { ModuleEnterprise } from './components/modules/ModuleEnterprise';
import { ModuleWorkflowEngine } from './components/modules/ModuleWorkflowEngine';
import { ModuleOfflinePerformance } from './components/modules/ModuleOfflinePerformance';
import { ModuleBIReports } from './components/modules/ModuleBIReports';
import { ModuleSystemRelease } from './components/modules/ModuleSystemRelease';
import { ModuleAuth } from './components/modules/ModuleAuth';
import { ModuleProfileHub } from './components/modules/ModuleProfileHub';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'usr_1',
    fullName: 'المهندس عبد العزيز الراجحي',
    email: 'admin@aayan.sa',
    phone: '+966501112233',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    branchId: 'br_1',
    branchName: 'الفرع الرئيسي - الرياض',
    isActive: true,
    lastLogin: 'منذ دقيقتين'
  });

  const [activeTab, setActiveTab] = useState<string>('tab_home'); // 'tab_home' | 'mod_2' | 'mod_3' | 'mod_9' | 'tab_profile' or any 'mod_X'
  const [favorites, setFavorites] = useState<string[]>(['prop_1']);
  const [isEnterpriseSheetOpen, setIsEnterpriseSheetOpen] = useState(false);

  // System State Data
  const [users, setUsers] = useState<User[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [workflowRules, setWorkflowRules] = useState<WorkflowRule[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [marketingCampaigns, setMarketingCampaigns] = useState<MarketingCampaign[]>([]);

  // Load Initial Data
  const loadData = async () => {
    const u = await ApiService.getUsers();
    setUsers(u);

    const p = await ApiService.getProperties();
    setProperties(p);

    const c = await ApiService.getCustomers();
    setCustomers(c);

    const l = await ApiService.getLeads();
    setLeads(l);

    const d = await ApiService.getDeals();
    setDeals(d);

    const cnt = await ApiService.getContracts();
    setContracts(cnt);

    const inv = await ApiService.getInvoices();
    setInvoices(inv);

    const exp = await ApiService.getExpenses();
    setExpenses(exp);

    const maint = await ApiService.getMaintenanceRequests();
    setMaintenanceRequests(maint);

    const tech = await ApiService.getTechnicians();
    setTechnicians(tech);

    const chat = await ApiService.getChatMessages();
    setChatMessages(chat);

    const notif = await ApiService.getNotifications();
    setNotifications(notif);

    const ai = await ApiService.getAIInsights();
    setAiInsights(ai);

    const br = await ApiService.getBranches();
    setBranches(br);

    const wf = await ApiService.getWorkflowRules();
    setWorkflowRules(wf);

    const logs = await ApiService.getAuditLogs();
    setAuditLogs(logs);

    const camp = await ApiService.getMarketingCampaigns();
    setMarketingCampaigns(camp);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleFavorite = (propId: string) => {
    if (favorites.includes(propId)) {
      setFavorites(favorites.filter(id => id !== propId));
    } else {
      setFavorites([...favorites, propId]);
    }
  };

  const handleNavigateToModule = (modId: string) => {
    setActiveTab(modId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Cairo',sans-serif] dir-rtl flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Mobile Top Header */}
      <MobileHeader
        currentUser={currentUser}
        onUserChange={setCurrentUser}
        notificationsCount={notifications.length}
        onSearchClick={() => setActiveTab('mod_2')}
      />

      {/* Main Content Workspace Container */}
      <main className="flex-1 max-w-md sm:max-w-3xl mx-auto w-full px-3 sm:px-6 pt-4 pb-20">
        
        {/* Tab 1: Mobile Home */}
        {activeTab === 'tab_home' && (
          <ModuleHome
            currentUser={currentUser}
            properties={properties}
            deals={deals}
            customers={customers}
            leads={leads}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onNavigateToModule={handleNavigateToModule}
          />
        )}

        {/* Tab 2 / Module 2: Properties */}
        {activeTab === 'mod_2' && (
          <ModuleProperties
            currentUser={currentUser}
            properties={properties}
            favorites={favorites}
            onRefreshProperties={loadData}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* Tab 3 / Module 3: CRM & Deals */}
        {(activeTab === 'mod_3' || activeTab === 'mod_4' || activeTab === 'mod_5') && (
          <ModuleCRM
            currentUser={currentUser}
            customers={customers}
            onRefreshCustomers={loadData}
          />
        )}

        {/* Tab 4 / Module 9: Communications & Notifications */}
        {activeTab === 'mod_9' && (
          <ModuleCommunication
            currentUser={currentUser}
            chatMessages={chatMessages}
            notifications={notifications}
            onRefreshChat={loadData}
          />
        )}

        {/* Tab 5: Profile & Hub */}
        {activeTab === 'tab_profile' && (
          <ModuleProfileHub
            currentUser={currentUser}
            onUserChange={setCurrentUser}
            onOpenEnterpriseHub={() => setIsEnterpriseSheetOpen(true)}
            onNavigateToModule={handleNavigateToModule}
          />
        )}

        {/* Module 1: Auth & Users */}
        {activeTab === 'mod_1' && (
          <ModuleAuth
            currentUser={currentUser}
            users={users}
            onRefreshUsers={loadData}
          />
        )}

        {/* Module 6: Contracts */}
        {activeTab === 'mod_6' && (
          <ModuleContracts
            currentUser={currentUser}
            contracts={contracts}
            onRefreshContracts={loadData}
          />
        )}

        {/* Module 7: Finance */}
        {activeTab === 'mod_7' && (
          <ModuleFinance
            currentUser={currentUser}
            invoices={invoices}
            expenses={expenses}
            onRefreshData={loadData}
          />
        )}

        {/* Module 8: Maintenance */}
        {activeTab === 'mod_8' && (
          <ModuleMaintenance
            currentUser={currentUser}
            maintenanceRequests={maintenanceRequests}
            technicians={technicians}
            onRefreshData={loadData}
          />
        )}

        {/* Module 10: Dashboard KPIs */}
        {activeTab === 'mod_10' && (
          <ModuleDashboard
            currentUser={currentUser}
            properties={properties}
            deals={deals}
            customers={customers}
            leads={leads}
          />
        )}

        {/* Module 11: AI Assistant */}
        {activeTab === 'mod_11' && (
          <ModuleAIAssistant
            currentUser={currentUser}
            aiInsights={aiInsights}
          />
        )}

        {/* Module 12: Settings */}
        {activeTab === 'mod_12' && (
          <ModuleSettings
            currentUser={currentUser}
            auditLogs={auditLogs}
          />
        )}

        {/* Module 13: Customer App */}
        {activeTab === 'mod_13' && (
          <ModuleCustomerApp
            currentUser={currentUser}
            properties={properties}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* Module 14: Agent App */}
        {activeTab === 'mod_14' && (
          <ModuleAgentApp
            currentUser={currentUser}
            properties={properties}
            leads={leads}
            deals={deals}
          />
        )}

        {/* Module 15: Marketplace */}
        {activeTab === 'mod_15' && (
          <ModuleMarketplace
            properties={properties}
            marketingCampaigns={marketingCampaigns}
          />
        )}

        {/* Module 16: Enterprise Branches */}
        {activeTab === 'mod_16' && (
          <ModuleEnterprise
            currentUser={currentUser}
            branches={branches}
          />
        )}

        {/* Module 17: Workflow Engine */}
        {activeTab === 'mod_17' && (
          <ModuleWorkflowEngine
            currentUser={currentUser}
            workflowRules={workflowRules}
            onRefreshRules={loadData}
          />
        )}

        {/* Module 18: Offline Sync */}
        {activeTab === 'mod_18' && (
          <ModuleOfflinePerformance
            currentUser={currentUser}
          />
        )}

        {/* Module 19: BI Reports */}
        {activeTab === 'mod_19' && (
          <ModuleBIReports
            properties={properties}
            deals={deals}
            customers={customers}
            invoices={invoices}
          />
        )}

        {/* Module 20: System Release */}
        {activeTab === 'mod_20' && (
          <ModuleSystemRelease />
        )}

      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomTab
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenEnterpriseHub={() => setIsEnterpriseSheetOpen(true)}
        unreadCount={notifications.length}
      />

      {/* Enterprise Hub Bottom Sheet */}
      <MoreModulesSheet
        isOpen={isEnterpriseSheetOpen}
        onClose={() => setIsEnterpriseSheetOpen(false)}
        currentUser={currentUser}
        onSelectModule={(modId) => setActiveTab(modId)}
      />

    </div>
  );
}
