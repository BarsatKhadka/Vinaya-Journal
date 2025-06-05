import { Calendar } from 'lucide-react';

interface SearchResultCardProps {
    content: string;
    date: string;
}

export const SearchResultCard = ({ content, date}: SearchResultCardProps) => {
    return (
        <div className="p-6 mb-4 bg-white rounded-lg border border-[#e6cfa7] hover:border-[#2F4F4F]/30 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#2F4F4F]/70" strokeWidth={1.5} />
                    <span className="text-sm text-[#2F4F4F]/70 font-serif italic">
                        {date}
                    </span>
                </div>
            </div>
            <div className="prose prose-sm max-w-none">
                <p className="text-[#2F4F4F] font-serif leading-relaxed">
                    {content}
                </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#e6cfa7] group-hover:border-[#2F4F4F]/30 transition-colors duration-300">
                <button className="text-xs text-[#2F4F4F]/70 hover:text-[#2F4F4F] font-serif transition-colors duration-200">
                    View full entry →
                </button>
            </div>
        </div>
    );
}; 