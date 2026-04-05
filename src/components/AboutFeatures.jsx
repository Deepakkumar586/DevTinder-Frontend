import React from "react";
import {
  Users,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  CreditCard
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <Users size={24} />,
    title: "Connect with Developers",
    desc: "Find like-minded developers to collaborate on open source or freelance projects.",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: <MessageCircle size={22} />,
    title: "Live Chat & Networking",
    desc: "Stay connected through our real-time chat system built with Socket.io.",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: <Sparkles size={22} />,
    title: "Smart Matching",
    desc: "Our intelligent algorithm helps you discover the best developer matches instantly.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Secure Platform",
    desc: "Your data is protected with modern security standards and authentication systems.",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: <CreditCard size={22} />,
    title: "Premium Features",
    desc: "Unlock premium features like profile boosting and advanced search via Razorpay integration.",
    color: "from-cyan-400 to-blue-500"
  }
];

const AboutFeatures = () => {
  return (
    <section className="w-full py-20 px-6 bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A]">
      <div className="max-w-6xl mx-auto">

       
        <div className="text-left mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Powerful Features to{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Build & Connect
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl text-sm md:text-base">
            Everything you need to discover, connect, and collaborate with developers worldwide.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border border-gray-800 bg-[#0B0F14] hover:scale-[1.02] transition-all duration-300 hover:border-gray-700 flex flex-col justify-between
                ${index === 0 ? "lg:col-span-2 bg-gradient-to-br from-[#0B0F14] to-[#161b22]" : "col-span-1"}`}
            >
              <div>
               
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 shadow-md`}
                >
                  {feature.icon}
                </div>

              
                <h3 className={`${index === 0 ? "text-2xl" : "text-lg"} font-semibold text-white mb-2`}>
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-sm md:text-base ">
                  {feature.desc}
                </p>
              </div>

             
              {index === 0 && (
                <Link to="/" className="mt-6 text-sm font-medium text-purple-400 hover:text-purple-300 cursor-pointer">
                  Explore community →
                </Link>
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default AboutFeatures;