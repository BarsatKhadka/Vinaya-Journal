import { useEffect, useState } from "react";
import { useAppStore } from "../../../../../store"
import axios from "axios";
import { AvgSentiment } from "./AvgSentiment";
import { DominantMood } from "./DominantMood";
import { DailyChangesAndTrends } from "./DailyChangesAndTrends";



export const AnalyzeMoodResults = () => {
    const {activeMoodTab, selectedDays} = useAppStore();
    const [analyzeMoodResults, setAnalyzeMoodResults] = useState<any>(null);
    const { chartData, setChartData , setChartDataType } = useAppStore();

    useEffect(() => {
        const fetchMoodResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/mood_analysis?last_n_days=${selectedDays}`);
                setAnalyzeMoodResults(response.data);
            } catch (error) {
                console.error('Error fetching mood results:', error);
                setAnalyzeMoodResults(null);
            }
        };
        fetchMoodResults();
    }, [selectedDays]);

    useEffect(() => {
        if (activeMoodTab === "Average Sentiment") {
            setChartData(analyzeMoodResults?.avg_sentiment);
            setChartDataType("Average Sentiment");
        }
        if (activeMoodTab === "Dominant Mood") {
            setChartData(analyzeMoodResults?.dominant_mood_of_the_day);
            setChartDataType("Dominant Mood");
        }
        if (activeMoodTab === "Daily Changes and Trends") {
            setChartData(analyzeMoodResults?.daily_changes);
            setChartDataType("Daily Changes and Trends");
        }
        console.log(chartData)
    }, [activeMoodTab]);

    return (
        <div>
            {activeMoodTab === "Average Sentiment" && <AvgSentiment avgSentiment={analyzeMoodResults?.avg_sentiment} />}
            {activeMoodTab === "Dominant Mood" && <DominantMood dominantMood={analyzeMoodResults?.dominant_mood_of_the_day} />}
            {activeMoodTab === "Daily Changes and Trends" && <DailyChangesAndTrends dailyChangesAndTrends={analyzeMoodResults?.daily_changes} />}
        </div>
    );
}

export default AnalyzeMoodResults;