import { TopBar } from "./TopBar"
import { motion } from "framer-motion"
import fallingLeaf from "../../assets/falling_leaf.png"
import floralLine from "../../assets/floralLine.png"
import { FeatureCard } from "./FeatureCard"

export const BeforeLoginHome = () => {
    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-[#F7F4F0]">
            <TopBar />

            {/* Welcome to Vinaya Journal */}
            <main className="container mx-auto px-4 relative pb-24">
                <div className="flex flex-col items-center justify-center lg:min-h-[30vh] text-center relative">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-3xl lg:text-6xl font-serif font-medium tracking-tight mb-2 lg:mb-4"
                    >
                        <span className="bg-gradient-to-r from-teal-700 to-slate-700 bg-clip-text text-transparent">
                            Welcome to Vinaya
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
                        className="text-lg md:text-sm lg:text-xl text-slate-600 font-light tracking-wide "
                        style={{
                        fontFamily: '"Playfair Display", serif',
                        }}
                    >
                        your private local AI journaling app
                    </motion.p>

                    {/* Floral Line */}
                    <img
                        src={floralLine}
                        alt="Floral Line"
                        className="w-32 md:w-32 lg:w-60 "
                    />

                </div>
                  
                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    <FeatureCard />
                </div>
            </main>

            {/* Falling Leaves - Updated positioning */}
            <img
                src={fallingLeaf}
                alt="Falling Leaf"
                className="fixed w-16 md:w-20 lg:w-24 
                         top-1/3 right-[5%] md:right-[10%] lg:right-[15%] 
                         transform -translate-y-1/2 opacity-50
                         pointer-events-none select-none"
            />
            <img
                src={fallingLeaf}
                alt="Fallen Leaf"
                className="fixed w-12 md:w-16 lg:w-20 
                         bottom-[10%] right-[15%] md:right-[35%] lg:right-[35%] 
                         transform -translate-x-1/2 opacity-70
                         pointer-events-none select-none"
            />
        </div>
    )
}
