import React, { useState } from "react";

interface MoodData {
    [date: string]: number;
}

interface DailyChangesAndTrendsProps {
    dailyChangesAndTrends: {
        anger: MoodData;
        disgust: MoodData;
        fear: MoodData;
        joy: MoodData;
        sadness: MoodData;
        surprise: MoodData;
        neutral: MoodData;
    } | null;
}

const positiveEmotions = ['joy', 'surprise', 'neutral'];
const negativeEmotions = ['anger', 'disgust', 'fear', 'sadness'];

const getRowColor = (mood: string, currentValue: number, previousValue: number | undefined) => {
    if (previousValue === undefined) return 'bg-white';
    
    if (positiveEmotions.includes(mood)) {
        return currentValue < previousValue ? 'bg-red-100' : 'bg-green-100';
    } else if (negativeEmotions.includes(mood)) {
        return currentValue > previousValue ? 'bg-red-100' : 'bg-green-100';
    }
    return 'bg-white';
};

export const DailyChangesAndTrends: React.FC<DailyChangesAndTrendsProps> = ({ dailyChangesAndTrends }) => {
    const [selectedMood, setSelectedMood] = useState<string>("anger");

    if (!dailyChangesAndTrends || Object.keys(dailyChangesAndTrends).length === 0) {
        return (
            <div>
                <p>No daily changes and trends found</p>
            </div>
        )
    }

    const moods = Object.keys(dailyChangesAndTrends);
    const selectedMoodData = dailyChangesAndTrends[selectedMood as keyof typeof dailyChangesAndTrends];
    const sortedEntries = Object.entries(selectedMoodData).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());

    return (
        <div className="mt-8">
            <div className="h-[240px] overflow-y-auto border border-[#2F4F4F]/20 rounded-lg">
                <table className="w-full">
                    <thead className="sticky top-0 bg-[#fef1d6] z-10">
                        <tr>
                            <th className="px-16 py-3 text-left text-sm font-medium text-[#2F4F4F] bg-[#fef1d6]" style={{fontFamily: 'serif'}}>Date</th>
                            <th className="px-16 py-3 text-left text-sm font-medium text-[#2F4F4F] bg-[#fef1d6]" style={{fontFamily: 'serif'}}>
                                <select 
                                    value={selectedMood}
                                    onChange={(e) => setSelectedMood(e.target.value)}
                                    className="w-full px-4 py-2 border border-[#2F4F4F]/20 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#2F4F4F]/20"
                                    style={{fontFamily: 'Roboto Mono'}}
                                >
                                    {moods.map((mood) => (
                                        <option key={mood} value={mood}>
                                            {mood.charAt(0).toUpperCase() + mood.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEntries.map(([date, value], index) => {
                            const previousValue = index > 0 ? sortedEntries[index - 1][1] : undefined;
                            return (
                                <tr 
                                    key={date} 
                                    className={`${getRowColor(selectedMood, value, previousValue)} hover:bg-opacity-80 transition-all opacity-80 border-t border-[#2F4F4F]/50`}
                                >
                                    <td className="px-16 py-3 text-sm text-black" style={{fontFamily: 'Roboto Mono'}}>
                                        {date}
                                    </td>
                                    <td className="px-16 py-3 text-sm font-medium text-black" style={{fontFamily: 'Roboto Mono'}}>
                                        {value}%
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}