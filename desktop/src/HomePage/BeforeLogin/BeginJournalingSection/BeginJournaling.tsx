import BeginJournalingImage from "../../../assets/BeginJournalingPen.png";
import ZeroCloudImage from "../../../assets/FeatureCardIcons/CloudIcon.png";
import { Encryption } from "./Encryption";
import { Github } from "lucide-react";

export const BeginJournaling = () => {
    return (
        <div className="flex flex-col px-6 py-8 rounded-xl 
                    shadow-sm transition hover:shadow-md"
             style={{ backgroundColor: "#F7F4F0" }}>
            
            {/* Top Section with Zero Cloud and Open Source */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <img
                        src={ZeroCloudImage}
                        alt="Zero cloud dependency"
                        className="w-6 h-6 object-contain"
                    />
                    <span className="ml-2 text-xs text-gray-600"
                          style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                        Zero Cloud Dependency
                    </span>
                </div>

                <a href="https://github.com/BarsatKhadka/Vinaya-Journal"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center px-3 py-1 bg-[#E6E2DD] 
                          border border-[#CFCAC2] rounded-lg 
                          hover:bg-[#D6D2CC] transition-colors">
                    <Github className="w-4 h-4 mr-1.5 text-gray-700" />
                    <span className="text-[10px] text-gray-700 tracking-wide"
                          style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                        OPEN-SOURCE
                    </span>
                </a>
            </div>

            {/* Main Content */}
            <div className="flex items-center">
                {/* Left side image */}
                <div className="w-1/3 flex-shrink-0">
                    <img
                        src={BeginJournalingImage}
                        alt="Begin journaling illustration"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Right side content */}
                <div className="flex-1 ml-6 space-y-3">
                    <h3 className="text-xl font-serif text-gray-800">
                        Begin Journaling
                    </h3>

                    <button className="mt-4 px-6 py-2 bg-[#2F4F4F] text-white rounded-lg 
                                   hover:bg-[#1F3F3F] transition-colors text-sm"
                            style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                        Begin Journaling
                    </button>
                </div>

                <Encryption/>
            </div>
        </div>
    );
};