import React, { useState } from "react";
import { ShieldCheck, Mail, ArrowRight } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "","",""]);
  const loginuserEmail = useSelector((state)=>state.auth.user.emailId);
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
    
    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }

  };

  const verifyOtpSubmit = async (e) => {
     e.preventDefault();
    try{
       setIsLoading(true);
        const otpString = otp.join("");
      const res = await axios.post(BASE_URL + '/api/auth/verify-otp',{
        emailId :loginuserEmail,
        otp : otpString
      }, {withCredentials:true})
      toast.success(res.data.message)
      navigate("/")

    }
    catch(err){
      toast.error(err.response?.data?.message)
    }
    finally{
       setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#0B0F14' }}>
      
      <div className='w-full max-w-md rounded-2xl p-8 shadow-2xl' style={{ backgroundColor: '#111827' }}>
    
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Verify OTP
        </h2>
        <p className="text-gray-400 text-sm mb-6 flex items-center justify-center gap-2">
          <Mail size={16} />
          Enter the code sent to your email
        </p>

 
       <form onSubmit={verifyOtpSubmit} className="space-y-4">
         <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-center text-lg font-bold bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ))}
        </div>

     
       
         <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{ backgroundColor: '#8B5CF6' }}
            >

              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2 group">  Verify <ArrowRight size={18} className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              )}

            </button>
       </form>

      </div>
    </div>
  );
};

export default VerifyOtp;