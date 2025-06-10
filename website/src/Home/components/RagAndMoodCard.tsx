import { motion } from "framer-motion"
import PrivateSemanticSearch from "../../assets/FeatureCardIcons/PrivateSemanticSearch.png"
import MoodIcon from "../../assets/FeatureCardIcons/MoodIcon.png"

const RagCard = () => {
    return (
        <div className="flex flex-col items-center px-6 py-8 rounded-xl 
                        shadow-sm transition hover:shadow-md
                        bg-white/40 backdrop-blur-[2px] border border-white/20">
            <div className="w-24 h-24 mb-6 transform transition-transform 
                        hover:scale-110 hover:rotate-3">
                <img
                    src={PrivateSemanticSearch}
                    alt="Contextual memory visualization"
                    className="w-full h-full object-contain drop-shadow-lg"
                />
            </div>

            <div className="text-center space-y-3">
                <h3 className="text-xl font-serif text-gray-800">
                    Contextual Memory 
                </h3>

                <p className="text-sm text-gray-700 tracking-wide max-w-xs" 
                   style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                    Recall what's meaningful with{' '}
                    <span className="text-[#2F4F4F] font-medium">built-in RAG</span>
                    <span className="block text-xs text-gray-500 mt-1 italic">
                        (Retrieval-Augmented Generation)
                    </span>
                </p>

                <p className="text-[11px] text-gray-500 italic mt-2" 
                   style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                    with previous journals stored securely on your device
                </p>
            </div>
        </div>
    );
};

const MoodCard = () => {
    return (
        <div className="flex flex-col items-center rounded-xl 
                     bg-white/40 backdrop-blur-[2px] border-[0.5px] border-[#2F4F4F]/10 
                     shadow-[0_2px_8px_-3px_rgba(47,79,79,0.1)]" >
            
            <div className="-mt-3 w-[50%] md:w-[60%] lg:w-[50%] md:mb-4 lg:mb-0">
                <img
                    src={MoodIcon}
                    alt="Mood tracking visualization"
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="text-center space-y-2 px-4 pb-4">
                <h3 className="text-xl font-serif text-gray-800">
                    Mood Tracker Vinaya<span className="text-green-600"> suggests:</span>
                </h3>

                <div className="space-y-2">
                    <p className="text-sm text-gray-600 leading-relaxed" 
                       style={{ fontFamily: 'Fira Sans, serif' }}>
                        "He abused me, he beat me,<br/>
                        He defeated me, he robbed me" —<br/>
                        Those who harbor such thoughts<br/>
                        Will never be free from hatred.
                    </p>
                </div>
            </div>
        </div>
    );
};

export const RagAndMoodCard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-4"
        >
            <div className="flex-1">
                <RagCard />
            </div>
            <div className="flex-1">
                <MoodCard />
            </div>
        </motion.div>
    );
}; 