import React from 'react';
import { Mail, MapPin, Users, Heart } from 'lucide-react';

const UserCard = ({ userData }) => {
  const {
    firstName = '',
    lastName = '',
    about = '',
    skills = '',
    gender = '',
    age = '',
    emailId = '',
    location = '',
    photoUrl = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop'
  } = userData || {};

  const getSkillsArray = () => {
    if (!skills) return [];
    if (Array.isArray(skills)) return skills;
    if (typeof skills === 'string') {
      return skills.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
    }
    return [];
  };

  const skillsArray = getSkillsArray();
  const personalInfo = [age && `${age}y`, gender].filter(Boolean).join(' • ');

  return (
    <div className="group bg-[#161622] rounded-2xl overflow-hidden border border-white/10 hover:border-purple-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-600/10 w-full max-w-sm mx-auto">
      <div className="flex flex-col h-full">
        
        {/* Image Container - Fixed aspect ratio */}
        <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-purple-900/30 to-transparent">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop';
            }}
          />
          {/* Optional overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#161622] via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col gap-3">
          {/* Header with better spacing */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white truncate">
                {firstName} {lastName}
              </h2>
              
              {/* Info chips with better alignment */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {location && (
                  <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF] bg-white/5 px-2 py-1 rounded-full">
                    <MapPin size={12} className="text-purple-400" />
                    <span className="truncate max-w-[120px]">{location}</span>
                  </div>
                )}
                {personalInfo && (
                  <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF] bg-white/5 px-2 py-1 rounded-full">
                    <Users size={12} className="text-purple-400" />
                    <span>{personalInfo}</span>
                  </div>
                )}
              </div>
            </div>
            
            <button className="p-2 rounded-full bg-white/5 hover:bg-purple-600/20 text-[#9CA3AF] hover:text-purple-400 transition-all">
              <Heart size={18} />
            </button>
          </div>

          {/* Email with proper icon alignment */}
          {emailId && (
            <div className="flex items-center gap-2 text-sm text-[#9CA3AF] bg-white/5 p-2 rounded-lg">
              <Mail size={16} className="text-purple-400 flex-shrink-0" />
              <span className="truncate">{emailId}</span>
            </div>
          )}

          {/* About with better spacing */}
          {about && (
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">About</h3>
              <p className="text-sm text-[#9CA3AF] line-clamp-2 leading-relaxed">
                {about}
              </p>
            </div>
          )}

          {/* Skills section with better organization */}
          {skillsArray.length > 0 && (
            <div className="space-y-2 mt-auto pt-2">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {skillsArray.slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1.5 bg-gradient-to-r from-purple-600/10 to-purple-600/5 rounded-full text-[#9CA3AF] border border-purple-600/20 hover:border-purple-600/40 transition-colors"
                  >
                    {skill.length > 12 ? skill.substring(0, 10) + '...' : skill}
                  </span>
                ))}
                {skillsArray.length > 4 && (
                  <span className="text-xs px-3 py-1.5 bg-white/5 rounded-full text-[#9CA3AF] border border-white/10">
                    +{skillsArray.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;