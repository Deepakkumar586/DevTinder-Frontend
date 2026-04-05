import React from 'react';
import axios from 'axios';
import { Mail, ArrowRight, ArrowLeft, CheckCircle,Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const { token } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const validatePassword = () => {
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (error) setError('');
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword()) return;

        if (!token) {
            setError('Invalid or missing reset token');
            return;
        }

        try {
            setIsLoading(true);
            setError('');

            const res = await axios.post(
                `${BASE_URL}/api/auth/reset-password/${token}`,
                {
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                },
                {withCredentials: true}
            );

            toast.success(res.data.message || 'Password reset successfully!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className='min-h-screen flex items-center justify-center p-4' style={{ backgroundColor: '#0B0F14' }}>
                <div className='w-full max-w-md rounded-2xl p-8 shadow-2xl text-center' style={{ backgroundColor: '#111827' }}>
                    <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
                    <h2 className="text-xl font-bold mb-2" style={{ color: '#E5E7EB' }}>Invalid Reset Link</h2>
                    <p className="text-gray-400 mb-6">This password reset link is invalid or has expired.</p>
                    <Link
                        to="/forgot-password"
                        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-white transition-all"
                        style={{ backgroundColor: '#8B5CF6' }}
                    >
                        Request New Reset Link
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen flex items-center justify-center p-4' style={{ backgroundColor: '#0B0F14' }}>
            <div className='w-full max-w-md rounded-2xl p-8 shadow-2xl' style={{ backgroundColor: '#111827' }}>
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2" style={{ color: '#E5E7EB' }}>
                        Create New Password
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Please enter your new password below
                    </p>
                </div>

                <form onSubmit={handleResetSubmit} className="space-y-6">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#E5E7EB' }}>
                            <Lock size={16} />
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                required
                                disabled={isLoading}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 pl-10 pr-10"
                                style={{
                                    backgroundColor: '#1F2937',
                                    borderColor: '#374151',
                                    color: '#E5E7EB'
                                }}
                            />
                             <Lock
                                              size={18}
                                              className="absolute left-3 top-1/2 transform -translate-y-1/2"
                                              style={{ color: '#9CA3AF' }}
                                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                style={{ color: '#9CA3AF' }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#E5E7EB' }}>
                            <Lock size={16} />
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm new password"
                                required
                                disabled={isLoading}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 pl-10 pr-10"
                                style={{
                                    backgroundColor: '#1F2937',
                                    borderColor: '#374151',
                                    color: '#E5E7EB'
                                }}
                            />
                            <Lock
                                              size={18}
                                              className="absolute left-3 top-1/2 transform -translate-y-1/2"
                                              style={{ color: '#9CA3AF' }}
                                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                style={{ color: '#9CA3AF' }}
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
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
                        disabled={isLoading}
                        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#8B5CF6' }}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Resetting...
                            </span>
                        ) : (
                            <span className='flex items-center gap-2 group'>
                                Reset Password
                                <ArrowRight size={16} className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                            </span>
                        )}
                    </button>

                    <div className="text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200 group"
                        >
                            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;