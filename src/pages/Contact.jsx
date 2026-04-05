import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, User, MessageCircle } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import toast from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        username: "",
        useremail: "",
        usersubject: "",
        usermessage: ""
    })
    const [isSubmit, setIsSubmit] = useState(false);
    const contactFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmit(true)
        try {
            const res = await axios.post(BASE_URL + "/api/auth/contactus", {
                username: formData.username,
                useremail: formData.useremail,
                usersubject: formData.usersubject,
                usermessage: formData.usermessage
            },
                { withCredentials: true }
            );
            toast.success(res.data.message);
            setFormData({
                username: "",
                useremail: "",
                usersubject: "",
                usermessage: ""
            })
        }
        catch (err) {
            toast.error(err.response?.data?.error);
        }
        finally {
            setIsSubmit(false)
        }

    }
    return (
        <div className="bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A] pt-20 pb-10 px-6" >

            <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
                        Contact <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Us
                        </span>
                    </h2>
                    <p className="text-sm md:text-base max-w-2xl mx-auto" style={{ color: '#9CA3AF' }}>
                        Have questions? We'd love to hear from you.
                    </p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 pb-24">

                <div className="rounded-2xl p-6 md:p-8" style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(236, 72, 153, 0.1)'
                }}>
                    <h2 className="text-2xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
                        Send us a <span style={{ color: '#EC4899' }}>Message</span>
                    </h2>

                    <form className="space-y-5" onSubmit={contactFormSubmit}>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#D1D5DB' }}>
                                Your Name
                            </label>
                            <input
                                type="text"
                                name='username'
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl outline-none"
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    border: '1px solid rgba(236, 72, 153, 0.2)',
                                    color: '#FFFFFF'
                                }}
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#D1D5DB' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name='useremail'
                                value={formData.useremail}
                                onChange={(e) => setFormData({ ...formData, useremail: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl outline-none"
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    border: '1px solid rgba(236, 72, 153, 0.2)',
                                    color: '#FFFFFF'
                                }}
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#D1D5DB' }}>
                                Subject
                            </label>
                            <input
                                type="text"
                                name='usersubject'
                                value={formData.usersubject}
                                onChange={(e) => setFormData({ ...formData, usersubject: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl outline-none"
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    border: '1px solid rgba(236, 72, 153, 0.2)',
                                    color: '#FFFFFF'
                                }}
                                placeholder="How can we help?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#D1D5DB' }}>
                                Message
                            </label>
                            <textarea
                                rows="5"
                                name='usermessage'
                                value={formData.usermessage}
                                onChange={(e) => setFormData({ ...formData, usermessage: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl outline-none resize-none"
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    border: '1px solid rgba(236, 72, 153, 0.2)',
                                    color: '#FFFFFF'
                                }}
                                placeholder="Tell us more..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl font-medium transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                            style={{
                                background: 'linear-gradient(135deg, #EC4899 0%, #A855F7 100%)',
                                color: '#FFFFFF'
                            }}
                        >
                            {
                                !isSubmit ? (
                                    <p className='flex items-center gap-2'>
                                        <Send size={18} />
                                        <span>Send Message</span>
                                    </p>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                )
                            }
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Contact;