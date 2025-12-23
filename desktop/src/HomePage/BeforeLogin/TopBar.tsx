import vinayaWithout from '../../assets/vinayaWithout.png';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';

export const TopBar = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
        setIsOpen(false);
    };

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'fr', label: 'Français' }
    ];

    const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

    return (
        <>
            {/* Top Bar Content */}
            <div className="max-w-screen-xl bg-[#F7F4F0]/10 mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <div className="flex items-center md:gap-4 group">
                        <div className="rounded-full transition-transform duration-300 group-hover:scale-105">
                            <img
                                src={vinayaWithout}
                                alt="Vinaya Logo"
                                className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
                            />
                        </div>
                        <h1 className="text-xl md:text-2xl font-serif font-medium tracking-wide">
                            <span className="text-gray-900 bg-gradient-to-r from-teal-700 to-slate-700 bg-clip-text text-transparent">
                                VINAYA
                            </span>
                        </h1>
                    </div>
                    
                    <div className="relative">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white/80 border border-gray-200 transition-all duration-200"
                        >
                            <Globe className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">{currentLanguage.label}</span>
                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors
                                            ${i18n.language === lang.code ? 'text-teal-700 font-medium bg-teal-50' : 'text-gray-700'}
                                        `}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};