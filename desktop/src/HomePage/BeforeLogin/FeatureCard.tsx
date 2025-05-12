interface Feature {
    icon: string;
    title: string;
    description: React.ReactNode;
}

const features: Feature[] = [
    {
        icon: "/icons/memory.png",
        title: "Local AI Memory",
        description: (
            <>
                Vinaya surfaces your past entries using on-device ollama AI.<br />—
                Nothing leaves your machine.
            </>
        )
    },
    {
        icon: "/icons/search.png",
        title: "Private RAG Semantic Search",
        description: (
            <>
                Search journal entries with meaning-aware local AI.<br />—
                No APIs. No tracking.
            </>
        )
    },
    {
        icon: "/icons/lock.png",
        title: "Zero Cloud Dependency",
        description: (
            <>
                All data is stored locally and optionally encrypted.<br />—
                Ultimate Privacy.
            </>
        )
    },
    {
        icon: "/icons/chart.png",
        title: "Insightful Mood Tracking",
        description: (
            <>
                See how your tone, focus, and patterns evolve over time.<br />—
                Gradually know thyself.
            </>
        )
    }
];

export const FeatureCard = () => {
    return (
        <div className="flex flex-col space-y-2 md:space-y-3 lg:space-y-6">
            {features.map((feature, index) => (
                <div 
                    key={index}
                    className="flex items-start gap-1.5 md:gap-2 lg:gap-4 p-1.5 md:p-2 lg:p-4  
                             hover:bg-white/10 rounded-lg transition-colors
                             transform hover:scale-102 hover:shadow-lg"
                >
                    {/* Icon */}
                    <div className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0">
                        <img
                            src={feature.icon}
                            alt={`${feature.title} icon`}
                            className="w-full h-full object-contain opacity-80"
                        />
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col">
                        <h3 className="text-xs md:text-sm lg:text-lg font-medium text-gray-800 mb-0.5">
                            {feature.title}
                        </h3>
                        <p className="text-[10px] md:text-xs lg:text-base text-gray-600 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};