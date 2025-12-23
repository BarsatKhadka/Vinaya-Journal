import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Settings: React.FC = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('about');

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.altKey && event.key === 'ArrowLeft') {
                navigate('/app');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

    return (
        <div className="flex h-screen bg-[#fae4b2]">
            {/* Left Sidebar */}
            <div className="w-48 bg-white border-r border-[#2F4F4F]/20 p-4">
                <Link to="/app" className="flex items-center space-x-2 text-[#2F4F4F] font-serif mb-6 hover:text-[#2F4F4F]/80">
                    <ArrowLeft className="w-5 h-5" />
                    <span>{t('settings.back')} (Alt + <ArrowLeft className="w-3 h-3 inline-block text-red-500" />)</span>
                </Link>
                
                <div className="space-y-2">
                    <motion.button
                        onClick={() => setActiveTab('about')}
                        className={`w-full text-left px-3 py-2 rounded-lg font-serif ${activeTab === 'about' ? 'bg-[#2F4F4F] text-white' : 'text-[#2F4F4F] hover:bg-[#2F4F4F]/10'}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {t('settings.about')}
                    </motion.button>
                    <motion.button
                        onClick={() => setActiveTab('language')}
                        className={`w-full text-left px-3 py-2 rounded-lg font-serif ${activeTab === 'language' ? 'bg-[#2F4F4F] text-white' : 'text-[#2F4F4F] hover:bg-[#2F4F4F]/10'}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {t('settings.language')}
                    </motion.button>
                </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="flex flex-col bg-white rounded-xl shadow-lg p-8 max-w-[600px] w-full">
                    {activeTab === 'about' && (
                        <div className="space-y-6">
                            <h2 className="text-[#2F4F4F] font-serif text-2xl">{t('settings.aboutTitle')}</h2>
                            
                            <div className="space-y-4">
                                <div className="bg-[#fae4b2]/30 rounded-lg p-4 border border-[#2F4F4F]/20">
                                    <h3 className="text-[#2F4F4F] font-serif text-lg mb-2">{t('settings.version')}</h3>
                                    <p className="text-[#2F4F4F] font-serif">1.0.0</p>
                                </div>

                                <div className="bg-[#fae4b2]/30 rounded-lg p-4 border border-[#2F4F4F]/20">
                                    <h3 className="text-[#2F4F4F] font-serif text-lg mb-2">{t('settings.description')}</h3>
                                    <p className="text-[#2F4F4F] font-serif">
                                        {t('settings.descriptionText')}
                                    </p>
                                </div>

                                <div className="bg-[#fae4b2]/30 rounded-lg p-4 border border-[#2F4F4F]/20">
                                    <h3 className="text-[#2F4F4F] font-serif text-lg mb-2">{t('settings.copyright')}</h3>
                                    <p className="text-[#2F4F4F] font-serif">{t('settings.copyrightText1')}</p>
                                    <p className="text-[#2F4F4F] font-serif">{t('settings.copyrightText2')}</p>
                                    <p className="text-[#2F4F4F] font-serif">{t('settings.copyrightText3')}</p>
                                    <p className="text-[#2F4F4F] font-serif">{t('settings.copyrightText4')}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'language' && (
                        <div className="space-y-6">
                            <h2 className="text-[#2F4F4F] font-serif text-2xl">{t('settings.language')}</h2>
                            <div className="bg-[#fae4b2]/30 rounded-lg p-4 border border-[#2F4F4F]/20">
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => changeLanguage('en')} 
                                        className={`px-4 py-2 rounded-lg font-serif transition-colors ${i18n.language === 'en' ? 'bg-[#2F4F4F] text-white' : 'bg-white border border-[#2F4F4F] text-[#2F4F4F]'}`}
                                    >
                                        English
                                    </button>
                                    <button 
                                        onClick={() => changeLanguage('fr')} 
                                        className={`px-4 py-2 rounded-lg font-serif transition-colors ${i18n.language === 'fr' ? 'bg-[#2F4F4F] text-white' : 'bg-white border border-[#2F4F4F] text-[#2F4F4F]'}`}
                                    >
                                        Français
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};