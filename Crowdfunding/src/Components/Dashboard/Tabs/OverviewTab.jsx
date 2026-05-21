import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users as UsersIcon, Clock, CheckCircle, DollarSign, Layers, Heart, Rocket, Eye, XCircle, PlusCircle } from 'lucide-react';
import StatCard from '../StatCard';

const OverviewTab = ({ 
    isAdmin, 
    isCreator, 
    isBackerOnly, 
    user, 
    data, 
    navigate, 
    setIsCreatorModalOpen, 
    handleApprove 
}) => {
    return (
        <motion.div 
            key="overview" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="space-y-12"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {isAdmin ? (
                    <>
                        <StatCard label="Platform Total" value={'$' + (data.stats?.platformTotal || 0).toLocaleString()} icon={TrendingUp} color="text-green-500" />
                        <StatCard label="Active Users" value={(data.stats?.totalUsers || 0).toLocaleString()} icon={UsersIcon} color="text-custom-blue" />
                        <StatCard label="Pending Projects" value={data.stats?.pendingProjects || 0} icon={Clock} color="text-custom-yellow" />
                        <StatCard label="Pending Users" value={data.stats?.pendingCreators || 0} icon={CheckCircle} color="text-custom-yellow" />
                    </>
                ) : isCreator ? (
                    <>
                        <StatCard label="Total Raised" value={`$${data.campaigns.reduce((acc, c) => acc + c.totalRaised, 0)}`} icon={DollarSign} color="text-green-500" />
                        <StatCard label="Active Projects" value={data.campaigns.length} icon={Layers} color="text-custom-yellow" />
                        <StatCard label="Total Backers" value={data.campaigns.reduce((acc, c) => acc + c.backerCount, 0)} icon={UsersIcon} color="text-custom-blue" />
                        <StatCard label="Donations Made" value={data.donations.length || "0"} icon={Heart} color="text-purple-500" />

                        {/* Backer Profile Section for Creators */}
                        <div className="col-span-full mt-8">
                            <h2 className="text-2xl font-black text-custom-black mb-6 flex items-center gap-3">
                                <Heart className="text-custom-blue" /> My Backer Profile
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-black/5">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Backed</p>
                                    <p className="text-3xl font-black text-custom-blue">${data.donations.reduce((acc, d) => acc + d.amount, 0).toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-black/5">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Projects Supported</p>
                                    <p className="text-3xl font-black text-custom-yellow">{new Set(data.donations.map(d => d.campaignId?._id)).size}</p>
                                </div>
                                <div className="bg-custom-black p-8 rounded-[32px] text-white flex items-center justify-between group overflow-hidden relative">
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Impact Level</p>
                                        <p className="text-3xl font-black text-custom-yellow">Supporter</p>
                                    </div>
                                    <Rocket className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10 group-hover:text-custom-yellow/20 transition-all" size={64} />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <StatCard label="Total Backed" value={`$${data.donations.reduce((acc, d) => acc + d.amount, 0).toLocaleString()}`} icon={Heart} color="text-custom-blue" />
                        <StatCard label="Projects Supported" value={new Set(data.donations.map(d => d.campaignId?._id)).size} icon={Layers} color="text-custom-yellow" />
                        <div className="col-span-1 md:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-black/5 flex items-center justify-between group overflow-hidden relative">
                            <div className="relative z-10">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Impact Level</p>
                                <p className="text-4xl font-black text-custom-black">Supporter</p>
                            </div>
                            <div className="absolute right-0 top-0 h-full w-1/3 bg-custom-yellow/5 -skew-x-12 translate-x-1/2 group-hover:bg-custom-yellow/10 transition-all"></div>
                        </div>
                    </>
                )}
            </div>

            {isBackerOnly && (
                <section className="bg-custom-black p-12 rounded-[48px] text-custom-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-custom-yellow/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight uppercase tracking-tighter">
                            BRING YOUR OWN <span className="text-custom-yellow">IDEAS</span> TO LIFE.
                        </h2>
                        <p className="text-gray-400 font-bold text-lg mb-10 leading-relaxed">
                            Apply to become a verified creator and start raising funds for your projects. Our team will verify your identity to maintain platform trust.
                        </p>
                        {user?.approvalStatus === 'pending' ? (
                            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center gap-4 w-fit">
                                <Clock className="text-custom-yellow" />
                                <p className="font-bold text-custom-yellow uppercase tracking-widest text-sm">Application Under Review</p>
                            </div>
                        ) : (
                            <button 
                                onClick={() => setIsCreatorModalOpen(true)}
                                className="bg-custom-yellow text-custom-black px-10 py-5 rounded-2xl font-black text-lg flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-yellow-500/20 active:scale-95"
                            >
                                <PlusCircle size={24} /> BECOME A CREATOR
                            </button>
                        )}
                    </div>
                </section>
            )}

            {isAdmin && data.pendingApprovals.length > 0 && (
                <section>
                    <h2 className="text-2xl font-black text-custom-black mb-6 flex items-center gap-3">
                        <Clock className="text-custom-yellow" /> Pending Approvals
                    </h2>
                    <div className="grid gap-6">
                        {data.pendingApprovals.map(campaign => (
                            <div key={campaign._id} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-black/5 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex items-center gap-6">
                                    <img src={campaign.thumbnail} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                                    <div>
                                        <h3 className="text-xl font-black text-custom-black">{campaign.title}</h3>
                                        <p className="text-sm font-bold text-gray-400 italic">By {campaign.creatorId?.name} • ${campaign.fundingGoal} Goal</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => navigate(`/campaign/${campaign._id}`)} className="p-4 bg-gray-50 text-gray-400 hover:text-custom-black rounded-2xl transition-all"><Eye size={20}/></button>
                                    <button onClick={() => handleApprove(campaign._id, false)} className="p-4 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all"><XCircle size={20}/></button>
                                    <button onClick={() => handleApprove(campaign._id, true)} className="px-8 py-4 bg-green-500 text-white font-black rounded-2xl hover:bg-green-600 transition-all shadow-lg shadow-green-500/20">APPROVE</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </motion.div>
    );
};

export default OverviewTab;
