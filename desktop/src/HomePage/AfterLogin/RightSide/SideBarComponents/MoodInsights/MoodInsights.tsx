import { useEffect, useState } from 'react';
import MoodInsightsBackground from '../../../../../assets/BackgroundImages/MoodInsightsBackground.png';
import axios from 'axios';
import { ChevronDown } from 'lucide-react';

type MoodRecord = {
    date: string;
    sentiment: {
        anger: number;
        disgust: number;
        fear: number;
        joy: number;
        neutral: number;
        sadness: number;
        surprise: number;
    };
};

const timeRanges = [
    { label: 'Last 2 Days', value: 2 },
    { label: 'Last Week', value: 7 },
    { label: 'Last 2 Weeks', value: 14 },
    { label: 'Last Month', value: 30 }
];

export const MoodInsights = () => {
    const [moodInsights, setMoodInsights] = useState<MoodRecord[]>([]);
    const [selectedDays, setSelectedDays] = useState(2);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    useEffect(() => {
        const fetchMoodInsights = async () => {
            const response = await axios.get(`http://localhost:8000/mood_insights?last_n_days=${selectedDays}`);
            const data = response.data;
            setMoodInsights(data);
        };
        fetchMoodInsights();
    }, [selectedDays]);

    return (
        <div
            className="flex flex-col items-center h-full relative bg-[#fae4b2]"
            style={{
                backgroundImage: `url(${MoodInsightsBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: '50% center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-0 bg-[#fae4b2]/50 pointer-events-none z-0" />
            <div className="relative z-10 flex flex-col items-center w-full">
                <div className="flex items-center gap-4 mt-8">
                    <h1 className="text-xl font-serif text-[#2F4F4F]">Mood Insights</h1>
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#2F4F4F] text-white font-serif hover:bg-[#2F4F4F]/90 transition-colors"
                        >
                            {timeRanges.find(range => range.value === selectedDays)?.label}
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-1 w-40 bg-white rounded-md shadow-lg border border-[#e6cfa7]">
                                {timeRanges.map((range) => (
                                    <button
                                        key={range.value}
                                        onClick={() => {
                                            setSelectedDays(range.value);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 font-serif text-[#2F4F4F] hover:bg-[#fae4b2] transition-colors ${
                                            selectedDays === range.value ? 'bg-[#fae4b2]' : ''
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
            </div>
        </div>
    );
};