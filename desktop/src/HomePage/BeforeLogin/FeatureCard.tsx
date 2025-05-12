export const FeatureCard = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 ">
            <h2 className="text-2xl font-semibold mb-4">Feature Title</h2>
            <p className="text-gray-700 mb-4">Feature description goes here. This is a brief overview of the feature.</p>
            <button className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 transition duration-300">
                Learn More
            </button>
        </div>
    );
}