import { useEffect, useState } from "react";
import { useAppStore } from "../../../../../store"
import axios from "axios";
import { AvgSentiment } from "./AvgSentiment";


export const AnalyzeMoodResults = () => {
    const {activeMoodTab} = useAppStore();
    const {selectedDays} = useAppStore();
    const [analyzeMoodResults, setAnalyzeMoodResults] = useState<any>(null);

    useEffect(() => {
        const fetchMoodResults = async () => {
            const response = await axios.get(`http://localhost:8000/mood_analysis?last_n_days=${selectedDays}`);
            const data = response.data;
            setAnalyzeMoodResults(data)
        }
        fetchMoodResults();
    }, [activeMoodTab , selectedDays]);

    return (
        <div>
            {activeMoodTab === "Average Sentiment" && <AvgSentiment avgSentiment={analyzeMoodResults?.avg_sentiment} />}
            
        </div>
    );
    
}

export default AnalyzeMoodResults;