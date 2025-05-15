import MoodIcon from '../../../assets/FeatureCardIcons/MoodIcon.png'

export const MoodCard = () => {
    return (
        <div className="flex flex-col items-center  rounded-xl 
                    border border-gray-400 shadow-sm transition hover:shadow-md"
             style={{ backgroundColor: "#FCFBFA" }}>
            
            <div className="w-[50%]">
                <img
                    src={MoodIcon}
                    alt="Mood tracking visualization"
                    className="w-full h-full object-contain"
                />
            </div>

        </div>
    );
};