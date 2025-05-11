import { TopBar } from "./TopBar"
import { motion } from "framer-motion"

export const BeforeLoginHome = () => {
    return (
        <>
            <TopBar />

            {/* Welcome to Vinaya Journal*/}
            <main className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center min-h-[20vh] text-center">
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
                        className="text-lg md:text-sm lg:text-2xl text-slate-600 font-light tracking-wide"
                    >
                        your private local AI journaling app
                    </motion.p>
                </div>
            </main>



        </>
    )
}
