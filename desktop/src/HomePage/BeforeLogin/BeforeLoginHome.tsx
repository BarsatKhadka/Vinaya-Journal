import { TopBar } from "./TopBar"
import { motion } from "framer-motion"
import beforeLoginBackground from "../../assets/BackgroundImages/BeforeLoginBackground.png"
import { LocalAIFeature } from "./OllamaAISection/OllamaAICard"
import { RagAndMoodCard } from "./RAGandMoodSection/RagAndMoodCard"
import { BeginJournaling } from "./BeginJournalingSection/BeginJournaling"
import { useTranslation } from 'react-i18next';

export const BeforeLoginHome = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen w-full overflow-x-hidden relative">
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
                style={{ 
                    backgroundImage: `url(${beforeLoginBackground})`,
                    filter: 'var(--image-filter)'
                }}
            />
            <div className="relative">
                <TopBar />

                {/* Welcome to Vinaya Journal */}
                <main className="container mx-auto px-4 relative">
                    <div className="flex flex-col items-center justify-center h-[25vh] text-center relative mb-10 ">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-4xl md:text-3xl lg:text-6xl font-serif font-medium tracking-tight mb-2"
                        >
                            <span className="text-[var(--text-main)]">
                                {t('welcome.title')}
                            </span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.8, 
                                ease: "easeOut",
                                delay: 0.2 
                            }}
                            className="text-lg md:text-sm lg:text-xl text-[var(--text-muted)] font-light tracking-wide"
                            style={{
                                fontFamily: '"Playfair Display", serif',
                            }}
                        >
                            {t('welcome.subtitle')}
                        </motion.p>
                    </div>
                      
                    {/* Feature Cards Grid */}
                    <div className="grid grid-cols-1 gap-6 -mt-4 md:grid-cols-1 lg:grid-cols-3">
                        <div className="order-1 lg:order-1">
                            <LocalAIFeature />
                        </div>
                        
                        <div className="flex flex-col gap-6 order-2 lg:order-2 lg:col-span-2">
                            <div className="flex-1 min-w-0">
                                <RagAndMoodCard/>
                            </div>
                            <div className="flex-1 min-w-0 mb-6">
                                <BeginJournaling/>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
