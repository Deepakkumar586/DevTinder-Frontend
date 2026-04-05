import React from 'react';
import { Shield, Mail, Lock, Globe, Cookie } from 'lucide-react';

const PrivacyPolicy = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A] pt-20 pb-10 px-6">    
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-2"
               style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)' }}>
            <Shield size={24} style={{ color: '#EC4899' }} />
          </div>
          
         
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
           Privacy <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Policy
            </span>
            </h2>
          
          <p className="text-sm md:text-base" style={{ color: '#9CA3AF' }}>
            Last updated: {currentDate}
          </p>
        </div>
      </div>

     
      <div className="max-w-3xl mx-auto px-6 pb-24">
        
        <div className="mb-12">
          <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
            At DevTinder, we take your privacy seriously. This policy describes how we collect, 
            use, and protect your personal information when you use our platform.
          </p>
        </div>
       
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#EC4899' }}>
            1. Information We Collect
          </h2>
          <div className="space-y-3">
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
              <span className="font-medium" style={{ color: '#FFFFFF' }}>Account Information:</span>{' '}
              When you create an account, we collect your name, email address, and profile details.
            </p>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
              <span className="font-medium" style={{ color: '#FFFFFF' }}>Usage Data:</span>{' '}
              We automatically collect information about how you interact with our platform, 
              including your IP address, browser type, and device information.
            </p>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
              <span className="font-medium" style={{ color: '#FFFFFF' }}>Communication Data:</span>{' '}
              Messages, feedback, and support requests you send to us.
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#A855F7' }}>
            2. How We Use Your Information
          </h2>
          <div className="space-y-3">
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
              • To provide, maintain, and improve our services
            </p>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
              • To match you with relevant developers and opportunities
            </p>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
              • To send you important updates about your account
            </p>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
              • To protect against fraud and unauthorized access
            </p>
          </div>
        </div>

       
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#EC4899' }}>
            3. Data Security
          </h2>
          <div className="flex items-start gap-3 p-4 rounded-lg mb-3"
               style={{ backgroundColor: 'rgba(236, 72, 153, 0.05)', borderLeft: '3px solid #EC4899' }}>
            <Lock size={18} style={{ color: '#EC4899' }} className="mt-0.5 flex-shrink-0" />
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
              We implement industry-standard security measures including encryption, 
              secure servers, and regular security audits to protect your data.
            </p>
          </div>
        </div>

      
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#A855F7' }}>
            4. Cookies & Tracking
          </h2>
          <div className="flex items-start gap-3 p-4 rounded-lg mb-3"
               style={{ backgroundColor: 'rgba(168, 85, 247, 0.05)', borderLeft: '3px solid #A855F7' }}>
            <Cookie size={18} style={{ color: '#A855F7' }} className="mt-0.5 flex-shrink-0" />
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
              We use cookies to enhance your browsing experience. You can control cookie 
              preferences through your browser settings.
            </p>
          </div>
        </div>

      
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#EC4899' }}>
            5. Your Rights
          </h2>
          <div className="space-y-3">
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
              • <span className="font-medium" style={{ color: '#FFFFFF' }}>Access</span> – Request a copy of your data
            </p>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
              • <span className="font-medium" style={{ color: '#FFFFFF' }}>Correction</span> – Update inaccurate information
            </p>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
              • <span className="font-medium" style={{ color: '#FFFFFF' }}>Deletion</span> – Request data removal
            </p>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
              • <span className="font-medium" style={{ color: '#FFFFFF' }}>Opt-out</span> – Unsubscribe from marketing
            </p>
          </div>
        </div>

       
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#A855F7' }}>
            6. Data Retention
          </h2>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
            We retain your personal information for as long as your account is active 
            or as needed to provide you services. After account deletion, we retain 
            certain data for legal compliance and fraud prevention.
          </p>
        </div>

       
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#EC4899' }}>
            7. Third-Party Services
          </h2>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
            Our platform may contain links to third-party websites. We are not responsible 
            for their privacy practices. We encourage you to read their privacy policies.
          </p>
        </div>

       
        <div className="pt-8 mt-4 border-t" style={{ borderColor: 'rgba(236, 72, 153, 0.2)' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)' }}>
                <Mail size={20} style={{ color: '#EC4899' }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: '#9CA3AF' }}>Questions? Contact us</p>
                <p className="font-medium" style={{ color: '#EC4899' }}>privacy@devtinder.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}>
                <Globe size={20} style={{ color: '#A855F7' }} />
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;