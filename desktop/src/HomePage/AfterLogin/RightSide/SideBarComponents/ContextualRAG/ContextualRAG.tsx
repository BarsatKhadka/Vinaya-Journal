import ContextualRAGBackground from '../../../../../assets/BackgroundImages/COntextualRAGBackground.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, HelpCircle } from 'lucide-react';
import { SearchResultCard } from './SearchResultCard';
import { useTranslation } from 'react-i18next';

interface SearchResult {
    id: string;
    content: string;
    date: string;
    similarity?: number;
}

export const ContextualRAG = () => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    
    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/query?q=${searchQuery}`);
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };
        
        if (searchQuery.trim()) {
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    return (
        <div className="flex flex-col h-full relative p-8">
            <div 
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${ContextualRAGBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'var(--image-filter)'
                }}
            />
            <div className="absolute inset-0 bg-[var(--bg-main)]/50 pointer-events-none z-0" />
            <div className="w-full max-w-2xl space-y-6 relative z-10">
                <div className="relative">
                    <div className="flex items-center space-x-2">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('rag.searchPlaceholder')}
                                className="w-full p-4 pl-12 pr-12 rounded-lg border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] outline-none font-serif transition-all duration-300 text-[var(--text-main)] placeholder-[var(--text-muted)]"
                                style={{
                                    background: 'var(--bg-card)',
                                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.05)',
                                }}
                            />
                            <Search
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-main)]"
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>

                    <div className="mt-4 relative group">
                        <div className="text-[var(--text-main)] font-serif text-sm cursor-help flex items-center space-x-1">
                            <span>{t('rag.whatIsSemantic')}</span>
                            <HelpCircle
                                className="w-4 h-4"
                                strokeWidth={1.5}
                            />
                        </div>
                        <div className="absolute left-0 mt-2 w-64 p-4 bg-[var(--bg-card)] rounded-lg shadow-lg border border-[var(--border-color)] z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform translate-y-0">
                            <p className="text-[var(--text-main)] font-serif text-sm">
                                {t('rag.semanticDescription')}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 space-y-4">
                        {searchResults.length > 0 ? (
                            searchResults.map((result) => (
                                <SearchResultCard
                                    key={result.id}
                                    content={result.content}
                                    date={result.date}
                                />
                            ))
                        ) : searchQuery.trim() ? (
                            <div className="text-center py-8 text-[var(--text-muted)] font-serif">
                                {t('rag.noResults')}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};