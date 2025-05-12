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
        <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
            {features.map((feature, index) => (
                <div 
                    key={index}
                    className="flex items-start gap-3 md:gap-4 lg:gap-6 p-3 md:p-3  
                             hover:bg-white/10 rounded-lg transition-colors
                             transform hover:scale-102 hover:shadow-lg"
                >
                    {/* Icon */}
                    <div className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 mt-1 flex-shrink-0">
                        <img
                            src={feature.icon}
                            alt={`${feature.title} icon`}
                            className="w-full h-full object-contain opacity-80"
                        />
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col">
                        <h3 className="text-base md:text-lg lg:text-xl font-medium text-gray-800 mb-1 md:mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};