import BeginJournalingImage from "../../../assets/BeginJournalingPen.png";
import ZeroCloudImage from "../../../assets/FeatureCardIcons/CloudIcon.png";
import { Encryption } from "./Encryption";
import { Github, BookOpen } from "lucide-react";

export const BeginJournaling = () => {
    return (
        <div className="flex flex-col p-4">
            
            {/* Top Section with Zero Cloud and Open Source */}
            <div className="flex items-center justify-end gap-6 mb-8">
                <div className="flex items-center gap-2">
                    <img
                        src={ZeroCloudImage}
                        alt="Zero cloud dependency"
                        className="w-5 h-5"
                    />
                    <span className="text-xs text-gray-700 font-medium" 
                          style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                        Zero Cloud Dependency
                    </span>
                </div>
                <span className="text-gray-300">|</span>
                <a href="https://github.com/BarsatKhadka/Vinaya-Journal"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 px-3 py-1.5 bg-[#2F4F4F] 
                          rounded-lg shadow-sm hover:bg-[#1F3F3F] 
                          transition-colors duration-200">
                    <Github className="w-4 h-4 text-white" />
                    <span className="text-xs text-white tracking-wide"
                          style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                        Open Source Contribute
                    </span>
                </a>
            </div>

            {/* Main Content */}
            <div className="flex items-start justify-between gap-8">
                {/* Left side content */}
                <div className="flex-1 max-w-md space-y-6">
                    <h2 className="text-3xl font-serif text-gray-800 leading-tight">
                        Begin Your Journey of 
                        <span className="text-[#2F4F4F]"> Mindful Writing</span>
                    </h2>

                    <button className="flex items-center px-6 py-2.5 bg-[#2F4F4F] 
                                   text-white rounded-lg shadow-sm 
                                   hover:bg-[#1F3F3F] transition-all duration-200"
                            style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                        <BookOpen className="w-4 h-4 mr-2" />
                        <span className="text-sm">Start Writing</span>
                    </button>
                </div>

                {/* Center image */}
                <div className="w-1/3 flex-shrink-0 transform 
                            hover:scale-105 transition-transform duration-300">
                    <img
                        src={BeginJournalingImage}
                        alt="Begin journaling illustration"
                        className="w-full h-full object-contain drop-shadow-md"
                    />
                </div>

                {/* Right side encryption */}
                <div className="flex-shrink-0 bg-white/60 backdrop-blur-sm 
                            p-6 rounded-xl border border-gray-200 shadow-sm">
                    <Encryption />
                </div>
            </div>
        </div>
    );
};