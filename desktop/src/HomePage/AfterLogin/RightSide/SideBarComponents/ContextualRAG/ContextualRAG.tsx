import ContextualRAGBackground from '../../../../../assets/BackgroundImages/COntextualRAGBackground.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, HelpCircle } from 'lucide-react';
import { SearchResultCard } from './SearchResultCard';

interface SearchResult {
    id: string;
    content: string;
    date: string;
    similarity?: number;
}

export const ContextualRAG = () => {
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
        <div className="flex flex-col h-full p-8 bg-[#fae4b2]/50" style={{
            backgroundImage: `url(${ContextualRAGBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className="w-full max-w-2xl space-y-6">
                <div className="relative">
                    <div className="flex items-center space-x-2">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search your memories semantically..."
                                className="w-full p-4 pl-12 pr-12 rounded-lg border border-[#e6cfa7] focus:ring-2 focus:ring-[#e0f2ef] focus:border-[#2F4F4F] outline-none font-serif transition-all duration-300"
                                style={{
                                    background: 'repeating-linear-gradient(to bottom, #fef1d6, #fef1d6 28px, #f9e4b7 29px, #fef1d6 30px)',
                                    boxShadow: '0 2px 12px 0 #e6e1d5',
                                }}
                            />
                            <Search
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#2F4F4F]"
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>

                    <div className="mt-4 relative group">
                        <div className="text-[#2F4F4F] font-serif text-sm cursor-help flex items-center space-x-1">
                            <span>What is semantic search?</span>
                            <HelpCircle
                                className="w-4 h-4"
                                strokeWidth={1.5}
                            />
                        </div>
                        <div className="absolute left-0 mt-2 w-64 p-4 bg-white rounded-lg shadow-lg border border-[#e6cfa7] z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform translate-y-0">
                            <p className="text-[#2F4F4F] font-serif text-sm">
                                Semantic search finds journal entries by meaning, not just matching words. It understands the context and intent behind your search.
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
                            <div className="text-center py-8 text-[#2F4F4F]/70 font-serif">
                                No results found
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};