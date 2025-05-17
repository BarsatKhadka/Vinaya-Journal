import MoodIcon from '../../../assets/FeatureCardIcons/MoodIcon.png'

export const MoodCard = () => {
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