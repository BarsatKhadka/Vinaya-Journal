import { useEffect } from "react";
import { useAppStore } from "../../../../../store"
import { AvgSentiment } from "./AvgSentiment";
import { DominantMood } from "./DominantMood";
import { DailyChangesAndTrends } from "./DailyChangesAndTrends";

interface AnalyzeMoodResultsProps {
    data: any;
}

export const AnalyzeMoodResults: React.FC<AnalyzeMoodResultsProps> = ({ data }) => {
    const {activeMoodTab} = useAppStore();
    const { setChartData, setChartDataType } = useAppStore();

    useEffect(() => {
        if (!data) return;

        if (data === "No mood data available") {
            setChartData([]);
            return;
        }

        if (activeMoodTab === "Average Sentiment") {
            setChartData(data?.avg_sentiment);
            setChartDataType("Average Sentiment");
        }
        if (activeMoodTab === "Dominant Mood") {
            setChartData(data?.dominant_mood_of_the_day);
            setChartDataType("Dominant Mood");
        }
        if (activeMoodTab === "Daily Changes and Trends") {
            setChartData(data?.daily_changes);
            setChartDataType("Daily Changes and Trends");
        }
    }, [activeMoodTab, data]);

    if (!data || data === "No mood data available") {
        return null;
    }

    return (
        <div>
            {activeMoodTab === "Average Sentiment" && <AvgSentiment avgSentiment={data?.avg_sentiment} />}
            {activeMoodTab === "Dominant Mood" && <DominantMood dominantMood={data?.dominant_mood_of_the_day} />}
            {activeMoodTab === "Daily Changes and Trends" && <DailyChangesAndTrends dailyChangesAndTrends={data?.daily_changes} />}
        </div>
    );
}

export default AnalyzeMoodResults;