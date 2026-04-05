import React from "react";
import { Heart, Users, Sparkles, ArrowRight, Link } from "lucide-react";
import { NavLink } from "react-router-dom";

const AboutHero = () => {
    return (
        <section className="relative w-full  pt-25 pb-10 px-6 overflow-hidden bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2A]">


            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-600 opacity-20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-pink-500 opacity-20 blur-[120px] rounded-full"></div>

            <div className="max-w-5xl mx-auto">

                <div className="text-center md:text-left">


                    <div className="inline-flex items-center gap-2 px-4 py-1 mb-4 rounded-full bg-[#111827] border border-gray-800 text-gray-300 text-sm ">
                        <Sparkles size={16} className="text-pink-500" />
                        Developer Matching Platform
                    </div>


                    <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
                        Connect. Match.{" "}
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Build Together
                        </span>
                    </h1>


                    <p className="mt-6 text-gray-400 text-sm md:text-base  max-w-lg">
                        DevTinder helps developers discover, connect, and collaborate with
                        like-minded creators. Swipe, match, and build amazing projects
                        together.
                    </p>


                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <NavLink to="/">
                            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer">
                                <Heart size={18} />
                                Get Started Now
                                <ArrowRight size={18} />
                            </button>
                        </NavLink>
                    
                    </div>

                    
                    <div className="mt-10 flex flex-wrap gap-6 justify-center md:justify-start text-gray-400 text-sm">
                        <div className="flex items-center gap-2">
                            <Users size={16} className="text-purple-400" />
                            10K+ Developers
                        </div>

                        <div className="flex items-center gap-2">
                            <Heart size={16} className="text-pink-400" />
                            Smart Matching
                        </div>

                        <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-yellow-400" />
                            AI Powered
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutHero;