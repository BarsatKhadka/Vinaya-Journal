import { motion } from "framer-motion"
import { LocalAIFeature } from "./components/OllamaAICard"
import { RagAndMoodCard } from "./components/RagAndMoodCard"
import { BeginJournaling } from "./components/BeginJournaling"
import { Navbar } from "./Navbar"
import beforeLoginBackground from "../assets/BackgroundImages/BeforeLoginBackground.png"

export const HomePage = () => {
    return (
        <div className="min-h-screen w-full overflow-x-hidden relative">
            {/* Background Image */}
            <div 
                className="fixed inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${beforeLoginBackground})` }}
            />
            
            {/* Content Overlay */}
            <div className="relative min-h-screen ">
                <Navbar />

                {/* Welcome to Vinaya Journal */}
                <main className="container mx-auto px-4 relative pt-4">
                    <div className="flex flex-col items-center justify-center h-[20vh] text-center relative mb-8">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-4xl md:text-3xl lg:text-6xl font-serif font-medium tracking-tight mb-2"
                        >
                            <span className="bg-gradient-to-r from-teal-700 to-slate-700 bg-clip-text text-transparent">
                                Write with gentle focus
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
                            className="text-lg md:text-sm lg:text-xl text-slate-600 font-light tracking-wide font-playfair"
                        >
                            your private local AI journaling app
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