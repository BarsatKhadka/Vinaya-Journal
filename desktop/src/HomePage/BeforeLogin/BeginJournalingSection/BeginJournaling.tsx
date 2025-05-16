import BeginJournalingImage from "../../../assets/BeginJournalingPen.png";
import ZeroCloudImage from "../../../assets/FeatureCardIcons/CloudIcon.png";
import { Encryption } from "./Encryption";
import { Github } from "lucide-react";

export const BeginJournaling = () => {
    return (
        <div className="flex flex-col px-6 ">
            
            {/* Top Section with Zero Cloud and Open Source */}
            <div className="flex items-center justify-end gap-4 mb-8">
                <div className="flex items-center bg-white 
                                border border-gray-200 rounded-lg shadow-sm">
                    <img
                        src={ZeroCloudImage}
                        alt="Zero cloud dependency"
                        className="w-6 h-6 object-contain mr-2"
                    />
                    <div className="flex items-center px-3 py-[6px] ">
                        <span className="text-xs text-gray-700 font-medium" 
                              style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                            Zero Cloud Dependency
                        </span>
                    </div>
                </div>
                
                <a href="https://github.com/BarsatKhadka/Vinaya-Journal"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center px-3 py-1 bg-[#2F4F4F] 
                          border border-[#2F4F4F] rounded-lg 
                          hover:bg-[#1F3F3F] transition-colors">
                    <Github className="w-4 h-4 mr-1.5 text-white" />
                    <span className="text-[10px] text-white tracking-wide"
                          style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                        Open Source
                    </span>
                </a>
            </div>

            {/* Main Content */}
            <div className="flex items-start gap-8">
                {/* Left side image */}
                <div className="w-1/3 flex-shrink-0">
                    <img
                        src={BeginJournalingImage}
                        alt="Begin journaling illustration"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Center content */}
                <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-serif text-gray-800">
                        Begin Journaling
                    </h3>

                    <button className="px-6 py-2 bg-[#2F4F4F] text-white rounded-lg 
                               hover:bg-[#1F3F3F] transition-colors text-sm"
                            style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                        Start Writing
                    </button>
                </div>

                {/* Right side encryption */}
                <div className="flex-shrink-0">
                    <Encryption />
                </div>
            </div>
        </div>
    );
};