import React from "react";

interface DominantMoodProps {
    dominantMood: {
        date: string;
        dominant_mood: string;
    } | {}
}

const getSentimentColor = (sentiment: string) => {
    const colors = {
        neutral: 'bg-[#fef1d6] border-[#2F4F4F]',
        surprise: 'bg-[#e6f3ff] border-[#2F4F4F]',
        joy: 'bg-[#e6ffe6] border-[#2F4F4F]',
        fear: 'bg-[#fff2e6] border-[#2F4F4F]',
        anger: 'bg-[#ffe6e6] border-[#2F4F4F]',
        sadness: 'bg-[#e6e6ff] border-[#2F4F4F]',
        disgust: 'bg-[#f2e6ff] border-[#2F4F4F]'
    };
    return colors[sentiment.toLowerCase() as keyof typeof colors] || 'bg-[#fef1d6] border-[#2F4F4F]';
};

export const DominantMood: React.FC<DominantMoodProps> = ({dominantMood}) => {
    if (!dominantMood || Object.keys(dominantMood).length === 0) {
        return (
            <div>
                <p>No dominant mood found</p>
            </div>
        )
    }

    return (
        <div className="mt-8">
            <div className="h-[240px] overflow-y-auto border border-[#2F4F4F]/20 rounded-lg">
                <table className="w-full">
                    <thead className="sticky top-0 bg-[#fef1d6]">
                        <tr>
                            <th className="px-16 py-3 text-left text-sm font-medium text-[#2F4F4F]" style={{fontFamily: 'serif'}}>Date</th>
                            <th className="px-16 py-3 text-left text-sm font-medium text-[#2F4F4F]" style={{fontFamily: 'serif'}}>Dominant Mood</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(dominantMood).map(([date, mood]) => (
                            <tr key={date} className="hover:bg-[#fef1d6]/50 transition-all border-t border-[#2F4F4F]/50">
                                <td className="px-16 py-3 text-sm text-black" style={{fontFamily: 'Roboto Mono'}}>{date}</td>
                                <td className="px-16 py-3 text-sm font-medium text-black" style={{fontFamily: 'Roboto Mono'}}>
                                    {(mood as string).charAt(0).toUpperCase() + (mood as string).slice(1)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}