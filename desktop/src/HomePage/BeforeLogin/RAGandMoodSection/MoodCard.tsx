import MoodIcon from '../../../assets/FeatureCardIcons/MoodIcon.png'
import { useTranslation } from 'react-i18next';

export const MoodCard = () => {
    const { t } = useTranslation();
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
                    {t('features.mood.titlePart1')}<span className="text-green-600">{t('features.mood.titlePart2')}</span>
                </h3>

                <div className="space-y-2">
                    <p className="text-sm text-gray-600 leading-relaxed" 
                       style={{ fontFamily: 'Fira Sans, serif' }}>
                        {t('features.mood.quoteLine1')}<br/>
                        {t('features.mood.quoteLine2')}<br/>
                        {t('features.mood.quoteLine3')}<br/>
                        {t('features.mood.quoteLine4')}
                    </p>
                </div>
            </div>
        </div>
    );
};