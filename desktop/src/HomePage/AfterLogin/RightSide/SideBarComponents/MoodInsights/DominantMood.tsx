import React from "react";

interface DominantMoodProps {
    dominantMood: {
        date: string;
        dominant_mood: string;
    } | {}
}


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
                    <thead className="sticky top-0 bg-[#fef1d6] z-10">
                        <tr>
                            <th className="px-16 py-3 text-left text-sm font-medium text-[#2F4F4F] bg-[#fef1d6]" style={{fontFamily: 'serif'}}>Date</th>
                            <th className="px-16 py-3 text-left text-sm font-medium text-[#2F4F4F] bg-[#fef1d6]" style={{fontFamily: 'serif'}}>Dominant Mood</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(dominantMood).map(([date, mood]) => (
                            <tr key={date} className="hover:bg-[#fef1d6]/50 transition-all border-t border-[#2F4F4F]/50 opacity-80">
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