import vinayaWithout from '../../assets/vinayaWithout.png';
import leafTopRight from "../../assets/leaf_top_right.png";
import leafBottomLeft from "../../assets/leaf_bottom_left.png";

export const TopBar = () => {
    return (
        <>
            {/* Leaf Decorations */}
            <img
                src={leafTopRight}
                alt="Leaf Decoration"
                className="absolute top-0 right-0 w-100 md:w-40 lg:w-100 opacity-100 pointer-events-none"
            />
            <img
                src={leafBottomLeft}
                alt="Leaf Decoration"
                className="absolute bottom-0 left-0 w-32 md:w-40 lg:w-100 opacity-100 pointer-events-none"
            />

            {/* Top Bar Content */}
            <div className="max-w-screen-xl bg-[#F7F4F0] mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <div className="flex items-center md:gap-4 group">
                        <div className="rounded-full transition-transform duration-300 group-hover:scale-105">
                            <img
                                src={vinayaWithout}
                                alt="Vinaya Logo"
                                className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
                            />
                        </div>
                        <h1 className="text-xl md:text-2xl font-serif font-medium tracking-wide">
                            <span className="text-gray-900 bg-gradient-to-r from-teal-700 to-slate-700 bg-clip-text text-transparent">
                                VINAYA
                            </span>
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
};