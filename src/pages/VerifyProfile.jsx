import React from 'react';
import axios from 'axios';
import { Mail, ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import toast from 'react-hot-toast';

const VerifyProfile = () => {
    const [verifyEmail, setVerifyEmail] = React.useState({
        emailId: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const [emailValid, setEmailValid] = React.useState(true);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setVerifyEmail({ ...verifyEmail, emailId: email });
        setEmailValid(validateEmail(email));
    };

    const handleVerifySubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(verifyEmail.emailId)) {
            setError('Please enter a valid email address');
            setEmailValid(false);
            return;
        }

        try {
            setIsLoading(true);
            setError('');
            const res = await axios.post(BASE_URL + '/api/auth/sendOtp',
                { emailId: verifyEmail.emailId },
                { withCredentials: true }
            );
            toast.success(res.data.message);
            navigate('/verify-otp')

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to send verification code. Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className='min-h-screen flex items-center justify-center p-4' style={{ backgroundColor: '#0B0F14' }}>
            <div className='w-full max-w-md rounded-2xl p-8 shadow-2xl' style={{ backgroundColor: '#111827' }}>
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2" style={{ color: '#E5E7EB' }}>
                        Verify Your Profile
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Enter your email address to receive a verification code
                    </p>
                </div>

                <form onSubmit={handleVerifySubmit} className="space-y-6">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#E5E7EB' }}>
                            <Mail size={16} />
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={verifyEmail.emailId}
                                onChange={handleEmailChange}
                                className={`w-full px-4 py-3 pl-11 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-2 ${!emailValid && verifyEmail.emailId ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'
                                    }`}
                                style={{
                                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                                    color: '#E5E7EB',
                                    border: `1px solid ${!emailValid && verifyEmail.emailId ? '#EF4444' : 'rgba(75, 85, 99, 0.5)'}`
                                }}
                                placeholder="you@example.com"
                                required
                                disabled={isLoading}
                            />
                            <Mail
                                size={18}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                                style={{ color: !emailValid && verifyEmail.emailId ? '#EF4444' : '#9CA3AF' }}
                            />
                        </div>
                        {!emailValid && verifyEmail.emailId && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle size={12} />
                                Please enter a valid email address
                            </p>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                            <p className="text-red-500 text-sm flex items-center gap-2">
                                <AlertCircle size={16} />
                                {error}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || (!emailValid && verifyEmail.emailId)}
                        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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
                            <span className='flex items-center gap-2 group'>
                                Send Verification Code
                                <ArrowRight size={16} className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                            </span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyProfile;