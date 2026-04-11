import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CheckCircle, User, Mail, Calendar, Users, BadgeCheck, SquareArrowOutDownRight } from "lucide-react";

const UserProfile = () => {
    const user = useSelector((state) => state.auth.user);
    const getInitials = () => {
        if (!user?.firstName) return "";
        return `${user.firstName[0]}${user.lastName?.[0] || ""}`;
    };

    if (!user) {
        return (
            <div className="p-6 max-w-sm animate-pulse">
                <div className="w-20 h-20 bg-gray-700/40 rounded-full mb-4" />
                <div className="h-4 bg-gray-700/40 rounded w-40 mb-2" />
                <div className="h-3 bg-gray-700/40 rounded w-24" />
            </div>
        );
    }

    return (
        <div className=" flex justify-center  flex-col p-6 max-w-sm text-white shadow-xl hover:shadow-2xl transition duration-300">
            <div className="flex items-center gap-4">

                <div className="relative">
                    <div className="p-[2px] rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                            {user.photoUrl ? (
                                <img
                                    src={user.photoUrl}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-lg font-semibold text-purple-400">
                                    {getInitials() || <User size={26} />}
                                </span>
                            )}
                        </div>
                    </div>

                    {user.isEmailVerified && (
                        <div className="absolute -bottom-[-10px] -right-0.5 bg-blue-500 rounded-full border-2 border-[#0D1117] flex items-center justify-center">
                            <BadgeCheck size={15} className="text-white" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold truncate">
                            {user.firstName} {user.lastName}
                        </h2>
                        {user.isEmailVerified && (
                            <BadgeCheck size={15} className="text-white" />
                        )}
                    </div>

                    {user.title && (
                        <p className="text-sm text-gray-400 truncate">
                            {user.title}
                        </p>
                    )}

                    {user.location && (
                        <p className="text-xs text-gray-500 truncate">
                            {user.location}
                        </p>
                    )}
                </div>
            </div>
            <div className="my-5 border-t border-white/5" />
            <div className="space-y-3 text-sm text-gray-400">

                {user.emailId && (
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-2 truncate">
                            <Mail size={14} />
                            <span className="truncate group-hover:text-white transition">
                                {user.emailId}
                            </span>
                        </div>
                        {user.isEmailVerified && (
                            <span className="text-xs text-blue-400">Verified</span>
                        )}
                    </div>
                )}

                {user.gender && (
                    <div className="flex items-center gap-2">
                        <Users size={14} />
                        <span className="capitalize">{user.gender}</span>
                    </div>
                )}

                {user.age && (
                    <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{user.age} years</span>
                    </div>
                )}
            </div>


            {user.about && (
                <div className="mt-5">
                    <p className="text-xs text-gray-500 mb-1">About</p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        {user.about}
                    </p>
                </div>
            )}
            {user.skills?.length > 0 && (
                <div className="mt-5">
                    <p className="text-xs text-gray-500 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                        {user.skills.slice(0, 6).map((skill, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 text-xs rounded-full bg-white/5 hover:bg-purple-500/20 text-gray-300 hover:text-purple-400 border border-white/10 transition"
                            >
                                #{skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            <Link
                to="/profile"
                className="mt-6 inline-flex gap-2 w-full items-center justify-center  text-center py-2.5 text-md font-medium rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition"
            >
                Edit Profile <SquareArrowOutDownRight size={16} />
            </Link>
        </div>
    );
};

export default UserProfile;