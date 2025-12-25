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
            <div className="max-w-screen-xl bg-transparent mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <div className="flex items-center md:gap-4 group">
                        <div className="rounded-full transition-transform duration-300 group-hover:scale-105">
                            <img
                                src={vinayaWithout}
                                alt="Vinaya Logo"
                                className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
                                style={{ filter: 'var(--image-filter)' }}
                            />
                        </div>
                        <h1 className="text-xl md:text-2xl font-serif font-medium tracking-wide">
                            <span className="text-[var(--text-main)]">
                                VINAYA
                            </span>
                        </h1>
                    </div>
                    
                    <div className="relative">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] transition-all duration-200"
                        >
                            <Globe className="w-4 h-4 text-[var(--text-muted)]" />
                            <span className="text-sm font-medium text-[var(--text-main)]">{currentLanguage.label}</span>
                            <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-[var(--bg-card)] rounded-lg shadow-lg border border-[var(--border-color)] py-1 z-50">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-card)] hover:text-[var(--text-main)] transition-colors
                                            ${i18n.language === lang.code ? 'text-[var(--text-main)] font-medium bg-[var(--bg-card)] border-l-2 border-[var(--text-main)]' : 'text-[var(--text-muted)]'}
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