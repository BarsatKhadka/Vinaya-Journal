import PrivateSemanticSearch from "../../../assets/FeatureCardIcons/PrivateSemanticSearch.png";
import { useTranslation } from 'react-i18next';

export const RagCard = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center px-6 py-8 rounded-xl 
                        shadow-sm transition hover:shadow-md
                        bg-[var(--bg-card)] backdrop-blur-[2px] border border-[var(--border-color)]">
            <div className="w-24 h-24 mb-6 transform transition-transform 
                        hover:scale-110 hover:rotate-3">
                <img
                    src={PrivateSemanticSearch}
                    alt="Contextual memory visualization"
                    className="w-full h-full object-contain drop-shadow-lg"
                    style={{ filter: 'var(--image-filter)' }}
                />
            </div>

            <div className="text-center space-y-3">
                <h3 className="text-xl font-serif text-[var(--text-main)]">
                    {t('features.rag.title')}
                </h3>

                <p className="text-sm text-[var(--text-muted)] tracking-wide max-w-xs" 
                   style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                    {t('features.rag.descriptionPart1')}
                    <span className="text-[var(--text-main)] font-medium">{t('features.rag.descriptionPart2')}</span>
                    <span className="block text-xs text-[var(--text-muted)] mt-1 italic">
                        {t('features.rag.subDescription')}
                    </span>
                </p>

                <p className="text-[11px] text-[var(--text-muted)] italic mt-2"  
                   style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                    {t('features.rag.footer')}
                </p>

            </div>
        </div>
    );
};
