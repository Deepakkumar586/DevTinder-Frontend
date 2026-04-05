import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const AboutCTA = () => {
  return (
    <section className="w-full py-20 px-6 bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A] relative overflow-hidden">

      <div className="max-w-4xl mx-auto text-center relative z-10">

        <div className="inline-flex items-center gap-2 px-4 py-1 mb-4 rounded-full bg-[#111827] border border-gray-800 text-gray-300 text-sm">
          <Sparkles size={16} className="text-pink-500" />
          Join the Community
        </div>

       
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Ready to Find Your{" "}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Perfect Dev Match?
          </span>
        </h2>

       
        <p className="mt-6 text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
          Start connecting with talented developers, build meaningful collaborations,
          and turn your ideas into real-world projects.
        </p>

        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          <Link to="/" className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg text-sm md:text-base">
            Join the Community
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;