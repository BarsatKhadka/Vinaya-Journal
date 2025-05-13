import LocalAiMemory from  "../../assets/FeatureCardIcons/LocalAiMemory.png";

export const LocalAIFeature = () => {
    return (
        <div className="flex items-start gap-1.5 md:gap-2 lg:gap-4 p-1.5 md:p-2 lg:p-4  
                    hover:bg-white/10 rounded-lg transition-colors
                    transform hover:scale-102 hover:shadow-lg"
        >
            {/* Icon */}
            <div className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0">
                <img
                    src={LocalAiMemory}
                    alt="Local AI Memory icon"
                    className="w-full h-full object-contain opacity-80"
                />
            </div>
            
            {/* Content */}
            <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                    <h3 className="text-xs md:text-sm lg:text-lg font-medium text-gray-800">
                        Locally Setup Ollama AI
                    </h3>
                    <span className="text-[10px] md:text-xs lg:text-base text-gray-600">
                        — <span style={{ fontFamily: '"Playfair Display", serif' }} className="">
                            cause here nothing leaves your machine
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};