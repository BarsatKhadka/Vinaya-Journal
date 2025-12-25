import { useEffect, useState } from 'react';
import MoodInsightsBackground from '../../../../../assets/BackgroundImages/MoodInsightsBackground.png';
import axios from 'axios';
import { ChevronDown } from 'lucide-react';
import { MoodRecord } from './mood';
import { MoodCharts } from './MoodCharts';
import { AnalyzeMood } from './AnalyzeMood';
import { useAppStore } from '../../../../../store';
import { useTranslation } from 'react-i18next';

export const MoodInsights = () => {
    const { t } = useTranslation();
    const [_moodInsights, setMoodInsights] = useState<MoodRecord[]>([]);
    const { selectedDays, setSelectedDays } = useAppStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { chartData, setChartData ,  setChartDataType } = useAppStore();

    const timeRanges = [
        { label: t('moodInsights.last2Days'), value: 2 },
        { label: t('moodInsights.lastWeek'), value: 7 },
        { label: t('moodInsights.last2Weeks'), value: 14 },
        { label: t('moodInsights.lastMonth'), value: 30 }
    ];
    
    useEffect(() => {
        const fetchMoodInsights = async () => {
            const response = await axios.get(`http://localhost:8000/mood_insights?last_n_days=${selectedDays}`);
            const data = response.data;
            setMoodInsights(data);
            setChartData(data.map((entry: MoodRecord) => ({
                date: entry.date,
                ...entry.sentiment 
            })));
            setChartDataType("Initial")
            
        };
        fetchMoodInsights();
    }, [selectedDays, setChartData]);

    return (
        <div className="flex flex-col h-full relative">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${MoodInsightsBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: '50% center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'var(--image-filter)',
                }}
            />
            <div className="absolute inset-0 bg-[var(--bg-main)]/50 pointer-events-none z-0" />
            <div className="relative z-10 flex flex-col w-full">
                <div className="flex items-center justify-end mt-8">
                    <div className="relative mr-6">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--accent)] text-[var(--text-on-accent)] font-serif hover:opacity-90 transition-colors"
                        >
                            {timeRanges.find(range => range.value === selectedDays)?.label}
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-full right-0 mt-1 w-40 bg-[var(--bg-card)] rounded-md shadow-lg border border-[var(--border-color)]">
                                {timeRanges.map((range) => (
                                    <button
                                        key={range.value}
                                        onClick={() => {
                                            setSelectedDays(range.value);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 font-serif text-[var(--text-main)] hover:bg-[var(--hover-bg)] transition-colors ${
                                            selectedDays === range.value ? 'bg-[var(--hover-bg)]' : ''
                                        }`}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <MoodCharts chartData={chartData} />
            </div>
            <AnalyzeMood />
        </div>
    );
};