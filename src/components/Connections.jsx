import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { RefreshCw, MapPin, Briefcase, User, Mail, Award, Calendar } from 'lucide-react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const connections = useSelector((state) => state.connections.connections);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const dispatch = useDispatch();

    const fetchConnections = async (showRefreshAnimation = false) => {
        try {
            if (showRefreshAnimation) {
                setIsRefreshing(true);
            }
            const res = await axios.get(BASE_URL + '/api/user/connections', { withCredentials: true });
            console.log('Fetched connections:', res.data);
            const filteredConnections = res.data.data.filter(item => item !== null);

            dispatch(addConnections(filteredConnections));
            toast.success('Connections refreshed');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to fetch connections');
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    const handleRefresh = () => {
        fetchConnections(true);
    };

    const formatConnectionInfo = (connection) => {
        const info = [];
        if (connection?.age) info.push(`${connection?.age} years`);
        if (connection?.gender) info.push(connection?.gender);
        return info.join(' • ');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A] pt-[100px] p-6">
            <div className="max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Connections</h1>
                        <p className="text-sm text-gray-400 mt-1">{connections.length} connections</p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
                    >
                        <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                        Refresh
                    </button>
                </div>


                {connections.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-800 flex items-center justify-center">
                            <User size={28} className="text-gray-600" />
                        </div>
                        <p className="text-gray-400 text-sm">No connections yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {connections.map((connection) => {
                            const connectionInfo = formatConnectionInfo(connection);
                            return (
                                <div
                                    key={connection?._id}
                                    className="group bg-[#161622] rounded-xl overflow-hidden border border-white/10 hover:border-purple-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/10 flex flex-col"
                                    style={{ aspectRatio: '2 / 2.4' }}
                                >

                                    <div className="relative h-4/5 overflow-hidden">
                                        <img
                                            src={connection?.photoUrl}
                                            alt={`${connection?.firstName} ${connection?.lastName}`}
                                            className="w-full h-full object-fill  rounded-xl transition-transform duration-500"
                                        />

                                        {connectionInfo && (
                                            <span className="absolute top-2 right-2 text-xs px-2 py-1 bg-black/80 backdrop-blur-sm text-white rounded-full border border-purple-600/30">
                                                {connectionInfo}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-3 flex flex-col h-2/5">
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-1">
                                                <h2 className="text-base font-semibold text-white truncate">
                                                    {connection?.firstName} {connection?.lastName}
                                                </h2>
                                            </div>

                                            {connection?.location && (
                                                <div className="flex items-center gap-1 text-[#A0A0B0] mb-1.5">
                                                    <MapPin size={12} />
                                                    <span className="text-xs truncate">{connection?.location}</span>
                                                </div>
                                            )}

                                            {connection?.about && (
                                                <p className="text-xs text-[#A0A0B0] mb-2 line-clamp-2">
                                                    {connection?.about}
                                                </p>
                                            )}
                                            {connection?.skills && connection?.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mb-2">
                                                    {connection?.skills.slice(0, 2).map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded-full text-[#A0A0B0] border border-white/10"
                                                        >
                                                            {skill.length > 12 ? skill.substring(0, 10) + '...' : skill}
                                                        </span>
                                                    ))}
                                                    {connection?.skills.length > 2 && (
                                                        <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded-full text-[#A0A0B0]">
                                                            +{connection?.skills.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )

                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Connections;