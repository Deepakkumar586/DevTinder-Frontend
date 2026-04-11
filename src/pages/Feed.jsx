import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addFeed, removeFeed } from '../utils/feedSlice';
import axios from 'axios';
import { Heart, MapPin, User, RefreshCw, X, Code } from 'lucide-react';
import toast from 'react-hot-toast';
import UserProfile from '../components/UserProfile';

const Feed = () => {
  const dispatch = useDispatch();
  const feeds = useSelector((state) => state.feed.feeds);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [localFeeds, setLocalFeeds] = useState([]);

  const getFeed = async (isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setIsFetchingMore(true);
      } else {
        setLoading(true);
      }
      const res = await axios.get(BASE_URL + '/api/feed', { withCredentials: true });
      dispatch(addFeed(res.data?.data));
      setLocalFeeds(res.data?.data);

      if (!isLoadMore) {
        setCurrentIndex(0);
      }
    } catch (err) {
      console.log(err.response.data);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setIsFetchingMore(false);
    }
  };

  const RequestSend = async (status, _id) => {
    try {
      const res = await axios.post(BASE_URL + '/api/request/send/' + status + "/" + _id, {}, { withCredentials: true });
      dispatch(removeFeed(_id));
      setLocalFeeds(prevFeeds => prevFeeds.filter(user => user._id !== _id));
      toast.success(res.data?.message);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message);
      return false;
    }
  };

  const handleAction = async (action, userId) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const success = await RequestSend(action === 'connect' ? 'interested' : 'ignored', userId);
    
    if (success) {
      const nextIndex = currentIndex + 1;
      if (localFeeds.length - nextIndex <= 2 && !isFetchingMore) {
        await getFeed(true);
      }
      setCurrentIndex(nextIndex);
    }
    
    setIsAnimating(false);
  };

  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    if (feeds && feeds.length > 0) {
      setLocalFeeds(feeds);
    }
  }, [feeds]);

  const handleRefresh = () => {
    setCurrentIndex(0);
    getFeed();
  };

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A] p-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Discover</h1>
              <p className="text-[#A0A0B0] text-md">Connect with developers</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing || isAnimating}
              className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all flex items-center gap-1.5 border border-white/10 text-md cursor-pointer"
            >
              <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <UserProfile />
            </div>
            <div className="lg:col-span-8">
              <div className="flex justify-center items-center min-h-[500px]">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-white text-sm font-medium">Loading developers...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if ((!localFeeds || localFeeds.length === 0) && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A] p-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Discover</h1>
              <p className="text-[#A0A0B0] text-md">Connect with developers</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing || isAnimating}
              className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all flex items-center gap-1.5 border border-white/10 text-md cursor-pointer"
            >
              <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <UserProfile />
            </div>
            <div className="lg:col-span-8">
              <div className="flex flex-col items-center justify-center min-h-[500px]">
                <div className="bg-[#161622] rounded-xl p-6 max-w-sm w-full text-center border border-white/10">
                  <User size={36} className="text-purple-600 mx-auto mb-3" />
                  <h2 className="text-xl font-bold text-white mb-2">No Developers Found</h2>
                  <p className="text-[#A0A0B0] text-sm mb-5">We couldn't find any developers in your feed right now.</p>
                  <button
                    onClick={handleRefresh}
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                  >
                    <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
                    {refreshing ? 'Refreshing...' : 'Refresh Feed'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const hasMoreCards = currentIndex < localFeeds.length;

  if (!hasMoreCards && !loading && localFeeds.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A] p-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Discover</h1>
              <p className="text-[#A0A0B0] text-md">Connect with developers</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing || isAnimating}
              className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all flex items-center gap-1.5 border border-white/10 text-md cursor-pointer"
            >
              <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <UserProfile />
            </div>
            <div className="lg:col-span-8">
              <div className="flex flex-col items-center justify-center min-h-[500px]">
                <div className="bg-[#161622] rounded-xl p-6 max-w-sm w-full text-center border border-white/10">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User size={28} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">All Caught Up!</h2>
                  <p className="text-[#A0A0B0] text-sm mb-5">You've seen all developers for now. Check back later!</p>
                  <button
                    onClick={handleRefresh}
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                  >
                    <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
                    {refreshing ? 'Refreshing...' : 'Load New'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentUser = localFeeds[currentIndex];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <UserProfile />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A] p-6">
      <div className="max-w-7xl mx-auto py-20">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Discover</h1>
            <p className="text-[#A0A0B0] text-md">Connect with developers</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing || isAnimating}
            className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all flex items-center gap-2 border border-white/10 text-sm cursor-pointer"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <UserProfile />
          </div>
          <div className="lg:col-span-8">
            <div className="relative flex justify-center items-start min-h-[550px]">
              {localFeeds.map((user, index) => {
                const isCurrent = index === currentIndex;
                const stackPosition = index - currentIndex;
                
                if (stackPosition > 4) return null;
                
                const stackStyle = {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) translateY(${stackPosition * 20}px)`,
                  zIndex: 100 - stackPosition,
                  width: '100%',
                  maxWidth: '360px',
                  transition: 'all 0.3s ease-in-out',
                  cursor: isCurrent ? 'default' : 'pointer',
                };
                
                return (
                  <div
                    key={user._id}
                    style={stackStyle}
                    className="absolute"
                    onClick={() => !isCurrent && setCurrentIndex(index)}
                  >
                    <div className={`bg-[#1A1A2A] rounded-2xl overflow-hidden transition-all duration-300 shadow-xl ${
                      isCurrent 
                        ? 'ring-2 ring-purple-500 shadow-2xl shadow-purple-600/30 scale-105' 
                        : 'shadow-lg hover:shadow-2xl hover:scale-[1.02]'
                    }`}>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={user.photoUrl || '/api/placeholder/300/400'}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/300/400';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        
                        <div className="absolute bottom-3 right-3 text-xs px-2 py-1 bg-black/80 backdrop-blur-sm text-white rounded-full font-medium">
                          {index + 1}/{localFeeds.length}
                        </div>

                        {isCurrent && (
                          <div className="absolute top-3 left-3 text-xs px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium shadow-lg">
                            ● Active
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="mb-3">
                          <h2 className="text-xl font-bold text-white">
                            {user.firstName} {user.lastName}
                          </h2>
                          
                          <div className="flex items-center gap-2 mt-1">
                            {user.age && (
                              <span className="text-xs px-2 py-0.5 bg-purple-600/20 text-purple-300 rounded-full">
                                {user.age} years
                              </span>
                            )}
                            {user.gender && (
                              <span className="text-xs px-2 py-0.5 bg-blue-600/20 text-blue-300 rounded-full capitalize">
                                {user.gender}
                              </span>
                            )}
                          </div>
                        </div>

                        {user.location && (
                          <div className="mb-3 flex items-center gap-2 text-[#A0A0B0] bg-white/5 rounded-lg p-2">
                            <MapPin size={14} className="text-purple-400" />
                            <span className="text-sm font-medium">{user.location}</span>
                          </div>
                        )}

                        {user.about && (
                          <p className="text-sm text-[#A0A0B0] mb-3 line-clamp-2 italic">
                            "{user.about}"
                          </p>
                        )}

                        {user.skills && user.skills.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Code size={14} className="text-purple-400" />
                              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Skills</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {user.skills.slice(0, 4).map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="text-xs px-2.5 py-1.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 rounded-lg font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                              {user.skills.length > 4 && (
                                <span className="text-xs px-2.5 py-1.5 bg-white/10 text-[#A0A0B0] rounded-lg">
                                  +{user.skills.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {isCurrent && (
                          <div className="flex items-center gap-2 mt-4">
                            <button
                              className="flex-1 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                              onClick={() => handleAction('pass', user._id)}
                              disabled={isAnimating}
                            >
                              <X size={16} />
                              Pass
                            </button>

                            <button
                              className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30"
                              onClick={() => handleAction('connect', user._id)}
                              disabled={isAnimating}
                            >
                              <Heart size={16} />
                              Connect
                            </button>
                          </div>
                        )}

                        {!isCurrent && (
                          <div className="text-center mt-3 pt-2">
                            <span className="text-xs text-purple-400/70 font-medium">Click to view profile & connect</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;