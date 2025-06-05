import ContextualRAGBackground from '../../../../assets/BackgroundImages/COntextualRAGBackground.png';
import { useState } from 'react';

export const ContextualRAG = () => {
    const [searchQuery, setSearchQuery] = useState('');


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
                            <svg
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#2F4F4F]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <button
                            className="px-6 py-4 bg-[#2F4F4F] text-white rounded-lg cursor-pointer hover:bg-[#2F4F4F]/90 transition-all duration-300 font-serif disabled:opacity-50 flex items-center space-x-2"
                            style={{fontFamily: 'Roboto Mono'}}
                        >
                            <span>Search</span>
                        </button>
                    </div>

                    <div className="mt-4 relative group">
                        <div className="text-[#2F4F4F] font-serif text-sm cursor-help flex items-center space-x-1">
                            <span>What is semantic search?</span>
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div className="absolute left-0 mt-2 w-64 p-4 bg-white rounded-lg shadow-lg border border-[#e6cfa7] z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform translate-y-0">
                            <p className="text-[#2F4F4F] font-serif text-sm">
                                Semantic search finds journal entries by meaning, not just matching words. It understands the context and intent behind your search.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};