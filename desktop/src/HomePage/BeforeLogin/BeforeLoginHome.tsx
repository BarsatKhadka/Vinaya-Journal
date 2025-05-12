import { TopBar } from "./TopBar"
import { motion } from "framer-motion"
import fallingLeaf from "../../assets/falling_leaf.png"
import floralLine from "../../assets/floralLine.png"


export const BeforeLoginHome = () => {
    return (
        <>
            <TopBar />

            {/* Welcome to Vinaya Journal */}
            <main className="container mx-auto px-4 relative">
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
            </main>
            

            {/* Falling Leaf */}
            <img
                src={fallingLeaf}
                alt="Falling Leaf"
                className="absolute w-16 md:w-20 lg:w-50 top-1/2 right-40 lg:right-70 transform -translate-y-1/90 opacity-50"
            />

            {/*Falling Leaf 2 */}
            <img
                src={fallingLeaf}
                alt="Fallen Leaf"
                className="absolute w-12 md:w-16 lg:w-40 bottom-10 right-100 lg:right-150 transform -translate-x-1/2 opacity-70"
            />
        </>
    )
}
