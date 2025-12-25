import React from "react";
import { useAppStore } from "../../../../../store";
import { useTranslation } from "react-i18next";

interface MoodData {
    [date: string]: number;
}

interface DailyChangesAndTrendsProps {
    dailyChangesAndTrends: {
        [key: string]: MoodData;
    } | null;
}

const positiveEmotions = [
    'admiration', 'amusement', 'approval', 'caring', 'desire', 
    'excitement', 'gratitude', 'joy', 'love', 'optimism', 
    'pride', 'realization', 'relief', 'surprise', 'curiosity', 'neutral'
];
const negativeEmotions = [
    'anger', 'annoyance', 'confusion', 'disappointment', 'disapproval', 
    'disgust', 'embarrassment', 'fear', 'grief', 'nervousness', 
    'remorse', 'sadness'
];

const getRowColor = (mood: string, currentValue: number, previousValue: number | undefined) => {
    if (previousValue === undefined) return 'bg-transparent';
    
    if (positiveEmotions.includes(mood)) {
        return currentValue < previousValue ? 'bg-red-500/10' : 'bg-[var(--accent)]/10';
    } else if (negativeEmotions.includes(mood)) {
        return currentValue > previousValue ? 'bg-red-500/10' : 'bg-[var(--accent)]/10';
    }
    return 'bg-transparent';
};

export const DailyChangesAndTrends: React.FC<DailyChangesAndTrendsProps> = ({ dailyChangesAndTrends }) => {
    const { selectedMood, setSelectedMood } = useAppStore();    
    const { t } = useTranslation();

    if (!dailyChangesAndTrends || Object.keys(dailyChangesAndTrends).length === 0) {
        return (
            <div>
                <p>{t('moodInsights.noDailyChangesFound')}</p>
            </div>
        )
    }

    const moods = Object.keys(dailyChangesAndTrends);
    const selectedMoodData = dailyChangesAndTrends[selectedMood as keyof typeof dailyChangesAndTrends];
    const sortedEntries = Object.entries(selectedMoodData).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());

    return (
        <div className="mt-8">
            <div className="h-[240px] overflow-y-auto border border-[var(--border-color)] rounded-lg">
                <table className="w-full">
                    <thead className="sticky top-0 bg-[var(--paper-line-bg)] z-10">
                        <tr>
                            <th className="px-16 py-3 text-left text-sm font-medium text-[var(--text-main)] bg-[var(--paper-line-bg)]" style={{fontFamily: 'serif'}}>{t('moodInsights.date')}</th>
                            <th className="px-16 py-3 text-left text-sm font-medium text-[var(--text-main)] bg-[var(--paper-line-bg)]" style={{fontFamily: 'serif'}}>
                                <select 
                                    value={selectedMood}
                                    onChange={(e) => setSelectedMood(e.target.value)}
                                    className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg bg-[var(--bg-card)] text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                                    style={{fontFamily: 'Roboto Mono'}}
                                >
                                    {moods.map((mood) => (
                                        <option key={mood} value={mood}>
                                            {t(`moodInsights.sentiments.${mood}`)}
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