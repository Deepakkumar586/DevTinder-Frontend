import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { RefreshCw, MapPin, Briefcase, User, Mail, Award, Calendar, Heart, X } from 'lucide-react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/RequestSlice';


const Requests = () => {
  const requests = useSelector((state) => state.requests.requests);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();

  const fetchRequests = async (showRefreshAnimation = false) => {
    try {
      if (showRefreshAnimation) {
        setIsRefreshing(true);
      }
      const res = await axios.get(BASE_URL + '/api/user/requests/recieved', { withCredentials: true });
      const filteredRequests = res.data?.data?.filter(
        (item) => item && item.fromUserId
      );

      dispatch(addRequests(filteredRequests));
      toast.success('Requests refreshed');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch requests');
    } finally {
      setIsRefreshing(false);
    }
  };

  const reviewRequest = async (status, _id) => {
    dispatch(removeRequest(_id));
    try {
      const res = await axios.post(BASE_URL + '/api/request/respond/' + status + "/" + _id, {}, { withCredentials: true })

      toast.success(res.data?.message);
    }
    catch (err) {
      toast.error(err.response?.data?.message || 'Failed to review request');
    }

  }

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRefresh = () => {
    fetchRequests(true);
  };

  const formatRequestInfo = (request) => {
    const info = [];
    if (request.fromUserId?.age) info.push(`${request.fromUserId?.age} years`);
    if (request.fromUserId?.gender) info.push(request.fromUserId?.gender);
    return info.join(' • ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A] pt-[100px] p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Requests</h1>
            <p className="text-sm text-gray-400 mt-1">{requests.length} requests</p>
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


        {requests.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-800 flex items-center justify-center">
              <User size={28} className="text-gray-600" />
            </div>
            <p className="text-gray-400 text-sm">No requests yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {requests?.map((request) => {
              const requestInfo = formatRequestInfo(request);
              return (
                <div
                  key={request._id}
                  className="group bg-[#161622] rounded-xl overflow-hidden border border-white/10 hover:border-purple-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/10 flex flex-col "
                  style={{ aspectRatio: '2 / 2.4' }}
                >

                  <div className="relative h-4/5 overflow-hidden">
                    <img
                      src={request.fromUserId?.photoUrl}
                      alt={`${request.fromUserId?.firstName} ${request.fromUserId?.lastName}`}
                      className="w-full h-full object-fill  rounded-xl transition-transform duration-500"
                    />

                    {requestInfo && (
                      <span className="absolute top-2 right-2 text-xs px-2 py-1 bg-black/80 backdrop-blur-sm text-white rounded-full border border-purple-600/30">
                        {requestInfo}
                      </span>
                    )}
                  </div>
                  <div className="p-3 flex flex-col h-3/5">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h2 className="text-base font-semibold text-white truncate">
                          {request.fromUserId?.firstName} {request.fromUserId?.lastName}
                        </h2>
                      </div>

                      {request.fromUserId?.location && (
                        <div className="flex items-center gap-1 text-[#A0A0B0] mb-1.5">
                          <MapPin size={12} />
                          <span className="text-xs ">{request.fromUserId?.location}</span>
                        </div>
                      )}

                      {request.fromUserId?.about && (
                        <p className="text-xs text-[#A0A0B0] mb-2 line-clamp-2">
                          {request.fromUserId?.about}
                        </p>
                      )}
                      {request.fromUserId?.skills && request.fromUserId?.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {request.fromUserId?.skills.slice(0, 2).map((skill, index) => (
                            <span
                              key={index}
                              className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded-full text-[#A0A0B0] border border-white/10"
                            >
                              {skill.length > 12 ? skill.substring(0, 10) + '...' : skill}
                            </span>
                          ))}
                          {request.fromUserId?.skills.length > 2 && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded-full text-[#A0A0B0]">
                              +{request.fromUserId?.skills.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-white/10">
                      <button className="flex-1 px-2 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1 cursor-pointer" onClick={() => reviewRequest("rejected", request?._id)}>
                        <X size={12} />
                        Reject
                      </button>

                      <button className="flex-1 px-2 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all flex items-center justify-center gap-1 cursor-pointer" onClick={() => reviewRequest("accepted", request?._id)}>
                        <Heart size={12} />
                        Accept
                      </button>
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

export default Requests;