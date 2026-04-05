import React from 'react';
import { Twitter, Youtube, Facebook, Mail, Instagram, Github, Sparkles, Heart } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 px-6 bg-[#0D1117] border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <Link to="/" className="group flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg shadow-lg group-hover:rotate-3 transition-transform">
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                DevTinder<span className="text-purple-500">.</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              The premier platform for developers to connect, collaborate, and build the next generation of software.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">Resources</h3>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              <Link to="/about" className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium">
                About Us
              </Link>
              <NavLink to="/contact" className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium">
                Contact
              </NavLink>
              <NavLink to="/privacy-policy" className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium">
                Privacy
              </NavLink>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium">
                Terms
              </a>
            </nav>
          </div>

        
          <div className="flex flex-col items-center md:items-end space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">Stay Connected</h3>
            <div className="flex gap-3">
              {[
                { Icon: Github, label: "GitHub" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" }
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="p-2.5 bg-white/5 text-gray-400 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-purple-600 hover:text-white border border-white/5 hover:border-purple-400"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

     
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-500 flex flex-wrap  items-center gap-1">
            <span>© {currentYear} DevTinder. Built with</span>
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
            <span>by developers, for developers.</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-600 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;