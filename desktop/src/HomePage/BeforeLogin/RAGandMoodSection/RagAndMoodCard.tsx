import { RagCard } from "./RagCard"
import { MoodCard } from "./MoodCard"

export const RagAndMoodCard = () => { 
    return(
        <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ flex: 1 }}>
            <RagCard />
            </div>
            <div style={{ flex: 1 }}>
            <MoodCard />
            </div>
        </div>
    )
}