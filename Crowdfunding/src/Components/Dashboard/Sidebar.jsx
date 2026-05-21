import React from 'react';
import { 
    LayoutDashboard, 
    Layers, 
    Users as UsersIcon, 
    Wallet, 
    Settings, 
    CheckCircle, 
    ShieldAlert, 
    Heart, 
    ArrowUpRight, 
    Rocket, 
    DollarSign, 
    Eye 
} from 'lucide-react';

const Sidebar = ({ user, isAdmin, isCreator, activeTab, setSearchParams }) => {
    const SidebarLink = ({ id, icon: Icon, label }) => (
        <button 
            onClick={() => setSearchParams({ tab: id })}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
                activeTab === id 
                ? 'bg-custom-yellow text-custom-black shadow-lg shadow-yellow-500/20' 
                : 'text-gray-400 hover:bg-white/5 hover:text-custom-white'
            }`}
        >
            <Icon size={20} />
            {label}
        </button>
    );

    return (
        <aside className="w-full lg:w-72 bg-custom-black border-r border-gray-800 p-6 space-y-2">
            <p className="px-6 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Main Menu</p>
            <SidebarLink id="overview" icon={LayoutDashboard} label="Overview" />
            
            {isAdmin && (
                <>
                    <p className="px-6 pt-6 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Admin Tools</p>
                    <SidebarLink id="approvals" icon={ShieldAlert} label="Campaign Approvals" />
                    <SidebarLink id="user-approvals" icon={CheckCircle} label="User Approvals" />
                    <SidebarLink id="users" icon={UsersIcon} label="User Management" />
                    <SidebarLink id="success-stories" icon={Rocket} label="Success Stories" />
                    <SidebarLink id="finance" icon={DollarSign} label="Finance" />
                    <SidebarLink id="fulfillment-monitor" icon={Eye} label="Fulfillment Monitor" />
                </>
            )}

            {isCreator && (
                <>
                    <p className="px-6 pt-6 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Creator Studio</p>
                    <SidebarLink id="my-projects" icon={Layers} label="My Projects" />
                    <SidebarLink id="updates" icon={Rocket} label="Campaign Updates" />
                    <SidebarLink id="backer-management" icon={UsersIcon} label="Backer Management" />
                    <SidebarLink id="contributions" icon={Wallet} label="Contributions" />
                    <SidebarLink id="withdrawals" icon={ArrowUpRight} label="Payments" />
                </>
            )}

            <p className="px-6 pt-6 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Personal</p>
            <SidebarLink id="backed-projects" icon={Layers} label="Backed Projects" />
            <SidebarLink id="donations" icon={Heart} label="My Donations" />
            <SidebarLink id="settings" icon={Settings} label="Settings" />
        </aside>
    );
};

export default Sidebar;
