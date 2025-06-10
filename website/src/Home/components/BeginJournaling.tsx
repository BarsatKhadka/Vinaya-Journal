import { motion } from "framer-motion"
import { Github } from "lucide-react"
import { Link } from "react-router-dom"
import BeginJournalingImage from "../../assets/BeginJournalingPen.png"
import ZeroCloudImage from "../../assets/FeatureCardIcons/CloudIcon.png"

const DhammaWheel = () => (
    <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="relative w-7 h-7 transform 
                   group-hover:rotate-180 transition-transform duration-1000
                   group-hover:text-white text-white/90"
        stroke="currentColor"
        strokeWidth="1.5"
    >
        {/* Outer rim */}
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="8" />
        
        {/* Eight spokes */}
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
        
        {/* Hub */}
        <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
);

const VersionCard = () => (
    <div className="flex flex-col items-center justify-center w-[200px] h-[200px] bg-[#2F4F4F]/5 rounded-xl p-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2F4F4F]/5 to-[#2F4F4F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="flex flex-col items-center text-center">
            <div className="text-2xl font-serif text-[#2F4F4F] mb-2">Version 1.0</div>
            <div className="text-sm text-[#2F4F4F]/60 italic mb-6">Initial Release</div>
            <a 
                href="https://github.com/BarsatKhadka/Vinaya-Journal/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 
                         text-[#2F4F4F] hover:text-[#1F3F3F]
                         rounded-lg border border-[#2F4F4F]/20
                         hover:border-[#2F4F4F]/40 hover:bg-[#2F4F4F]/5
                         transition-all duration-300 shadow-sm hover:shadow-md
                         bg-white/50 backdrop-blur-sm"
            >
                <Github className="w-4 h-4" />
                <span className="text-sm font-medium tracking-wide">Report Issues</span>
            </a>
        </div>
    </div>
);

export const BeginJournaling = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/40 backdrop-blur-[2px] rounded-xl border border-white/20 shadow-sm"
        >
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                {/* Top Section with Zero Cloud and Open Source */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 
                                  text-gray-600 hover:text-gray-800
                                  rounded-lg border border-gray-200
                                  hover:border-gray-300 hover:bg-gray-50/50
                                  transition-all duration-200 w-full sm:w-auto">
                        <img
                            src={ZeroCloudImage}
                            alt="Zero cloud dependency"
                            className="w-4 h-4"
                        />
                        <span className="text-xs tracking-wide" 
                              style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                            Zero Cloud Dependency
                        </span>
                    </div>
                    <a href="https://github.com/BarsatKhadka/Vinaya-Journal"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center gap-2 px-3 py-1.5 
                                text-gray-600 hover:text-gray-800
                                rounded-lg border border-gray-200
                                hover:border-gray-300 hover:bg-gray-50/50
                                transition-all duration-200 w-full sm:w-auto">
                        <Github className="w-4 h-4" />
                        <span className="text-xs tracking-wide"
                              style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                            Open Source Contribute
                        </span>
                    </a>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 items-center md:items-start">
                    {/* Left Content - Version and Encryption */}
                    <div className="md:col-span-4 md:pr-4 flex justify-center md:justify-start">
                        <VersionCard />
                    </div>

                    {/* Center Image */}
                    <div className="md:col-span-3 flex justify-center md:justify-end items-center">
                        <div className="transform hover:scale-105 transition-transform duration-300">
                            <img
                                src={BeginJournalingImage}
                                alt="Begin journaling illustration"
                                className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] object-contain drop-shadow-md"
                            />
                        </div>
                    </div>

                    {/* Right Content - Begin Journey */}
                    <div className="md:col-span-5 md:pl-4 flex flex-col items-center md:items-start mt-8">
                        <div className="space-y-2 text-center md:text-left">
                            <div className="space-y-1">
                                <h4 className="text-2xl md:text-3xl font-serif text-gray-800 leading-tight">
                                    Begin your Journey with
                                    <span className="text-[#2F4F4F]"> Vinaya</span>
                                </h4>
                                <p className="text-xs text-gray-500 italic mb-3" 
                                   style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                                    Not to become someone but to understand yourself
                                </p>
                            </div>

                            <a href="https://github.com/BarsatKhadka/Vinaya-Journal/blob/main/README.md" target="_blank"
                                  className="group flex items-center justify-center gap-3 px-7 py-3.5 
                                           bg-[#2F4F4F] text-white rounded-xl 
                                           shadow-md hover:shadow-xl
                                           transition-all duration-300 ease-out cursor-pointer
                                           hover:bg-[#1F3F3F] relative
                                           border border-white/5 w-full max-w-[300px]"
                                  style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                                <div className="absolute inset-0 rounded-xl bg-white/5 
                                              opacity-0 group-hover:opacity-100 
                                              transition-opacity duration-300" />
                                <DhammaWheel />
                                <span className="relative text-[15px] font-medium tracking-wider 
                                               text-white/90 group-hover:text-white" 
                                      style={{ fontFamily: '"PlayFair Display", sans-serif' }}>
                                    Why Vinaya?
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}; 