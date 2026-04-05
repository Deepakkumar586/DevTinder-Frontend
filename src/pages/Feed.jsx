import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addFeed, removeFeed } from '../utils/feedSlice';
import axios from 'axios';
import { Heart, MapPin, User, RefreshCw, X, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import gsap from 'gsap';

const Feed = () => {
  const dispatch = useDispatch();
  const feeds = useSelector((state) => state.feed.feeds);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [localFeeds, setLocalFeeds] = useState([]);
  const cardRefs = useRef([]);
  const containerRef = useRef(null);

  const getFeed = async (isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setIsFetchingMore(true);
      } else {
        setLoading(true);
      }
      const res = await axios.get(BASE_URL + '/api/feed', { withCredentials: true });
      dispatch(addFeed(res.data.data));
      setLocalFeeds(res.data.data);

      if (!isLoadMore) {
        setCurrentIndex(0);
        cardRefs.current = [];
      }
    } catch (err) {
      console.log(err);
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

  const swipeCard = (direction, userId) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const currentCard = cardRefs.current[currentIndex];

    if (!currentCard) {
      setIsAnimating(false);
      return;
    }

    const xValue = direction === 'right' ? 800 : -800;
    const rotation = direction === 'right' ? 30 : -30;

    gsap.to(currentCard, {
      x: xValue,
      rotation: rotation,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: async () => {
        const success = await RequestSend(direction === 'right' ? 'interested' : 'ignored', userId);

        if (success) {
          const nextIndex = currentIndex;

          if (localFeeds.length <= 3 && !isFetchingMore) {
            await getFeed(true);
          }

          setCurrentIndex(nextIndex);
        }

        setIsAnimating(false);
      }
    });
  };

  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    if (feeds && feeds.length > 0) {
      setLocalFeeds(feeds);
    }
  }, [feeds]);

  useEffect(() => {
    if (localFeeds && localFeeds.length > 0 && currentIndex < localFeeds.length) {
      setTimeout(() => {
        localFeeds.forEach((_, index) => {
          const card = cardRefs.current[index];
          if (card) {
            if (index === currentIndex) {
              gsap.set(card, {
                y: 0,
                scale: 1,
                opacity: 1,
                x: 0,
                rotation: 0,
                zIndex: 100,
                display: 'block',
                visibility: 'visible'
              });
            } else if (index > currentIndex) {
              const stackOffset = index - currentIndex;
              const scale = Math.max(0.85, 1 - stackOffset * 0.07);
              const yOffset = stackOffset * 15;

              gsap.set(card, {
                y: yOffset,
                scale: scale,
                opacity: 0.7,
                x: 0,
                rotation: 0,
                zIndex: 100 - stackOffset,
                display: 'block',
                visibility: 'visible'
              });
            } else {
              gsap.set(card, { display: 'none', visibility: 'hidden' });
            }
          }
        });
      }, 50);
    }
  }, [localFeeds, currentIndex]);

  const handleRefresh = () => {
    
    setCurrentIndex(0);
    cardRefs.current = [];
    getFeed();
  };

  const formatUserInfo = (user) => {
    const info = [];
    if (user.age) info.push(`${user.age}years`);
    if (user.gender) info.push(user.gender);
    return info.join(' • ');
  };

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-white text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if ((!localFeeds || localFeeds.length === 0) && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A] flex flex-col items-center justify-center p-4">
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
    );
  }

  const hasMoreCards = currentIndex < localFeeds.length;

  if (!hasMoreCards && !loading && localFeeds.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A] flex flex-col items-center justify-center p-4">
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
    );
  }

  const currentUser = localFeeds[currentIndex];

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A] pt-[100px] p-3">
      <div className="max-w-6xl mx-auto">
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

        <div
          ref={containerRef}
          className="relative flex justify-center items-center"
          style={{ minHeight: '500px' }}
        >
          {localFeeds.map((user, index) => {
            if (index < currentIndex) return null;

            const userInfo = formatUserInfo(user);
            const isCurrent = index === currentIndex;

            return (
              <div
                key={user._id}
                ref={el => {
                  if (el) {
                    cardRefs.current[index] = el;
                  }
                }}
                className="absolute w-full"
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  pointerEvents: isCurrent ? 'auto' : 'none',
                }}
              >
                <div className="bg-[#161622] rounded-xl overflow-hidden border border-white/10 shadow-xl">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={user.photoUrl}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {userInfo && (
                      <span className="absolute top-2 right-2 text-xs px-2 py-1 bg-black/80 backdrop-blur-sm text-white rounded-full border border-purple-600/30">
                        {userInfo}
                      </span>
                    )}
                  </div>

                  <div className="p-3">
                    <div className="mb-2">
                      <h2 className="text-base font-semibold text-white truncate">
                        {user.firstName} {user.lastName}
                      </h2>
                      {user.location && (
                        <div className="flex items-center gap-1 text-[#A0A0B0] mb-1.5">
                          <MapPin size={12} />
                          <span className="text-xs">{user.location}</span>
                        </div>
                      )}
                    </div>

                    {user.about && (
                     
                        <p className="text-xs text-[#A0A0B0] mb-2 line-clamp-2">
                          {user.about}
                        </p>
                      
                    )}

                    {user.skills && user.skills.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {user.skills.slice(0, 3).map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded-full text-[#A0A0B0]"
                            >
                              {skill.length > 10 ? skill.substring(0, 8) + '...' : skill}
                            </span>
                          ))}
                          {user.skills.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded-full text-[#A0A0B0]">
                              +{user.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <button
                        className="flex-1 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-red-500/20 hover:border-red-500/40"
                        onClick={() => swipeCard('left', user._id)}
                        disabled={isAnimating}
                      >
                        <X size={12} />
                        Pass
                      </button>

                      <button
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-purple-600/25"
                        onClick={() => swipeCard('right', user._id)}
                        disabled={isAnimating}
                      >
                        <Heart size={12} />
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Feed;